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
  session: Ember.inject.service('session'),

  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['cards','gru-resource-card'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    editResource: function(){
      this.sendAction("onEditResource", this.get("resource"));
    },

    remixQuestion: function(){
      if (this.get('session.isAnonymous')) {
        this.send('showModal', 'content.modals.gru-login-prompt');
      } else {
        this.sendAction("onRemixQuestion", this.get("resource"));
      }
    },

    addToCollection: function(){
      if (this.get('session.isAnonymous')) {
        this.send('showModal', 'content.modals.gru-login-prompt');
      } else {
        this.get('profileService').readCollections(this.get('session.userId')).then(
          collections => this.send('showModal', 'content.modals.gru-add-to', {
            content: this.get('resource'),
            collections
          }, null, "add-to")
        );
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
