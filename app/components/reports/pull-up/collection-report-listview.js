import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'pull-up-collection-report-listview'],

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
   * List of contents associated with collection
   * @type {Array}
   */
  contents: Ember.A(),

  /**
   * Students report data
   * @type {Array}
   */
  studentReportData: Ember.A(),

  /**
   * Maintain the status of sort by firstName
   * @type {String}
   */
  sortByFirstnameEnabled: false,

  /**
   * Maintain the status of sort by lastName
   * @type {String}
   */
  sortByLastnameEnabled: true,

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
          'studentReportData',
          component.get('studentReportData').sortBy('firstName')
        );
      } else {
        component.set(
          'studentReportData',
          component
            .get('studentReportData')
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
          'studentReportData',
          component.get('studentReportData').sortBy('lastName')
        );
      } else {
        component.set(
          'studentReportData',
          component
            .get('studentReportData')
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
          'studentReportData',
          component.get('studentReportData').sortBy('overAllScore')
        );
      } else {
        component.set(
          'studentReportData',
          component
            .get('studentReportData')
            .sortBy('overAllScore')
            .reverse()
        );
      }
    }
  }
});
