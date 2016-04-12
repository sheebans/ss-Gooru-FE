import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  //TO DO We need use i18n for error messages
  url: {
    validators: [
      validator('presence', {
        presence: true,
        message:'Please enter a valid URL.'
      }),
      validator('format', {
        type: 'url',
        message: 'Invalid URL.'
      }),
      validator('host',{
        message:'Resources can not be Gooru\'s URLs.',
        location: window.location.host
      })
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
  url: null,

  /**
   * @property {Number} id
   */
  id: 0,

  /**
   * @property {Boolean} isEditing
   */
  isEditing: false,

  /**
   * @property {string}
   */
  format: null,

  /**
   * @property {string}
   */
  title: null

});
