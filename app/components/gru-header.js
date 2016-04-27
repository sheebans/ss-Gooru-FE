import Ember from "ember";
import SessionMixin from '../mixins/session';
import ModalMixin from '../mixins/modal';
import { encodeTerm } from 'gooru-web/utils/encode-term';

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
      var term = $.trim(this.get('term'));
      var isIncorrectTermSize = this.get('isIncorrectTermSize');
      if (term) {
        if (!isIncorrectTermSize){
          this.sendAction('onSearch', encodeTerm(term));
        }
      }
    },

    inputValueChange: function() {
      this.set('isTyping', false);
    }
  },


  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function(){
    $('.search-input').on('keyup', function(ev) {
      ev.stopPropagation();
      var evt = ev || window.event;
      if(evt.keyCode===13){
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
  isIncorrectTermSize : Ember.computed.lt('term.length',3),

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


  // -------------------------------------------------------------------------
  // Observers

  /**
   * @param {Computed } searchErrorMessage - computed property that defines if show searchErrorMessage
   */
  searchErrorMessage: Ember.computed('isIncorrectTermSize', 'isTyping', 'term', function() {
    const isIncorrectTermSize = this.get('isIncorrectTermSize');
    const term = this.get('term');
    const isTyping = this.get('isTyping');

    return (term !=='' && isIncorrectTermSize && (isTyping===false));
  }),

  /**
   * @param {Computed } searchInputDirty - computed property that defines whether the term is null or not.
   */
  searchInputDirty: Ember.computed.notEmpty('term')

  // -------------------------------------------------------------------------
  // Methods
});
