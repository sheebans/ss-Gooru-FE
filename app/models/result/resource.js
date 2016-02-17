//import DS from "ember-data";
import Ember from "ember";

/**
 * Model for the status of a resource after it has been viewed by a user.
 *
 * @typedef {Object} ResourceResult
 *
 */
export default Ember.Object.extend({

  /**
   * @property {number} reaction - Value of the reaction the user had towards the question
   */
  reaction: 0,

  /**
   * @property {number} timeSpent - Time in seconds that it took the user to answer the question
   *
   * This value is also modify by @see submittedAt and @see startedAt property definition
   */
  timeSpent: 0,

  /**
   * @property {Resource} resource
   */
  resource: null,

  /**
   * Sometimes the resource is not resolved and only the id is provided
   * This is used mostly by the real time
   * TODO once the SDK is integrated we could analyze if is possible to use only 'resource'
   * @property {number} resourceId - ID of the resource
   */
  resourceId: null,

  /**
   * Indicates when the result was started
   * @property {Date}
   */

  startedAt: Ember.computed({
    set(key, value) {
      Ember.Logger.debug("Updating key" + key);
      this.set('submittedAt', null);
      return value;
    }
  }),

  /**
   * Indicates when the result was submitted
   * @property {Date}
   */
  submittedAt: Ember.computed({
    set(key, value) {
      Ember.Logger.debug("Updating key" + key);

      let timeSpent = 0;
      if (value){
        let startedAt = this.get("startedAt");
        if (startedAt){ //updating time spent when submitted at is changed
          timeSpent = Math.round(value.getTime() - startedAt.getTime()) / 1000;
        }
      }

      this.set('timeSpent', timeSpent);
      return value;
    }
  }),

  /**
   * A result is started when it has time spent
   * @property {boolean} indicates when it has been started
   */
  started: Ember.computed.bool("timeSpent")




});
