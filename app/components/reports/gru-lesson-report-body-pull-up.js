import Ember from 'ember';
import { formatTime } from '../../utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {LessonService} Service to retrieve class information
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-lesson-report-body-pull-up'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onPullUpClose() {
      this.set('showPullUp', false);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * Propery to show header in pullup component.
   * @property {isShowHeader}
   */
  header: {
    isShowHeader: true
  },

  /**
   * Propery to show pullup body content.
   * @property {isShowBody}
   */
  body: {
    isShowBody: true
  },

  /**
   * Propery to show class id.
   * @property {classId}
   */
  classId: '',

  /**
   * Propery to show course id.
   * @property {courseId}
   */
  courseId: '',

  /**
   * Propery to show unit id.
   * @property {unitId}
   */
  unitId: '',

  /**
   * Propery to show lesson id.
   * @property {lessonId}
   */
  lessonId: '',

  /**
   * Propery to show collection type.
   * @property {type}
   */
  type: 'assessment',

  didInsertElement() {
    let component = this;
    if (this.get('showPullUp')) {
      component.getStudentPerformances();
    }
  },

  pullUpObserver: Ember.observer('showPullUp', function() {
    let component = this;
    if (component.get('showPullUp')) {
      component.getStudentPerformances();
    }
  }),

  getClassMembers() {
    let component = this;
    const classId = this.get('classId');
    return component
      .get('classService')
      .readClassMembers(classId)
      .then(function(members) {
        return members;
      });
  },

  getListOfAssessments() {
    const courseId = this.get('courseId');
    const unitId = this.get('unitId');
    const lessonId = this.get('lessonId');
    let assessmentListPromise = new Ember.RSVP.resolve(
      this.get('lessonService').fetchById(courseId, unitId, lessonId)
    );
    return Ember.RSVP.hash({
      studentAssessment: assessmentListPromise
    }).then(function(hash) {
      return hash.studentAssessment.children;
    });
  },
  getPerformances() {
    const classId = this.get('classId');
    const courseId = this.get('courseId');
    const unitId = this.get('unitId');
    const lessonId = this.get('lessonId');
    const type = this.get('type');
    let performancePromise = new Ember.RSVP.resolve(
      this.get('performanceService').getStudentsCollectionPerformance(
        classId,
        courseId,
        unitId,
        lessonId,
        type
      )
    );
    return Ember.RSVP.hash({
      studentPerformance: performancePromise
    }).then(function(hash) {
      return hash.studentPerformance;
    });
  },

  getStudentPerformances() {
    let component = this;
    let classMembersPromise = component.getClassMembers();
    let performancePromise = component.getPerformances();
    let assessmentListPromise = component.getListOfAssessments();
    return Ember.RSVP.hash({
      classMembers: classMembersPromise,
      performances: performancePromise,
      assessmentLists: assessmentListPromise
    }).then(function(hash) {
      let classMembers = hash.classMembers.members;
      let collections = hash.assessmentLists;
      let memberPerformances = hash.performances;
      let tableRow = Ember.A([]);
      component.generateTableHeader(collections);
      classMembers.map(member => {
        let memberId = member.id;
        let fullName = `${member.lastName} ${member.firstName}`;
        let memberPerformance = memberPerformances.findBy('userId', memberId);
        let studentPerformances = memberPerformance
          ? memberPerformance.usageData.length > 0
            ? memberPerformance.usageData
            : null
          : null;
        let studentData = {
          fullName: fullName,
          thumbnail: member.avatarUrl,
          student: member,
          collections: Ember.A([])
        };
        let tableBody = Ember.A([]);
        collections.map(collection => {
          let studentCollectionPerformance = {
            score: null,
            timeSpent: null,
            status: null,
            collectionId: collection.id
          };
          if (studentPerformances) {
            let collectionPerformance = studentPerformances.findBy(
              'collectionId',
              collection.id
            );
            if (collectionPerformance) {
              let collectionTimeSpent = collectionPerformance.timeSpent
                ? formatTime(collectionPerformance.timeSpent)
                : null;
              studentCollectionPerformance = {
                score: collectionPerformance.scoreInPercentage,
                timeSpent: collectionTimeSpent,
                status: collectionPerformance.status,
                collectionId: collection.id
              };
            }
          }
          tableBody.push(studentCollectionPerformance);
        });
        studentData.collections = tableBody;
        tableRow.push(studentData);
      });
      component.set('tableRow', tableRow);
    });
  },

  generateTableHeader(collections) {
    let component = this;
    let tableHeader = {
      student: 'STUDENT',
      collections: Ember.A([])
    };
    if (collections) {
      tableHeader.collections = collections;
    }
    component.set('tableHeader', tableHeader);
    return tableHeader;
  }
});
