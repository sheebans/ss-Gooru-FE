import Ember from 'ember';
import {getSubjectIdFromSubjectBucket} from 'gooru-web/utils/utils';
import ModalMixin from 'gooru-web/mixins/modal';

/**
 * Class students controller
 */
export default Ember.Controller.extend(ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('teacher.class'),

  /**
   * @requires service:api-sdk/class
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * Analytics Service
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when open proficiency pull for a student
     */
    onOpenStudentProficiency: function(student) {
      let controller = this;
      controller.set('isShowProficiencyPullup', true);
      controller.set('selectedStudent', student);
    },

    /**
     *Remove student
     */
    onRemoveStudent: function(student) {
      let controller = this;
      var model = {
        content: student,
        deleteMethod: function() {
          return controller
            .get('classService')
            .removeStudentFromClass(
              controller.get('class.id'),
              student.get('id')
            );
        },
        callback: {
          success: function() {
            controller.get('studentsList').removeObject(student);
          }
        }
      };

      this.actions.showModal.call(
        this,
        'content.modals.gru-remove-student',
        model,
        null,
        null,
        null,
        false
      );
    },

    /**
     * Action triggered when select a competency
     */
    onSelectCompetency(competency) {
      let controller = this;
      controller.set('selectedCompetency', competency);
      controller.set('isShowCompetencyContentReport', true);
    },

    /**
     * Action triggered when the user click outside of pullup.
     **/
    onClosePullUp() {
      this.set('showReportPullUp', false);
      this.set('isShowProficiencyPullup', false);
      this.set('isShowCompetencyContentReport', false);
      this.set('isShowCompetencyReport', false);
      this.set('isShowDomainCompetencyReport', false);
    },

    /**
     * Action triggered when open course report
     */
    onOpenCourseReport() {
      let controller = this;
      controller.get('classController').openTeacherCourseReport();
    },

    /**
     * Action triggered when open competency report
     */
    onOpenCompetencyReport() {
      let controller = this;
      controller.set('isShowCompetencyReport', true);
    },

    /**
     * Action triggered when select a domain from pull up
     */
    onSelectDomain(domainSet) {
      let controller = this;
      controller.set('selectedDomain', domainSet);
      controller.set('isShowDomainCompetencyReport', true);
    },

    /**
     * Action triggered when open a student's course report
     */
    onOpenStudentCourseReport(student) {
      let controller = this;
      let params = Ember.Object.create({
        userId: student.id,
        classId: controller.get('class.id'),
        class: controller.get('class'),
        courseId: controller.get('course.id'),
        course: controller.get('course'),
        isTeacher: true,
        isStudent: false,
        loadUnitsPerformance: true
      });
      controller.set('studentCourseReportContext', params);
      controller.set('showCourseReport', true);
    },

    /**
     * Action triggered when sort students list
     */
    sortStudentList(sortCriteria) {
      let controller = this;
      controller.set('studentsList', controller.get('studentsList').sortBy(sortCriteria));
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {Course}
   */
  course: Ember.computed.alias('classController.course'),

  /**
   * @property {classMembers}
   */
  classMembers: Ember.computed.alias('classController.members.members'),

  /**
   * @property {classId}
   */
  classId: Ember.computed('class', function() {
    let controller = this;
    return controller.get('class.id');
  }),

  /**
   * @property {courseId}
   */
  courseId: Ember.computed('course', function() {
    let controller = this;
    return controller.get('course.id');
  }),

  /**
   * @property {subjectCode}
   */
  subjectCode: Ember.computed('course', function() {
    let controller = this;
    let course = controller.get('course');
    let subjectBucket = course.get('subject');
    return subjectBucket ? getSubjectIdFromSubjectBucket(subjectBucket) : null;
  }),

  /**
   * The class is premium or not
   * @property {Boolean}
   */
  isPremiumClass: Ember.computed('class', function() {
    const controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting['course.premium'] : false;
  }),

  /**
   * @property {Boolean}
   * Property to show/hide proficiency pull up
   */
  isShowProficiencyPullup: false,

  /**
   * @property {String}
   * Property to store coruse subject bucket or K12.MA will be default
   */
  subjectBucket: Ember.computed('course', function() {
    let controller = this;
    return controller.get('course.subject') || 'K12.MA';
  }),

  /**
   * @property {Object}
   * Property to store selected student's data
   */
  selectedStudent: null,

  /**
   * @property {isCourseAssigned}
   * Property to check whether a course is assigned to the class or not
   */
  isCourseAssigned: Ember.computed('class', function() {
    let controller = this;
    let classData = controller.get('class');
    let isCourseAssigned = classData ? classData.courseId || false : false;
    return isCourseAssigned;
  }),

  /**
   * @property {Boolean} isShowCompetencyContentReport
   */
  isShowCompetencyContentReport: false,

  /**
   * @property {Array} studentsList
   * List of students in the class
   */
  studentsList: Ember.A([]),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadStudentsData
   * Method to load student's table data
   */
  loadStudentsData() {
    let controller = this;
    controller.set('isLoading', true);
    return Ember.RSVP.hash({
      competencyPerformance: controller.getPremiumCoursePerformanceSummary(),
      classContentPerformance: controller.getClassicCoursePerformanceSummary()
    })
      .then(function(hash) {
        controller.parseStudentsDetails(hash.competencyPerformance, hash.classContentPerformance);
      });
  },

  /**
   * @function getClassicAtcPerformanceSummary
   * Method to fetch class performance for the ATC view
   */
  getClassicCoursePerformanceSummary() {
    const controller = this;
    const analyticsService = controller.get('analyticsService');
    let classId = controller.get('classId');
    let courseId = controller.get('courseId');
    return Ember.RSVP.resolve(
      analyticsService.getAtcPerformanceSummary(classId, courseId)
    );
  },

  /**
   * @function getPremiumAtcPerformanceSummary
   * Method to fetch premium class performance for the ATC view
   */
  getPremiumCoursePerformanceSummary() {
    const controller = this;
    const analyticsService = controller.get('analyticsService');
    let classId = controller.get('classId');
    let courseId = controller.get('courseId');
    let subjectCode = controller.get('subjectCode');
    return Ember.RSVP.resolve(
      analyticsService.getAtcPerformanceSummaryPremiumClass(
        classId,
        courseId,
        subjectCode
      )
    );
  },

  /**
   * @function getStudentCurrentLocation
   * Method to get current location of a student
   */
  getStudentCurrentLocation(userId) {
    const controller = this;
    const analyticsService = controller.get('analyticsService');
    let classId = controller.get('classId');
    let courseId = controller.get('courseId');
    let locationQueryParam = {
      courseId
    };
    return Ember.RSVP.hash({
      currentLocation: analyticsService.getUserCurrentLocation(classId, userId, locationQueryParam)
    })
      .then(({currentLocation}) => {
        return currentLocation;
      });
  },

  /**
   * @function parseStudentsDetails
   * Method to parse student table details
   */
  parseStudentsDetails(competencyPerformance, classContentPerformance) {
    let controller = this;
    let classMembers = controller.get('classMembers');
    let classMembersList = classMembers.map( member => {
      let studentDetails = Object.assign(member);
      let studentCompetencyPerformance = competencyPerformance ? competencyPerformance.findBy('userId', member.id) : null;
      let studentContentPerformance = classContentPerformance ? classContentPerformance.findBy('userId', member.id) : null;
      let performance = null;
      let isStudentPerformed = false;
      let proficiency = Ember.Object.create({
        totalCompetencies: 0,
        completedCompetencies: 0
      });
      if (studentCompetencyPerformance) {
        let score = studentContentPerformance ? studentContentPerformance.score : null;
        performance = score != null ? Math.round(score * 100) / 100 : null;
        isStudentPerformed = score != null;
        proficiency.set('totalCompetencies', studentCompetencyPerformance.totalCompetency);
        proficiency.set('completedCompetencies', studentCompetencyPerformance.completedCompetency);
        let pendingCompetencies = studentCompetencyPerformance.totalCompetency - studentCompetencyPerformance.completedCompetency;
        proficiency.set('pendingCompetencies', pendingCompetencies);
      }
      controller.getStudentCurrentLocation(member.id).then(function(studentLocation) {
        let currentLocation = '--';
        if (studentLocation) {
          currentLocation = studentLocation.collectionTitle;
        }
        studentDetails.set('hasStarted', isStudentPerformed);
        studentDetails.set('performance', performance);
        studentDetails.set('proficiency', proficiency);
        studentDetails.set('currentLocation', currentLocation);
      });
      return studentDetails;
    });
    Ember.RSVP.all(classMembersList).then(function(studentsList) {
      controller.set('studentsList', studentsList);
      controller.set('isLoading', false);
    });
  }
});
