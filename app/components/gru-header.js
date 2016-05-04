import Ember from "ember";
import SessionMixin from '../mixins/session';
import ModalMixin from '../mixins/modal';
import { encodeTerm } from 'gooru-web/utils/encode-term';
import {KEY_CODES} from "gooru-web/config/config";

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


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-header', 'navbar-fixed-top'],

  tagName: 'header',

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    logout: function() {
      this.sendAction('onLogout');
    },

    searchTerm: function () {
      var term = this.get('tempTerm');
      var isIncorrectTermSize = this.get('isIncorrectTermSize');
      if (!isIncorrectTermSize){
        this.set('term', encodeTerm(term));
        this.sendAction('onSearch', this.get('term'));
      }
    },

    inputValueChange: function() {
      this.set('isTyping', false);
    }
  },


  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function(){
    $('.search-input').on('keyup', function(e) {
      e.stopPropagation();
      if(e.which===KEY_CODES.ENTER){
        this.set('isTyping', false);
      }
      else {
        this.set('isTyping', true);
      }
    }.bind(this));
  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
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
    return (!term || term.length <=3 );
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

  tempTerm:Ember.computed.oneWay('term'),


  // -------------------------------------------------------------------------
  // Observers

  /**
   * @param {Computed } searchErrorMessage - computed property that defines if show searchErrorMessage
   */
  searchErrorMessage: Ember.computed('isIncorrectTermSize', 'isTyping', 'tempTerm', function() {
    const isIncorrectTermSize = this.get('isIncorrectTermSize');
    const term = this.get('tempTerm');
    const isTyping = this.get('isTyping');
    return (term !=='' && isIncorrectTermSize && (isTyping===false));
  }),

  /**
   * @param {Computed } searchInputDirty - computed property that defines whether the term is null or not.
   */
  searchInputDirty: Ember.computed.notEmpty('tempTerm')

  // -------------------------------------------------------------------------
  // Methods
});
