import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
/**
 * Resource and Question card
 *
 * Component responsible of showing the resource or question information in cards, so that most useful information is summarized there.
 * @module
 */

export default Ember.Component.extend(ModalMixin,{
  // Dependencies

  /**
   * @property {Service} session
   */
  session: Ember.inject.service('session'),

  /**
   * @property {Service} profile service
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['cards','gru-resource-card'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Action triggered to edit the resource/question
     */
    editResource: function(){
      this.sendAction("onEditResource", this.get("resource"));
    },

    /**
     * Action triggered to remix the question
     */
    remixQuestion: function(){
      if (this.get('session.isAnonymous')) {
        this.send('showModal', 'content.modals.gru-login-prompt');
      } else {
        this.sendAction("onRemixQuestion", this.get("resource"));
      }
    },

    /**
     * Action triggered to add to collection
     */
    addToCollection: function(){
      if (this.get('session.isAnonymous')) {
        this.send('showModal', 'content.modals.gru-login-prompt');
      } else {
        if(this.get('isQuestion')) {
          this.get('profileService').readAssessments(this.get('session.userId')).then(
            collections => this.send('showModal', 'content.modals.gru-add-to', {
              content: this.get('resource'),
              collections
            }, null, "add-to")
          );
        } else {
          this.get('profileService').readCollections(this.get('session.userId')).then(
            collections => this.send('showModal', 'content.modals.gru-add-to', {
              content: this.get('resource'),
              collections
            }, null, "add-to")
          );
        }
      }
    }
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource|Question} resource
   */
  resource: null,

  /**
   * Indicates if this resource is a question
   * @property {boolean}
   */
  isQuestion: Ember.computed.equal("resource.format", "question"),

  /**
   * Indicates if the edit functionality is enabled
   * @property {boolean}
   */
  editEnabled: false,

  /**
   * Indicates if the remix functionality is enabled
   * @property {boolean}
   */
  remixEnabled: Ember.computed.not('editEnabled'),

  /**
   * @property {string} edit action
   */
  onEditResource: null,

  /**
   * @property {string} remix action
   */
  onRemixQuestion: null

});
