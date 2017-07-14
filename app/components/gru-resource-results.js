import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Component.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-resource-results'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered to play the resource/question
     */
    playQuestion: function(question) {
      this.get('router').transitionTo('content.resources.play', question.get('id'));
    },

    /**
     * Action triggered to remix the question
     */
    remixQuestion: function(question) {
      var remixModel = {
        content: question
      };
      this.send('showModal', 'content.modals.gru-question-remix', remixModel);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Profile information
   * @property {Profile} profile
   */
  profile: null,

  /**
   * @property {array} Resource results for the search
   */
  resourceResults: null,

  /**
   * @property {array} Term used to search
   */
  term: ''

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
});
