import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  model: function(params) {
    const selectedOptionTypes = params.selectedOptionTypes;
    const taxonomies = this.paramsFor('search').taxonomies;
    const term = this.paramsFor('search').term;
    const options = {
      formats: selectedOptionTypes,
      taxonomies: taxonomies
    };

    var questionResults = this.get('searchService').searchQuestions(term, options);
    return Ember.RSVP.hash({
      questions: questionResults
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
  },

  deactivate: function() {
    this.get("controller").resetValues();
  }


});
