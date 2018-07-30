import Ember from 'ember';
import { createDataMatrix } from 'gooru-web/utils/performance-data';

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
   * @type {LessonService} Service to retrieve lesson information
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * @type {UnitService} Service to retrieve unitService information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-unit-report-body-pull-up'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onPullUpClose() {
      this.set('showPullUp', false);
    },
    /**
     * Trigger when lesson level  report clicked
     */
    onOpenLessonReport() {
      const selectedUnit = this.get('selectedUnit');
      let lessonInfo = {
        classId: selectedUnit.classId,
        courseId: selectedUnit.courseId,
        unitId: selectedUnit.unitId
      };
      this.set('lessonReportData', lessonInfo);
      this.set('showLessonReportPullUp', true);
      this.sendAction('onOpenLessonReports', lessonInfo);
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
   * Property to get members data
   */
  classMembers: Ember.A([]),

  /**
   * Property to member performance
   */
  memberPerformances: Ember.A([]),

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

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;

    if (component.get('showPullUp')) {
      component.getClassMembers();
      component.getLessonsByUnit();
      component.getPerformancesByUnit();
    }
  },

  didRender() {
    var component = this;

    //For table vertical aand horizondal scroll
    component.$('tbody').scroll(function() {
      //detect a scroll event on the tbody
      /*
      Setting the thead left value to the negative valule of tbody.scrollLeft will make it track the movement
      of the tbody element. Setting an elements left value to that of the tbody.scrollLeft left makes it maintain 			it's relative position at the left of the table.
      */
      component.$('thead').css('left', -component.$('tbody').scrollLeft()); //fix the thead relative to the body scrolling
      component
        .$('thead th:nth-child(1)')
        .css('left', component.$('tbody').scrollLeft()); //fix the first cell of the header
      component
        .$('tbody td:nth-child(1)')
        .css('left', component.$('tbody').scrollLeft()); //fix the first column of tdbody
    });
  },

  //--------------------------------------------------------------------------
  // Observer
  //
  /**
   * Observer to check the showPullUp property in component
   **/
  pullUpObserver: Ember.observer('showPullUp', function() {
    let component = this;
    if (component.get('showPullUp')) {
      component.getClassMembers();
      component.getLessonsByUnit();
      component.getPerformancesByUnit();
    }
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get the list of class members
   */
  getClassMembers() {
    const selectedUnit = this.get('selectedUnit');
    const classId = selectedUnit.classId;
    let classMemberPromise = new Ember.RSVP.resolve(
      this.get('classService').readClassMembers(classId)
    );
    return Ember.RSVP.hash({
      classMembers: classMemberPromise
    }).then(function(hash) {
      return hash.classMembers.members;
    });
  },

  /**
   * Get the list of assessment list
   * unitId and courseId
   */
  getLessonsByUnit() {
    const selectedUnit = this.get('selectedUnit');
    const courseId = selectedUnit.courseId;
    const unitId = selectedUnit.unitId;
    let unitListPromise = new Ember.RSVP.resolve(
      this.get('unitService').fetchById(courseId, unitId)
    );
    return Ember.RSVP.hash({
      unitList: unitListPromise
    }).then(function(hash) {
      return hash.unitList;
    });
  },
  /**
   * Get the overall performance
   */
  getPerformancesByUnit() {
    const component = this;
    const selectedUnit = this.get('selectedUnit');
    const classId = selectedUnit.classId;
    const courseId = selectedUnit.courseId;
    const unitId = selectedUnit.unitId;
    component.getClassMembers().then(function(students) {
      component.getLessonsByUnit().then(function(unit) {
        let performancePromise = new Ember.RSVP.resolve(
          component
            .get('performanceService')
            .findClassPerformanceByUnit(classId, courseId, unitId, students)
        );
        return Ember.RSVP.hash({
          studentPerformance: performancePromise
        }).then(function(hash) {
          let classPerformanceData = hash.studentPerformance;
          let lessons = unit.children;
          const studentsLessonPerformances = createDataMatrix(
            lessons,
            classPerformanceData,
            'unit'
          );
          let tableRow = Ember.A([]);
          students.map(studentData => {
            let userId = studentData.id;
            let individualStudentPerformance = studentsLessonPerformances.findBy(
              'userId',
              userId
            );
            let studentLessonPerformanceData =
              individualStudentPerformance.performanceData;
            // let studentLessonAvg = studentLessonPerformanceData[0];
            let studentLessonPerformances = studentLessonPerformanceData.slice(
              1,
              studentLessonPerformanceData.length
            );
            let studentLessonsData = Ember.A([]);
            studentLessonPerformances.forEach(function(
              lessonPerformance,
              index
            ) {
              let lessonPerformanceData = lessonPerformance || lessons[index];
              let lessonData = {
                score: lessonPerformanceData.score || null,
                title:
                  lessonPerformanceData.headerTitle ||
                  lessonPerformanceData.title,
                id: lessonPerformanceData.id,
                isStarted: lessonPerformanceData.hasStarted || false,
                timeSpent: lessonPerformanceData.timeSpent || ''
              };
              studentLessonsData.push(lessonData);
            });
            let studentLessonPerformanceInfo = {
              student: studentData,
              lessons: studentLessonsData
            };
            tableRow.push(studentLessonPerformanceInfo);
          });
          component.set('tableRow', tableRow);
        });
      });
    });
  }
});
