import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  model: function(params) {
    const selectedOptionTypes = params.selectedOptionTypes;
    const term = this.paramsFor('search').term;
    var questionResults = this.get('searchService').searchQuestions(term, selectedOptionTypes);
    return Ember.RSVP.hash({
      term:term,
      questions: questionResults,
      selectedOptionTypes: selectedOptionTypes
    });
  },

  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('questionResults', model.questions);
    controller.set('selectedOptionTypes', model.selectedOptionTypes);
    controller.set('term', model.term);
  },

  deactivate: function() {
    this.get("controller").resetValues();
  }


});
