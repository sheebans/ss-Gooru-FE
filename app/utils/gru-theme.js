import Ember from 'ember';

/**
 * This util class holds the information for a Gooru Theme.
 * Gooru themes are useful to setup the application branding, messages and locale
 *
 * @typedef {object} GruTheme
 */
export default Ember.Object.extend({

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {string} theme id
   */
  id: null,

  /**
   * @property {string} default application locale for this theme
   */
  locale: 'en',

  /**
   * @property {string} path to the style/css file for this theme
   */
  stylesUrl: null,

  /**
   * @property {string} path to a javascript translation file complaint with ember-i18n
   */
  translationsUrl: null,

  /**
   * Returns theme translations
   *
   * {
   *   "en" : {
   *      "common" : {
   *        "search": "Search"
   *      }
   *    }
   * }
   *
   */
  translations: function(){
    return this.get("translationsUrl") ? Ember.$.get(this.get("translationsUrl")) : Ember.A();
  }.property()

  // -------------------------------------------------------------------------
  // Methods



});

