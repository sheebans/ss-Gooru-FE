import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'gru-class-assessment-report'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Model for the assessment taken by a group of students
   * @prop { Collection }
   */
  collection: null,

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
