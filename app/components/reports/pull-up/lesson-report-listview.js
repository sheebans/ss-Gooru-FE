import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'pull-up-lesson-report-listview'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * This property will get change based on filter selection.
   * @type {Boolean}
   */
  isPerformanceFltApplied: false,

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

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    studentReport(collection, userId) {
      this.sendAction('studentReport', collection, userId);
    },

    sortByFirstName() {
      this.sendAction('sortByFirstName');
    },

    sortByLastName() {
      this.sendAction('sortByLastName');
    },

    openCollectionReport(collection, collections) {
      this.sendAction('openCollectionReport', collection, collections);
    },

    onClickScrollLeftArrow() {
      let component = this;
      let scrollLeft = component.$('.table-fixed-right').scrollLeft() - 400;
      component.$('.table-fixed-right').animate(
        {
          scrollLeft: `${scrollLeft}px`
        },
        400
      );
    },

    onClickScrollRightArrow() {
      let component = this;
      let scrollLeft = component.$('.table-fixed-right').scrollLeft() + 400;
      component.$('.table-fixed-right').animate(
        {
          scrollLeft: `${scrollLeft}px`
        },
        400
      );
    }
  }
});
