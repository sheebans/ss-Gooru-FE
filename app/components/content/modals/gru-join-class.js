import Ember from 'ember';
import {
  validator, buildValidations
}
from 'ember-cp-validations';

const Validations = buildValidations({
  code: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.join-class-code'
      }),
      validator('dependent', {
        on: ['allowedCode'],
        message: '{{description}}',
        descriptionKey: 'content.classes.join.join-not-allowed'
      }),
      validator('dependent', {
        on: ['validCode'],
        message: '{{description}}',
        descriptionKey: 'content.classes.join.invalid-code'
      })
    ]
  },

  validCode: validator('presence', true),
  allowedCode: validator('presence', true)
});

export default Ember.Component.extend(Validations,{

  // -------------------------------------------------------------------------
  // Dependencies
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modal', 'gru-join-class'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    joinClass: function () {
      const component = this;
      component.set("errorMessage", null);
      component.validate().then(function ({validations }) {
        if (validations.get('isValid')) {
          component.sendAction("onJoinClass", component.get("code"));
        }
        component.set('didValidate', true);
      }.bind(component));
    }

  },


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {string}
   */
  code:null,

  /**
   * @property {string}
   */
  onJoinClass: null,

  /**
   * Indicates if the code is valid, false when the class is not found
   * @property {boolean}
   */
  validCode: true,

  /**
   * Indicates if the code is allowed, false if the user can't join that class
   * @property {boolean}
   */
  allowedCode: true

});
