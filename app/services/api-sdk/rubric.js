import Ember from 'ember';
import RubricSerializer from 'gooru-web/serializers/rubric/rubric';
import RubricAdapter from 'gooru-web/adapters/rubric/rubric';

/**
 * Rubric Service
 *
 * Service responsible for performing CRUD operations on a rubric model
 *
 * @typedef {Object} RubricService
 * @augments Ember/Service
 */
export default Ember.Service.extend({

  // -------------------------------------------------------------------------
  // Events

  init: function () {
    this._super(...arguments);
    this.set('serializer', RubricSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('adapter', RubricAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {RubricSerializer} serializer
   */
  serializer: null,

  /**
   * @property {RubricAdapter} adapter
   */
  adapter: null,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Creates a rubric
   * @param {Rubric} rubric
   * @returns {Promise|Rubric} returns the rubric model with the newly assigned ID
   */
  createRubric: function (rubric) {
    var data = this.get('serializer').serializeCreateRubric(rubric);

    return this.get('adapter').createRubric(data).then(function (rubricId) {
      rubric.set('id', rubricId);
      return rubricId;
    });
  },

  /**
   * Creates a rubric OFF
   *
   * @param rubricOffData object with the rubric off data
   * @returns {Promise}
   */
  createRubricOff: function(rubricOffData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedRubricOffData = service.get('serializer').serializeCreateRubricOff(rubricOffData);
      service.get('adapter').createRubricOff({
        body: serializedRubricOffData
      }).then(function(responseData, textStatus, request) {
        let rubricOffId = request.getResponseHeader('location');
        rubricOffData.set('id', rubricOffId);
        resolve(rubricOffData);
      }, function(error) {
        reject(error);
      });
    });
  },


  /**
   * Updates a rubric
   * @param {Rubric} rubric
   * @returns {Promise|Rubric} returns the rubric model with the newly assigned ID
   */
  updateRubric: function (rubric) {
    var data = this.get('serializer').serializeUpdateRubric(rubric);
    return this.get('adapter').updateRubric(data, rubric.get('id'));
  },

  /**
   * Deletes a rubric
   * @param {String} rubricId
   * @returns {Promise|boolean} returns true if deleted
   */
  deleteRubric: function (rubricId) {
    return this.get('adapter').deleteRubric(rubricId);
  },

  /**
   * Returns rubric
   * @param {string} rubricId
   * @returns {Promise|Rubric}
   */
  getRubric: function (rubricId) {
    const service = this;
    return service.get('adapter').getRubric(rubricId)
      .then(function (data) {
        return service.get('serializer').normalizeRubric(data);
      });
  },

  /**
   * Returns user rubrics
   * @param {string} userId
   * @returns {Promise|Rubric[]}
   */
  getUserRubrics: function (userId) {
    const service = this;
    return service.get('adapter').getUserRubrics(userId)
      .then(function (data) {
        return service.get('serializer').normalizeGetRubrics(data);
      });
  },

  /**
   * Copies a rubric
   * @param {String} rubricId
   * @returns {Promise|string} returns the copied id
   */
  copyRubric: function (rubricId) {
    return this.get('adapter').copyRubric(rubricId);
  },

  /**
   * Associates a rubric with a question
   * @param {String} rubricId
   * @param {String} questionId
   * @returns {Promise|boolean} true when successful
   */
  associateRubricToQuestion: function (rubricId, questionId) {
    return this.get('adapter').associateRubricToQuestion(rubricId, questionId);
  }

});
