import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  url: {
    validators: [
      validator('presence', true),
      validator('format', {
        type: 'url',
        message: 'Please enter a valid url.'
      }),
      validator('no-whitespace',true),
      validator('host',true),
    ]
  }
});

/**
 * Resource model
 *
 * @typedef {Object} Content/Resource
 */
export default Ember.Object.extend(Validations,{

  /**
   * @property {String} url
   */
  url: '',

  /**
   * @property {Number} id
   */
  id: 0,

  /**
   * @property {Boolean} isEditing
   */
  isEditing: false,

});
