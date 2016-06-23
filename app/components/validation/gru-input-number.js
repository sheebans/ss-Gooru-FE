import GruInput from 'gooru-web/components/validation/gru-input';

/**
 * Number field with validation (It only accepts integers)
 *
 * Text field with support for ember-cp-validations.
 * It provides feedback based on certain validation criteria.
 *
 * @module
 * @augments ember/Component
 * @see ember-cp-validations
 */
export default GruInput.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    inputValueChange: function() {
      this.set('rawInputValue', +this.get('rawInputValue'));
      this.set('value', this.get('rawInputValue'));
      this.set('isTyping', false);
      if (this.get("onFocusOut")){
        this.sendAction("onFocusOut");
      }
    },
    inputTyping: function() {
      this.set('isTyping', true);
      if (this.get("onTyping")){
        this.sendAction("onTyping");
      }
    }
  },

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-input-number','validation'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success','valuePath'],

  // -------------------------------------------------------------------------
  // Events

  didRender: function() {
    this._super(...arguments);
    const component = this;
    // only accept numbers and no bigger than 100
    component.$('input[type=number]').keypress(function(event){
      var key = window.event ? event.keyCode : event.which;
      var tempValue = +(this.value + String.fromCharCode(key));
      return event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 37 || event.keyCode === 39 ||
        (tempValue >= component.get('min') && tempValue <= component.get('max'));
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @param {Number} max - maximum number value
   */
  max: 100,

  /**
   * @param {Number} min - minimum number value
   */
  min: 0,

  /**
   * @param {Number} step - step between values when using the picker
   */
  step: 1,

});
