import Ember from 'ember';
import SessionMixin from '../mixins/session';
import ModalMixin from '../mixins/modal';
import { KEY_CODES } from 'gooru-web/config/config';
import EndPointsConfig from 'gooru-web/utils/endpoint-config';
import Env from 'gooru-web/config/environment';

/**
 * Application header component
 * @see application.hbs
 *
 *
 * @module
 * @typedef {object} AppHeader
 */
export default Ember.Component.extend(SessionMixin, ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),
  //themeChanger: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-header', 'navbar-fixed-top'],

  locales: Ember.computed('i18n.locale', 'i18n.locales', function() {
    const i18n = this.get('i18n');

    var arr = Ember.A();
    this.get('i18n.locales').map(function(loc) {
      if (
        loc !== 'en/quizzes' &&
        loc !== 'sp/quizzes' &&
        loc !== 'ar/quizzes'
      ) {
        arr.addObject({
          id: loc,
          text: i18n.t(loc)
        });
      }
    });

    return arr;
  }),

  tagName: 'header',
  showDropMenu: false,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    logout: function() {
      this.sendAction('onLogout');
    },
    setLocale(selVal) {
      this.set('i18n.locale', selVal);
      if (selVal === 'ar') {
        const rootElement = Ember.$(Env.rootElement);
        rootElement.addClass('changeDir');
        rootElement.removeClass('changeDirDefault');
        //this.get('themeChanger').set('theme', 'goorurtl');
        Env.APP.isRTL = true;
      } else {
        const rootElement = Ember.$(Env.rootElement);
        rootElement.removeClass('changeDir');
        rootElement.addClass('changeDirDefault');
        //this.get('themeChanger').set('theme', 'goorultr');
        Env.APP.isRTL = false;
      }
    },

    searchTerm: function() {
      var term = $.trim(this.get('tempTerm'));
      var isIncorrectTermSize = this.get('isIncorrectTermSize');
      if (!isIncorrectTermSize) {
        this.set('term', term);
        this.set('isInvalidSearchTerm', false);
        this.sendAction('onSearch', this.get('term'));
      }
    },

    inputValueChange: function() {
      this.set('isTyping', false);
    },

    navigateToResearchApp: function() {
      let researcher = EndPointsConfig.getResearcher();
      if (researcher && researcher.redirectURL) {
        let url = `${researcher.redirectURL}/?access_token=${this.get(
          'session.token-api3'
        )}`;
        window.open(url, '_self');
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    if (EndPointsConfig.getLanguageSettingdropMenu() !== undefined) {
      this.set('showDropMenu', EndPointsConfig.getLanguageSettingdropMenu());
    }
    if (EndPointsConfig.getLanguageSettingdefaultLang() !== undefined) {
      this.set('i18n.locale', EndPointsConfig.getLanguageSettingdefaultLang());
      if (EndPointsConfig.getLanguageSettingdefaultLang() === 'ar') {
        const rootElement = Ember.$(Env.rootElement);
        rootElement.addClass('changeDir');
        rootElement.removeClass('changeDirDefault');
      } else {
        const rootElement = Ember.$(Env.rootElement);
        rootElement.removeClass('changeDir');
        rootElement.addClass('changeDirDefault');
      }
    }
    $('.search-input').on(
      'keyup',
      function(e) {
        e.stopPropagation();
        if (e.which === KEY_CODES.ENTER) {
          this.set('isTyping', false);
        } else {
          this.set('isTyping', true);
        }
      }.bind(this)
    );
  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function() {
    this.set('term', null);
    this.set('searchErrorMessage', null);
    this.set('isTyping', null);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Validate if the property term has the correct number of characters
   * @property
   */
  isIncorrectTermSize: Ember.computed('tempTerm', function() {
    var term = $.trim(this.get('tempTerm'));
    return !term || term.length < 3;
  }),

  /**
   * @property {?string} action to send up when a user logs out
   */
  onLogout: null,

  /**
   * @property {?string} action to send up when searching for a term
   */
  onSearch: null,

  /**
   * Search term
   * @property {string}
   */
  term: null,

  /**
   * isTyping
   * @property {Boolean}
   */
  isTyping: null,

  isInvalidSearchTerm: false,

  tempTerm: Ember.computed.oneWay('term'),

  /**
   * @property {Array} list of classes related to current user
   */
  classes: null,

  /**
   * @property {Array} list of active classes related to current user
   */
  activeClasses: Ember.computed('classes', function() {
    var classes = this.get('classes');
    return classes
      ? classes.filter(function(theClass) {
        return !theClass.get('isArchived');
      })
      : null;
  }),

  // -------------------------------------------------------------------------
  // Observers

  /**
   * @param {Computed } searchErrorMessage - computed property that defines if show searchErrorMessage
   */
  searchErrorMessage: Ember.computed(
    'isIncorrectTermSize',
    'isTyping',
    'tempTerm',
    function() {
      const isIncorrectTermSize = this.get('isIncorrectTermSize');
      const term = this.get('tempTerm');
      const isTyping = this.get('isTyping');
      return term !== '' && isIncorrectTermSize && isTyping === false;
    }
  ),

  /**
   * @param {Computed } searchInputDirty - computed property that defines whether the term is null or not.
   */
  searchInputDirty: Ember.computed.notEmpty('tempTerm'),

  /**
   * Marketing site url
   * @property {string}
   */
  marketingSiteUrl: Ember.computed(function() {
    return Env.marketingSiteUrl;
  }),

  /**
   * Support site url
   * @property {string}
   */
  supportSiteUrl: Ember.computed(function() {
    return Env.supportSiteUrl;
  })

  // -------------------------------------------------------------------------
});
