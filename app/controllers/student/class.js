import Ember from 'ember';
import { getBarGradeColor } from 'gooru-web/utils/utils';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Collapses the header section
     * @param {boolean} state
     */
    toggleHeader: function(state) {
      var $panels = $('.header .panel');
      if (state) {
        $panels.slideUp();
      } else {
        $panels.slideDown();
      }
    },

    /**
     * Trigger the event to open student course report
     */
    openCourseReport: function() {
      this.openStudentCourseReport();
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var item = this.get('menuItem');
    this.selectMenuItem(item);
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * The class presented to the user
   * @property {Class}
   */
  class: null,

  /**
   * The course presented to the user
   * @property {Course}
   */
  course: null,

  /**
   * The units presented to the user
   * @property {Unit}
   */
  units: null,

  /**
   * The menuItem selected
   * @property {String}
   */
  menuItem: null,

  /**
   * @property {ClassContentVisibility}
   */
  contentVisibility: null,

  /**
   * @property {boolean} Indicates if course has 1 or more units
   */
  hasUnits: Ember.computed.gt('course.unitCount', 0),

  /**
   * @property {boolean} Indicates if class has 1 or more students
   */
  hasStudents: Ember.computed.gt('class.countMembers', 0),

  barChartData: Ember.computed(function() {
    let score = this.get('class.performanceSummary.score');
    let scoreColor = getBarGradeColor(score);
    const completed = this.get('class.performanceSummary.totalCompleted');
    const total = this.get('class.performanceSummary.total');
    const percentage = completed ? (completed / total) * 100 : 0;
    return [
      {
        color: scoreColor,
        percentage
      }
    ];
  }),
  performancePercentage: Ember.computed('barChartData', function() {
    let data = this.get('barChartData').objectAt(0);
    return data.percentage.toFixed(0);
  }),

  /**
   * Maintains the state of course report visibility
   * @type {Boolean}
   */
  showCourseReport: false,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Selected the menu item
   * @param {string} item
   */
  selectMenuItem: function(item) {
    this.set('menuItem', item);
  },

  openStudentCourseReport() {
    let controller = this;
    controller.set('showCourseReport', true);
    let params = Ember.Object.create({
      userId: controller.get('session.userId'),
      classId: controller.get('class.id'),
      class: controller.get('class'),
      courseId: controller.get('course.id'),
      course: controller.get('course'),
      isTeacher: false,
      isStudent: true
    });
    controller.set('studentCourseReportContext', params);
  }
});
