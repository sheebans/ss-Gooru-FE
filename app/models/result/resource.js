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
   * @property {string} title - Resource title
   */
  title: '',

  /**
   * Indicates the resource type. i.e video/youtube, assessment-question, image/png
   * @property {string} resource type
   */
  resourceType: '',

  /**
   * @property {number} reaction - Value of the reaction the user had towards the question
   */
  reaction: 0,

  /**
   * @property {number} timeSpent - Time in seconds that it took the user to answer the question
   */
  timeSpent: 0

});
