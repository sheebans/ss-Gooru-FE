import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'gru-assessment-report'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Result of an attempt made by the user for an assessment
   * @property { AssessmentResult }
   */
  assessmentResult: null

});
