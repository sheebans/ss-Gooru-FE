import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['competency-content-report'],

  // -------------------------------------------------------------------------
  // Dependencies
  competencyService: Ember.inject.service('api-sdk/competency'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.loadCompetencyPerformanceData();
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadCompetencyPerformanceData
   * Method to load individual competency performance of the user
   */
  loadCompetencyPerformanceData() {
    let component = this;
    return Ember.RSVP.hash({
      collectionPerformances: component.fetchUserCompetencyPerformance()
    })
      .then(({collectionPerformances}) => {
        component.set('collectionPerformances', collectionPerformances);
      });
  },

  /**
   * @function fetchUserCompetencyPerformance
   * Method to fetch competency performance of an user
   */
  fetchUserCompetencyPerformance() {
    let component = this;
    let competencyService = component.get('competencyService');
    let userId = component.get('userId');
    let competencyCode = component.get('competency.competencyCode');
    return new Ember.RSVP.resolve(competencyService.getUserPerformanceCompetencyCollections(userId, competencyCode));
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Array} collectionPerformances
   */
  collectionPerformances: Ember.A([])
});
