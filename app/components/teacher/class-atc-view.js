import Ember from 'ember';

/**
 * class performance chart
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['teacher', 'class-atc-view'],

  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when click on carousel nav
     */
    onChangeAtcClass(actionSequence) {
      let component = this;
      component.set('isLoading', true);
      component.sendAction('onChangeAtcClass', actionSequence);
    },

    /**
     * Action triggered when click on class properties icon
     * Page will be redirected to specific route based on item selected
     */
    onSelectClassItem(item, classId) {
      let component = this;
      //Show competency report when click report
      if (item === 'performance') {

        component.set('isShowCompetencyReport', true);
      } else {
        component.sendAction('onSelectClassItem', item, classId);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {JSON}
   * Property to hold active class data
   */
  classData: null,

  /**
   * @property {Boolean}
   * Property to enable/disable previous nav icon
   */
  isPreviousDisabled: Ember.computed('classPosition', function() {
    let component = this;
    let classPosition = component.get('classPosition');
    return classPosition === 0;
  }),

  /**
   * @property {Boolean}
   * Property to enable/disable next nav icon
   */
  isNextDisabled: Ember.computed('classPosition', 'totalClasses', function() {
    let component = this;
    let totalClasses = component.get('totalClasses');
    let classPosition = component.get('classPosition');
    return totalClasses === classPosition + 1;
  }),

  /**
   * @property {Array}
   * Property to hold class performance data
   */
  classPerformanceData: Ember.computed('classData', function() {
    let component = this;
    let classPerformance = component.get('classData.performance');
    let score = classPerformance ? classPerformance.score : 0;
    let classPerformanceData = Ember.A([
      {
        score: score
      }
    ]);
    return classPerformanceData;
  }),

  /**
   * @property {Boolean}
   * Property to check whether the class mapped with a course or not
   */
  isStudentPerformed: Ember.computed('classData', function() {
    let component = this;
    return component.get('classData.courseId') || false;
  }),

  /**
   * @property {Boolean}
   * Property to show/hide competency report pull up
   */
  isShowCompetencyReport: false,

  /**
   * @property {courseSubjectCode}
   * Property to fetch subject code from subject bucket
   */
  courseTitle: Ember.computed('classData', function() {
    let component = this;
    let classData = component.get('classData');
    return classData.courseTitle;
  })
});
