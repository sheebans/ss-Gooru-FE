/**
 * Course card
 *
 * Component responsible for show the  course information in cards, so that most useful information is summarized there.
 * @module
 * @see controllers/profile/about.js
 */

import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-course-card'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Course} course
   */
  course: null,

  /**
   * @property {Array} users
   */
  users: null,



});
