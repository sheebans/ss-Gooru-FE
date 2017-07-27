import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import { DEFAULT_PAGE_SIZE } from 'gooru-web/config/config';

export default Ember.Route.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * On card play question button click
     * @param {Question} question
     */
    playQuestion: function (question) {
      this.transitionTo('content.questions.play', question.get('id'));
    },

    /**
     * On card remix question button click
     * @param {Question} question
     */
    remixQuestion: function(question) {
      var remixModel = {
        content: question
      };
      this.send('showModal', 'content.modals.gru-question-remix', remixModel);
    }

  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    const libraryId = this.paramsFor('partner-library').id;
    return this.get('libraryService').fetchLibraryContent(libraryId,
      'question', DEFAULT_PAGE_SIZE).then(function(questions) {
        return Ember.RSVP.hash({
          libraryId,
          questions: questions.libraryContent.questions,
          owners: questions.libraryContent.ownerDetails
        });
    });
  },

  setupController: function (controller, model) {
    controller.set('libraryId', model.libraryId);
    controller.set('questions', controller.mapOwners(model.questions,
      model.owners));
  }

});
