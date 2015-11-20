import Ember from 'ember';
const {
  computed,
  observer,
  defineProperty,
  run
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

  classNames: ['gru-datepicker'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],

  /**
   * @type {?string} string of classes (separated by a space) specific to the component instance
   */
  classes: null,

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


  // -------------------------------------------------------------------------
  // Properties

  model: null,
  value: null,
  rawInputValue: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  attributeValidation: null,


  didValidate: computed.oneWay('targetObject.didValidate'),

  showErrorClass: computed('isTyping', 'showMessage', 'hasContent', 'attributeValidation', function() {
    return this.get('attributeValidation') && !this.get('isTyping') && this.get('showMessage') && this.get('hasContent');
  }),

  hasContent: computed.notEmpty('rawInputValue'),

  isValid: computed.and('hasContent', 'attributeValidation.isValid'),

  isInvalid: computed.oneWay('attributeValidation.isInvalid'),

  inputValueChange: observer('rawInputValue', function() {
    run.debounce(this, this.setValue, 1000, false);
  }),

  showMessage: computed('attributeValidation.isDirty', 'isInvalid', 'didValidate', function() {
    return (this.get('attributeValidation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  }),

  setValue() {
    this.set('value', this.get('rawInputValue'));
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
