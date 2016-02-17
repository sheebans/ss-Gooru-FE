import Ember from "ember";

/**
 * User resource results
 *
 * @typedef {Object} UserResourcesResult
 *
 */
export default Ember.Object.extend({


  //
  // Properties
  /**
   * @property {ResourceResult[]} questionResults
   */
  resourceResults: [],

  /**
   * @property {QuestionResult[]} questionResults
   */
  questionResults: Ember.computed("resourceResults.[]", function(){
    return this.get("resourceResults").filter(function(resourceResult){
      return resourceResult.get("questionId") || //if it has a question id
        resourceResult.get("resource.isQuestion"); // or the resource is a question
    });
  }),

  /**
   * @property {string} user
   */
  user: null,


  //
  // Methods
  /**
   * Gets the result by resource id
   * @param {string} resourceId
   * @returns {ResourceResult}
   */
  getResultByResourceId: function(resourceId){
    return this.get("resourceResults").findBy("resourceId", resourceId);
  }

});
