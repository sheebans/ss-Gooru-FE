import Ember from 'ember';
const {
  computed,
  defineProperty
  } = Ember;


/**
 * Text field with validation
 *
 * Text field with support for ember-cp-validations.
 * It provides feedback based on certain validation criteria.
 *
 * @module
 * @augments ember/Component
 * @see ember-cp-validations
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-input'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success','valuePath'],

  /**
   * @type {?string} string of classes (separated by a space) specific to the component instance
   */
  classes: 'test',

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    inputValueChange: function() {
      this.set('value', this.get('rawInputValue'));
      console.log(this);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    var valuePath = this.get('valuePath');
    defineProperty(this, 'attributeValidation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    this.set('rawInputValue', this.get(`model.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

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

  showMessage: computed('attributeValidation.isDirty', 'isInvalid', 'didValidate', function() {
    return (this.get('attributeValidation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  })

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
