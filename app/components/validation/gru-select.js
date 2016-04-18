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

  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
    this.set('options', null);
    this.set('title', null);
    this.set('search', false);
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @param {Object} model - Model that will be attached to the component
   */
  options: null,

  title: null,

  search: false

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
