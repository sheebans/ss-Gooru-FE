import Ember from 'ember';
import Bookmark from 'gooru-web/models/content/bookmark';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Controller} Application controller
   */
  appController: Ember.inject.controller('application'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {

  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * The library presented to the user
   * @property {Object}
   */
  library: null,
});
