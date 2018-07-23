import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'pull-up-assessment-report-listview'],

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Properties

  /**
   * This property will get change based on filter selection, by default reaction filter off.
   * @type {Boolean}
   */
  isReactionFltApplied: false,

  /**
   * This property will get change based on filter selection, by default timespent filter off.
   * @type {Boolean}
   */
  isTimeSpentFltApplied: false,

  /**
   * List of questions associated with assessment
   * @type {Array}
   */
  questions: Ember.A(),

  /**
   * Students performance data
   * @type {Array}
   */
  studentPerformanceData: Ember.A(),

  /**
   * Maintain the status of sort by firstName
   * @type {String}
   */
  sortByFirstnameEnabled: true,

  /**
   * Maintain the status of sort by lastName
   * @type {String}
   */
  sortByLastnameEnabled: false,

  /**
   * Maintain the status of sort by overAllScore
   * @type {String}
   */
  sortByScoreEnabled: false,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    studentReport(collection, userId) {
      this.sendAction('studentReport', collection, userId);
    },

    sortByFirstName() {
      let component = this;
      component.toggleProperty('sortByFirstnameEnabled');
      if (component.get('sortByFirstnameEnabled')) {
        component.set(
          'studentPerformanceData',
          component.get('studentPerformanceData').sortBy('firstName')
        );
      } else {
        component.set(
          'studentPerformanceData',
          component
            .get('studentPerformanceData')
            .sortBy('firstName')
            .reverse()
        );
      }
    },

    sortByLastName() {
      let component = this;
      component.toggleProperty('sortByLastnameEnabled');
      if (component.get('sortByLastnameEnabled')) {
        component.set(
          'studentPerformanceData',
          component.get('studentPerformanceData').sortBy('lastName')
        );
      } else {
        component.set(
          'studentPerformanceData',
          component
            .get('studentPerformanceData')
            .sortBy('lastName')
            .reverse()
        );
      }
    },

    sortByScore() {
      let component = this;
      component.toggleProperty('sortByScoreEnabled');
      if (component.get('sortByScoreEnabled')) {
        component.set(
          'studentPerformanceData',
          component.get('studentPerformanceData').sortBy('overAllScore')
        );
      } else {
        component.set(
          'studentPerformanceData',
          component
            .get('studentPerformanceData')
            .sortBy('overAllScore')
            .reverse()
        );
      }
    }
  }
});
