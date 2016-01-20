import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'gru-assessment-report'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {AssessmentResult} assessment
   */
  assessment: null,

  /**
   * @property {AttemptResult} attempt
   */
  attempt: null

});
