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
   * Loaded styles
   * @property {string} styles
   */
  styles: '',

  /**
   * @property {string} path to a javascript translation file complaint with ember-i18n
   */
  translationsUrl: null,

  /**
   * Loaded translations
   * @property {[]} translations
   * @private
   */
  translations: Ember.A(),

  // -------------------------------------------------------------------------
  // Methods
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
  loadTranslations: function(){
    const theme = this;
    const url = theme.get("translationsUrl");
    if (url){
      return theme._loadTranslations(url).then(function(translations){
          theme.set("translations", translations);
          return translations;
        });
    }
    return Ember.A();
  },

  /**
   * Loads translations from a url
   * @param {string} url
   * @returns {Promise}
   * @private
   */
  _loadTranslations: function(url){
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.$.get(url, null, resolve);
    });
  },


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
  loadStyles: function(){
    const theme = this;
    const url = theme.get("stylesUrl");
    if (url){
      return theme._loadStyles(url).then(function(styles){
        theme.set("styles", styles);
        return styles;
      });
    }
    return '';
  },

  /**
   * Loads Styles from a url
   * @param {string} url
   * @returns {Promise}
   */
  _loadStyles: function(url){
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.$.get(url, null, resolve);
    });
  }


});

