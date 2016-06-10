import Ember from "ember";
import GruTheme from '../utils/gru-theme';
import Env from '../config/environment';
import PublicRouteMixin from "gooru-web/mixins/public-route-mixin";
import GooruLegacyUrl from 'gooru-web/utils/gooru-legacy-url';

/**
 * @typedef {object} ApplicationRoute
 */
export default Ember.Route.extend(PublicRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  i18n: Ember.inject.service(),

  /**
   * @type {ClassService} Service to retrieve user information
   */
  classService: Ember.inject.service("api-sdk/class"),

  session: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function(transition) {
    const marketing = this.handleMarketingSiteIfNecessary();
    if (marketing){
      transition.abort();
    }
  },

  model: function(params) {
    const route = this;
    const currentSession = route.get("session.data.authenticated");
    const themeConfig = Env['themes'] || {};
    const themeId = params.themeId || Env['themes'].default;
    let myClasses = null;

    var theme = null;
    if (themeId && themeConfig[themeId]){
      theme = GruTheme.create(themeConfig[themeId]);
      theme.set("id", themeId);
    }

    if (!currentSession.isAnonymous) {
      myClasses = route.get('classService').findMyClasses();
    }

    return Ember.RSVP.hash({
      currentSession: currentSession,
      theme: theme,
      translations: theme ? theme.loadTranslations() : null,
      myClasses: myClasses
    });
  },

  afterModel: function(){
    this.handleLegacyUrlIfNecessary();
  },


  setupController: function(controller, model) {
    const theme = model.theme;
    if (theme){
      controller.set("theme", theme);
      this.setupTheme(theme, model.translations);
    }
    controller.set('myClasses', model.myClasses);
  },

  /**
   * Setups the application theme
   * @param {GruTheme} theme
   * @param {*} translations
   */
  setupTheme: function(theme, translations){
    this.setupThemeStyles(theme);
    this.setupThemeTranslations(theme.get("translations.locale"), translations);
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

  /**
   * Sets the theme styles if available
   * @param {GruTheme} theme
   */
  setupThemeStyles: function(theme){
    //setting theme id at html tag
    Ember.$('html').attr("id", theme.get("id"));
    //adding theme styles to head tag
    const themeStylesUrl = theme.get("styles.url");
    if (themeStylesUrl){
      Ember.$('head').append(`<link id="theme-style-link" rel="stylesheet" type="text/css" href="${themeStylesUrl}">`);
    }
  },

  /**
   * Handles a url when necessary
   */
  handleLegacyUrlIfNecessary: function() {
    const route = this;
    const legacyUrl = GooruLegacyUrl.create({
      url: route.get("router.url")
    });

    if (legacyUrl.get("isLegacyUrl")) { //checking for a legacy legacyUrl
      const routeParams = legacyUrl.get("routeParams");
      if (routeParams) {
        route.transitionTo.apply(route, routeParams);
      }
    }
  },

  /**
   * Handles a marketing site request when necessary
   */
  handleMarketingSiteIfNecessary: function() {
    const route = this;
    const anonymous = route.get("session.isAnonymous");
    const url = route.get("router.url");
    const isIndex = url === "/" || url.indexOf("/index") > 0;
    const isProd = Env.environment === 'production';
    const googleSignIn = url.indexOf("access_token") > 0; //if it has the access_token parameter
    if (anonymous && isIndex && !googleSignIn && isProd) {
      window.location = Env.marketingSiteUrl; //this is not an ember route, see nginx.conf
      return true;
    }
    return false;
  },

  // -------------------------------------------------------------------------
  // Actions - only transition actions should be placed at the route
  actions: {
    /**
     * Action triggered when submitting the login form
     * @see application.hbs
     * @see gru-header.hbs
     */
    signIn: function () {
      this.send('updateUserClasses'); // Required to get list of classes after login
      this.transitionTo("home");
    },

    /**
     * Action triggered when login out
     */
    logout: function () {
      this.transitionTo("logout");
    },

    /**
     * Action triggered when the user search for collections
     * @see application.hbs
     * @see gru-header.js
     */
    searchTerm: function (term) {
      const routeName = this.get('controller.currentRouteName');
      if (routeName.indexOf("search") >= 0) {
        this.set("controller.term", term);
      }
      else {
        var termParam = '?term=' + term;
        this.transitionTo('/search/collections' + termParam);
      }
    },

    /**
     * Gets a refreshed list of user classes
     * @see gru-class-new.js
     * @see join.js
     */
    updateUserClasses: function() {
      const route = this;
      route.get('classService').findMyClasses()
        .then(function(classes) {
          route.set('controller.myClasses', classes);
        });
    }
  }

});
