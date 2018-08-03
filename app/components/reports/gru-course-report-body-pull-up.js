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

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-course-report-body-pull-up'],

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

    onOpenCourseReport() {
      let component = this;
      component.sendAction('onOpenLessonReport');
    },

    /**
     ** Trigger to open unit report from course
     **/
    onOpenUnitReport(unit) {
      let component = this;
      let classId = component.get('classData.id');
      let courseId = component.get('courseData.id');
      let selectedUnitData = {
        classId,
        courseId,
        classMembers: component.get('classMembers'),
        unit,
        unitId: unit.id
      };
      component.sendAction('onOpenUnitReport', selectedUnitData);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    if (component.get('showPullUp')) {
      component.set('isLoading', true);
      component.loadCoursePerformanceData();
    }
  },

  /**
   * Get the table vertical and horizondal scroll with left column fixed
   */
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
  // -------------------------------------------------------------------------
  //Methods

  /**
   * Get the class performance based on  class members
   */
  loadCoursePerformanceData() {
    let component = this;
    let classMembersPromise = component.getClassMembers();
    return Ember.RSVP.hash({
      classMembers: classMembersPromise
    }).then(({ classMembers }) => {
      let classPerformancePromise = component.getClassPerformance(classMembers);
      component.set('classMembers', classMembers);
      return Ember.RSVP.hash({
        classPerformance: classPerformancePromise
      }).then(({ classPerformance }) => {
        let courseData = component.get('courseData');
        let units = courseData ? courseData.children : Ember.A([]);
        let classPerformanceMatrix = createDataMatrix(
          units,
          classPerformance,
          'course'
        );
        component.generateTableBody(
          units,
          classMembers,
          classPerformanceMatrix
        );
        component.generateTableHeader(units, classPerformanceMatrix);
      });
    });
  },

  /**
   * Generate table header to show the list for units in that course
   */
  generateTableHeader(units, classPerformanceData) {
    let component = this;
    let coursePerformance = null;
    let tableHeader = Ember.A([]);
    if (classPerformanceData) {
      let classPerformance = classPerformanceData.objectAt(0).performanceData;
      coursePerformance = classPerformance.objectAt(0);
      units.map(unit => {
        let tableHeaderItem = unit;
        tableHeaderItem.set('performance', classPerformance[unit.sequence]);
        tableHeader.push(tableHeaderItem);
      });
    }
    component.set('tableHeader', tableHeader);
    component.set('coursePerformance', coursePerformance);
    component.set('isLoading', false);
  },

  /**
   * Generate the table body to show the unit performance
   */
  generateTableBody(units, students, classPerformanceData) {
    let component = this;
    let tableRows = Ember.A([]);
    students.map(student => {
      let studentClassPerformance = classPerformanceData.findBy(
        'userId',
        student.id
      );
      let studentPerformance = studentClassPerformance.performanceData;
      let studentInfo = student;
      studentInfo.performance = studentPerformance.objectAt(0);
      let studentUnitPerformance = Ember.A([]);
      units.map(unit => {
        let unitPerformance = studentPerformance[unit.sequence];
        let unitPerformanceInfo = {
          score: unitPerformance ? unitPerformance.score : null,
          timeSpent: unitPerformance ? unitPerformance.timeSpent : null,
          hasStarted: unitPerformance ? unitPerformance.hasStarted : false,
          id: unit.id,
          title: unit.title
        };
        studentUnitPerformance.push(unitPerformanceInfo);
      });
      let tableRow = {
        student: studentInfo,
        unit: studentUnitPerformance
      };
      tableRows.push(tableRow);
    });
    component.set('tableRows', tableRows);
  },

  /**
   * Get the list of class members
   */
  getClassMembers() {
    let component = this;
    const classId = component.get('classData.id');
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
   * Get the class performance by students
   */
  getClassPerformance(students) {
    let component = this;
    let classId = component.get('classData.id');
    let courseId = component.get('courseData.id');
    let classPerformancePromise = new Ember.RSVP.resolve(
      component
        .get('performanceService')
        .findClassPerformance(classId, courseId, students)
    );
    return Ember.RSVP.hash({
      classPerformance: classPerformancePromise
    }).then(({ classPerformance }) => {
      return classPerformance;
    });
  }
});
