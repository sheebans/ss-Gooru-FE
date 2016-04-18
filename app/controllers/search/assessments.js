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
   * These are the assessment search results
   * @property {Assessment[]}
   */
  assessmentResults: null,

  /**
   * @property {string} term filter
   */
  term: Ember.computed.alias("searchController.term")

  // -------------------------------------------------------------------------
  // Methods

});
