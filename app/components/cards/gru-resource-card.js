/**
 * Resource card
 *
 * Component responsible for show the  resource information in cards, so that most useful information is summarized there.
 * @module
 *
 */

import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-resource-card'],

  // -------------------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource} resource information to be used in the card
   */
  resource: null,
  /**
   * @property {result} Optional resource result
   */
  result:null



});
