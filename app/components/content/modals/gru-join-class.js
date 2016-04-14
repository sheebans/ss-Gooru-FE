import Ember from 'ember';
import {
  validator, buildValidations
}
from 'ember-cp-validations';

const Validations = buildValidations({
  code: validator('presence', {
    presence: true,
    message: '{{description}}',
    descriptionKey: 'common.errors.join-class-code'
  })
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
  onJoinClass: null

});
