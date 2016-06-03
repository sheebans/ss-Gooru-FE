import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
/**
 * Collection and Assessment card
 *
 * Component responsible of showing the collection or assessmentO information in cards, so that most useful information is summarized there.
 * @module
 */

export default Ember.Component.extend(ModalMixin,{
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['cards','gru-collection-card'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered to open the content player
     * @param {string} collectionId collection identifier
     */
    openContentPlayer: function(collectionId) {
      this.sendAction("onOpenContentPlayer", collectionId);
    },

    editCollection: function(){
      this.sendAction("onEditCollection", this.get("collection"));
    },

    remixCollection: function(){
      if (this.get('session.isAnonymous')) {
        this.send('showModal', 'content.modals.gru-login-prompt');
      } else {
        this.sendAction("onRemixCollection", this.get("collection"));
      }
    }
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Collection/Resource} collection
   */
  collection: null,
  /**
   * @property {string} on content player action
   */
  onOpenContentPlayer: null,

  /**
   * @property {boolean} Indicates if collection has 1 or more resources
   */
  hasResources: Ember.computed.gt('collection.resourceCount', 0),

  /**
   * @property {boolean} Indicates if collection has 1 or more questions
   */
  hasQuestions: Ember.computed.gt('collection.questionCount', 0),

  /**
   * @property {boolean}
   */
  isAssessment: Ember.computed.alias('collection.isAssessment'),

  /**
   * @property {String} remixedByUser
   */
  //remixedByUser: Ember.computed('collection',function(){
  //  return this.get('collection.remixedBy')[0];
  //}),
  /**
   * @property {Number} remixedUsers
   */
  //remixedUsers:Ember.computed('collection',function(){
  //  return (this.get('collection.remixedBy').length)-1;
  //}),

  /**
   * Indicates if the edit functionality is enabled
   * @property {boolean}
   */
  editEnabled: false,

  /**
   * Indicates if the edit functionality is enabled
   * @property {boolean}
   */
  remixEnabled: Ember.computed.not('editEnabled'),

  /**
   * Indicates if the edit functionality is enabled
   * @property {boolean}
   */
  addEnabled: true,

  /**
   * @property {string} edit action
   */
  onEditCollection: null,

  /**
   * @property {string} remix action
   */
  onRemixCollection: null,

  visibility:null,

  isSmall: false

});
