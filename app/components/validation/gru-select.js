import Ember from 'ember';

/**
 * Select field component
 *
 * Component responsible to show a bootstrap selectpicker.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-select'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function(){
    this.set('showMessage', false);
    this.$('.selectpicker').selectpicker();
    this.$('.selectpicker').on('loaded.bs.select', function () {
       this.$('.selectpicker').on('change', function(e) {
        e.stopPropagation();
        var optionSelected = this.$('.selectpicker option:selected').val();
        this.set('optionSelected', optionSelected);
        this.sendAction("onOptionSelect", optionSelected);
      }.bind(this));
    }.bind(this));
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @param {Array} options - List of options displayed in the component
   */
  options: null,

  /**
   * @param {String} title - Placeholder of the select
   */
  title: null,

  /**
   * @param {Boolean} search - search option of the select
   */
  search: false,

  /**
   * @param {Boolean} showMessage
   */
  showMessage: false,

  /**
   * @param {String} errorMessage
   */
  errorMessage: false


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
