import Ember from 'ember';

/**
 * Assessments Controller
 *
 * @module
 * @augments ember/CollectionsController
 */
export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  searchController: Ember.inject.controller('search'),

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Services

  // -------------------------------------------------------------------------
  // Properties

  /**
   * These are the collection search results
   * @property {CollectionResults[]}
   */
  collectionResults: null

  // -------------------------------------------------------------------------
  // Methods

});
