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
      this.validate().then(function ({validations }) {
        if (validations.get('isValid')) {

        }
        this.set('didValidate', true);
      }.bind(this));
    }

  },


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  code:null

});
