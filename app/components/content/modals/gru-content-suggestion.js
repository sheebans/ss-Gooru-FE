import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-content-suggestion'],

  // -------------------------------------------------------------------------
  // Services

  /**
   * @required collectionService
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @required assessmentService
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    let mapLocation = component.get('mapLocation');
    let suggestedContent = mapLocation.suggestions[0];
    let currentContentContext = mapLocation.context;
    let currentItemId = currentContentContext.itemId;
    component.animateComponent();
    let currentContentPromise =
      currentContentContext.itemType === 'assessment'
        ? component.getAssessmentById(currentItemId)
        : component.getCollectionById(currentItemId);
    currentContentPromise.then(function(currentContent) {
      component.set('suggestedContent', suggestedContent);
      component.set('currentContent', currentContent);
    });
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when the user accept a suggestion
     */
    onAcceptSuggestion() {
      let component = this;
      component.sendAction('onAcceptSuggestion');
    },

    /**
     * Action triggered when the user ignore a suggestion
     */
    onIgnoreSuggestion() {
      let component = this;
      component.sendAction('onIgnoreSuggestion');
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function animateComponent
   * Method to animate the component
   */
  animateComponent() {
    let component = this;
    component.$().animate(
      {
        top: '20%',
        left: '20%'
      },
      850
    );
  },

  /**
   * @function getCollectionById
   * Method to get a collection using ID
   */
  getCollectionById(collectionId) {
    let component = this;
    const collectionService = component.get('collectionService');
    return Ember.RSVP
      .hash({
        collection: collectionService.readCollection(collectionId)
      })
      .then(function(hash) {
        return hash.collection;
      });
  },

  /**
   * @function getAssessmentById
   * Method to get a assessment by ID
   */
  getAssessmentById(assessmentId) {
    let component = this;
    const assessmentService = component.get('assessmentService');
    return Ember.RSVP
      .hash({
        assessment: assessmentService.readAssessment(assessmentId)
      })
      .then(function(hash) {
        return hash.assessment;
      });
  }
});
