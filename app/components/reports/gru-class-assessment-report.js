import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'gru-class-assessment-report'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Set a new emotion as selected and update the component appearance accordingly
     *
     * @function actions:changeView
     * @param {bool} selectTableView
     * @returns {undefined}
     */
    changeView: function (selectTableView) {
      const isTableViewSelected = this.get('isTableView');

      if (selectTableView !== isTableViewSelected) {
        this.set('isTableView', selectTableView);
      }
    }
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Model for the assessment taken by a group of students
   * @prop { Collection }
   */
  collection: null,

  /**
   * Is the table view currently selected?
   * @prop { bool }
   */
  isTableView: true,

  /**
   * Group of students taking an assessment
   * @prop { User[] }
   */
  users: null,

  /**
   * List of results for every question in the assessment for each student in the class
   * @prop { User[] }
   */
  results: null


});
