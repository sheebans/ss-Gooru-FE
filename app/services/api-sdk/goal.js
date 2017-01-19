import Ember from 'ember';
import GoalSerializer from 'gooru-web/serializers/goal/goal';
import GoalAdapter from 'gooru-web/adapters/goal/goal';

/**
 * Goal Service
 *
 * Service responsible for performing CRUD operations on a goal model
 *
 * @typedef {Object} GoalService
 * @augments Ember/Service
 */
export default Ember.Service.extend({

  // -------------------------------------------------------------------------
  // Events

  init: function () {
    this._super(...arguments);
    this.set('serializer', GoalSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('adapter', GoalAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {GoalSerializer} serializer
   */
  serializer: null,

  /**
   * @property {GoalAdapter} adapter
   */
  adapter: null,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Creates a goal
   * @param {Goal} goal
   * @returns {Promise|Goal} returns the goal model with the newly assigned ID
   */
  createGoal: function (goal) {
    var data = this.get('serializer').serializeCreateGoal(goal);

    return this.get('adapter').createGoal(data).then(function (goalId) {
      goal.set('id', goalId);
      return goalId;
    });
  }
});
