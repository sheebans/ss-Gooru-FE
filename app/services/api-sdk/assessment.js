import Ember from 'ember';
import AssessmentSerializer from 'gooru-web/serializers/content/assessment';
import AssessmentAdapter from 'gooru-web/adapters/content/assessment';


/**
 * @typedef {Object} AssessmentService
 */
export default Ember.Service.extend({

  /**
   * @property {AssessmentSerializer} assessmentSerializer
   */
  assessmentSerializer: null,

  /**
   * @property {AssessmentAdapter} assessmentAdapter
   */
  assessmentAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('assessmentSerializer', AssessmentSerializer.create());
    this.set('assessmentAdapter', AssessmentAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  /**
   * Creates a new assessment
   *
   * @param assessmentData object with the assessment data
   * @returns {Promise}
   */
  createAssessment: function(assessmentData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedClassData = service.get('assessmentSerializer').serializeCreateAssessment(assessmentData);
      service.get('assessmentAdapter').createAssessment({
        body: serializedClassData
      }).then(function(responseData, textStatus, request) {
        let assessmentId = request.getResponseHeader('location');
        assessmentData.set('id', assessmentId);
        resolve(assessmentData);
      }, function(error) {
        reject(error);
      });
    });
  }
});
