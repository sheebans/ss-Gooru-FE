import Ember from 'ember';

/**
 * Text field with validation
 *
 * Text field with support for ember-cp-validations.
 * It provides feedback based on certain validation criteria.
 *
 * @module
 * @augments ember/TextField
 * @see ember-cp-validations
 */
export default Ember.TextField.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-textfield'],

  classNameBindings: ['classes'],

  /**
   * @type {?string} string of classes (separated by a space) specific to the component instance
   */
  classes: null,

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  model: null,
  value: null,
  rawInputValue: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  attributeValidation: null,
  isTyping: false,

  didValidate: computed.oneWay('targetObject.didValidate'),

  showErrorClass: computed('isTyping', 'showMessage', 'hasContent', 'attributeValidation', function() {
    return this.get('attributeValidation') && !this.get('isTyping') && this.get('showMessage') && this.get('hasContent');
  }),

  hasContent: computed.notEmpty('rawInputValue'),

  isValid: computed.and('hasContent', 'attributeValidation.isValid'),

  isInvalid: computed.oneWay('attributeValidation.isInvalid'),

  inputValueChange: observer('rawInputValue', function() {
    this.set('isTyping', true);
    run.debounce(this, this.setValue, 500, false);
  }),

  showMessage: computed('attributeValidation.isDirty', 'isInvalid', 'didValidate', function() {
    return (this.get('attributeValidation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  }),

  setValue() {
    this.set('value', this.get('rawInputValue'));
    this.set('isTyping', false);
  },

  init() {
    this._super(...arguments);
    var valuePath = this.get('valuePath');
    defineProperty(this, 'attributeValidation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    this.set('rawInputValue', this.get(`model.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  }

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
