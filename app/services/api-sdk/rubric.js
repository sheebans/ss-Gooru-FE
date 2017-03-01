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
  }

});
