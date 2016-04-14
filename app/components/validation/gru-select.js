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
  /**
   * Update user birth date
   * @param {String} dateValue - birth date as a string
   */
  actions:{
    setValue:function(value){
      this.set("model."+this.valuePath, value);
    }
  },

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
        Ember.run(function() {
          var optionSelected = this.$('.selectpicker option:selected').val();
          this.set('optionSelected', optionSelected);
        }.bind(this));
      }.bind(this));
    }.bind(this));
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @param {Object} model - Model that will be attached to the component
   */
  options: null,

  title: null,

  search: false,

  optionSelected: null

  /**
   * @param {Computed } showErrorClass - computed property that defines the
   */
  //showMessage: computed('isTyping', 'showMessage', 'hasContent', 'attributeValidation', function() {
  //  return this.get('attributeValidation') && !this.get('isTyping') && this.get('showMessage') && this.get('hasContent');
  //}),

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
