import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Type of collection filter selected
   *  @property {string} selectedCollectionType
   *
   */
  selectedCollectionType: 'collection',

  /**
   * True if collection filter option is selected
   *  @property {boolean} collectionFilterSelected
   *
   */

  collectionFilterSelected: Ember.computed('selectedCollectionType', function() {
    var selectedCollectionType = this.get('selectedCollectionType');

    return (!selectedCollectionType || selectedCollectionType === 'collection');
  }),

  /**
   * True if assessment filter option is selected
   *  @property {boolean} assessmentFilterSelected
   *
   */

  assessmentFilterSelected: Ember.computed('selectedCollectionType', function() {
    var selectedCollectionType = this.get('selectedCollectionType');

    return (selectedCollectionType && selectedCollectionType === 'assessment');
  }),

  /**
   * True if resources filter option is selected
   *  @property {boolean} resourcesFilterSelected
   *
   */

  resourcesFilterSelected: Ember.computed('selectedCollectionType', function() {
    var selectedCollectionType = this.get('selectedCollectionType');

    return (selectedCollectionType && selectedCollectionType === 'resources');
  }),

  /**
   * True if questions filter option is selected
   *  @property {boolean} questionsFilterSelected
   *
   */

  questionsFilterSelected: Ember.computed('selectedCollectionType', function() {
    var selectedCollectionType = this.get('selectedCollectionType');

    return (selectedCollectionType && selectedCollectionType === 'questions');
  }),

  actions: {

    /**
     * Triggered when search filter is selected
     * @param {String} filterType
     */
    searchFilter: function(filterType){
      this.set('selectedCollectionType',filterType);
      this.sendAction("onFilterType", this.get("term"),filterType);
    }
  }

});
