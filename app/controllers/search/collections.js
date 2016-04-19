import Ember from 'ember';

/**
 * Collection search controller
 *
 * Controller responsible for filtering and searching collections/assessments
 *
 * @module
 * @see controllers/player.js
 * @augments ember/Controller
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
   * @property {CollectionResult[]}
   */
  collectionResults: null,

  /**
   * @property {string} term filter
   */
  term: Ember.computed.alias("searchController.term")

  // -------------------------------------------------------------------------
  // Methods

});
