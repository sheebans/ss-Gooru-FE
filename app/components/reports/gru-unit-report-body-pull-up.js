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
   * Property to member performance
   */
  tableHeader: Ember.A([]),

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
   * Indicates the status of the spinner
   * @property {Boolean}
   */
  isLoading: false,

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onPullUpClose() {
      this.set('showPullUp', false);
    },
    /**
     * Trigger when lesson level  report clicked
     */
    onOpenLessonReport(lesson) {
      let component = this;
      const selectedUnit = this.get('selectedUnit');
      const classId = selectedUnit.classId;
      const courseId = selectedUnit.courseId;
      const unit = selectedUnit.unit;
      let unitId = unit.id;
      let selectedLessonData = {
        classId,
        courseId,
        classMembers: component.get('classMembers'),
        lesson,
        lessonId: lesson.id,
        unit,
        unitId
      };
      component.sendAction('onOpenLessonReport', selectedLessonData);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    if (component.get('showPullUp')) {
      component.set('isLoading', true);
      component.getPerformancesByUnit();
    }
  },

  didRender() {
    var component = this;
    //For table vertical and horizondal scroll
    component.$('tbody').scroll(function() {
      //Detect a scroll event on the tbody
      /* Setting the thead left value to the negative valule of tbody.scrollLeft will make it track the movement
      of the tbody element. Setting an elements left value to that of the tbody.scrollLeft left makes it maintain
      it's relative position at the left of the table.*/
      //fix the thead relative to the body scrolling
      component.$('thead').css('left', -component.$('tbody').scrollLeft());
      //fix the first cell of the header
      component
        .$('thead th:nth-child(1)')
        .css('left', component.$('tbody').scrollLeft());
      //fix the first column of tdbody
      component
        .$('tbody td:nth-child(1)')
        .css('left', component.$('tbody').scrollLeft());
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
      // component.getLessonsByUnit();
      //component.getPerformancesByUnit();
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
    const unitId = selectedUnit.unit.id;
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
    const unitId = selectedUnit.unit.id;
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
          let lessonsAvgPerformance = studentsLessonPerformances.objectAt(0)
            .performanceData;
          lessons = component.matchLessonsWithPerformaces(
            lessons,
            lessonsAvgPerformance
          );
          let tableHeader = lessons || Ember.A([]);
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
          component.set('tableHeader', tableHeader);
          component.set('classMembers', students);
          component.set('isLoading', false);
        });
      });
    });
  },

  matchLessonsWithPerformaces(lessons, lessonsAvgPerformance) {
    lessons.map(lesson => {
      lesson.performance = lessonsAvgPerformance[lesson.sequence];
    });
    return lessons;
  }
});
