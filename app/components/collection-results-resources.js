import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * @property {object} Collection item
   */
  collection: null,

  /**
   * @property {array} List of resources of the collection
   */
  resources: null,

  /**
   * @property {boolean} Indicates if collection has 1 or more resources
   */
  hasResources: function() {
    var resourceCount = this.get('collection.resourceCount');
    return (resourceCount ? resourceCount > 0 : false);
  }.property(),

  /**
   * @property {boolean} Indicates if collection has more than 1 resource
   */
  hasSeveralResources: function() {
    var resourceCount = this.get('collection.resourceCount');
    return (resourceCount ? resourceCount > 1 : false);
  }.property(),

  /**
   * @property {boolean} Indicates if collection has 1 or more questions
   */
  hasQuestions: function() {
    var questionCount = this.get('collection.questionCount');
    return (questionCount ? questionCount > 0 : false);
  }.property(),

  /**
   * @property {boolean} Indicates if collection has more than 1 question
   */
  hasSeveralQuestions: function() {
    var questionCount = this.get('collection.questionCount');
    return (questionCount ? questionCount > 1 : false);
  }.property()

});
