import Ember from "ember";
import GruTheme from '../utils/gru-theme';
import Env from '../config/environment';
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

/**
 * @typedef {object} ApplicationRoute
 */
export default Ember.Route.extend(ApplicationRouteMixin, {

  // -------------------------------------------------------------------------
  // Properties

  i18n: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    const route = this;
    const currentSession = route.get("session.data.authenticated");
    const themeConfig = Env['themes'] || {};
    const themeId = params.theme || Env['themes'].default;

    var theme = null;
    if (themeId && themeConfig[themeId]){
      theme = GruTheme.create(themeConfig[themeId]);
    }

    return Ember.RSVP.hash({
      currentSession: currentSession,
      theme: theme,
      translations: theme ? theme.get("translations") : null
    });
  },

  setupController: function(controller, model){
    const theme = model.theme;
    if (theme){
      this.setupTheme(theme, model.translations);
    }
  },

  /**
   * Setups the application theme
   * @param {GruTheme} theme
   * @param {{}} translations theme translations
   */
  setupTheme: function(theme, translations){
    this.setupThemeTranslations(theme.get("locale"), translations);
    //TODO setupThemeStyles
  },

  /**
   * Setups theme translations
   * @param {string} locale theme locale
   * @param {{}} translations theme translations
   */
  setupThemeTranslations: function(locale, translations){
    const i18n = this.get("i18n");
    //sets the theme locale
    i18n.set("locale", locale);

    //Add the translations
    Object.keys(translations).forEach((locale) => {
      i18n.addTranslations(locale, translations[locale]);
    });
  },

  // -------------------------------------------------------------------------
  // Actions - only transition actions should be placed at the route
  actions: {
    /**
     * Action triggered when submitting the login form
     * @see application.hbs
     * @see gru-header.hbs
     */
    signIn: function() {
      this.transitionTo("index");
    },

    /**
     * Action triggered when login out
     */
    logout: function() {
      this.get("session").invalidate();
      this.refresh();
    },

    /**
     * Action triggered when the user search for collections
     * @see application.hbs
     * @see gru-header.js
     */
    searchTerm: function(term) {
      var termParam = '?term=' + term;
      this.transitionTo('/search/collections' + termParam);
    }
  }

});
