import Ember from 'ember';
import { momentToTimestamp, toUtc } from 'gooru-web/utils/utils';

/**
 * Serializer to support the Goal CRUD operations
 *
 * @typedef {Object} GoalSerializer
 */
export default Ember.Object.extend({


  /**
   * Serialize a Goal/Goal object into a JSON representation required by the Create goal endpoint
   *
   * @param model - The goal model to be serialized
   * @returns {Object} JSON Object representation of the goal model
   */
  serializeCreateGoal: function (model) {
    return this.serializeGoal(model);
  },

  /**
   * Serialize a Goal/Goal object into a JSON representation
   *
   * @param {Goal} model - The goal model to be serialized
   * @returns {Object} JSON Object representation of the unit model
   */
  serializeGoal: function (model) {
    return {
      "title": model.get('title'),
      "description": model.get('description'),
      "start_date": momentToTimestamp(toUtc(model.get("startDate"))),
      "end_date": momentToTimestamp(toUtc(model.get("endDate"))),
      "status": model.get("status"),
      "reflection" : model.get("reflection")
    };
  }

});
