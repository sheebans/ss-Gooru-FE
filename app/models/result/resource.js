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
  timeSpent: Ember.computed.bool('startedAt', 'submittedAt', function () {
    var timeSpent = 0;
    var submittedAt = this.get('submittedAt');

    if (submittedAt) {
      let startedAt = this.get('startedAt');
      timeSpent = Math.round(submittedAt.getTime() - startedAt.getTime()) / 1000;
    }
    return timeSpent;
  }),

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
  startedAt: null,

  /**
   * Indicates when the result was submitted
   * @property {Date}
   */
  submittedAt: null,

  /**
   * A result is started when it has time spent
   * @property {boolean} indicates when it has been started
   */
  started: Ember.computed.bool("timeSpent"),

  /**
   * Indicates if it is submitted
   * @return {boolean}
   */
  submitted: Ember.computed.bool("submittedAt"),

  /**
   * Indicates if the result is pending, it means it has started but not submitted
   * @property {boolean}
   */
  pending: Ember.computed("startedAt", "submitted", function(){
    return this.get("startedAt") && !this.get("submitted");
  }),

  /**
   * Indicates if it is completed
   * All started question are treated as completed
   * @return {boolean}
   */
  completed: Ember.computed.bool("started"),


  // -------------------------------------------------------------------------
  // Observer

  /**
   * When the start at changes it resets some properties
   */
  onStartAtChange: Ember.observer("startedAt", function(){
    this.set('submittedAt', null);
  })

});
