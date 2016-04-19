import Ember from 'ember';
import CollectionBase from 'gooru-web/models/content/collection-base';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message:'Please enter the collection title.'
      })
    ]
  }
});

/**
 * Collection model
 * typedef {Object} Collection
 */
export default Ember.Object.extend(Validations, CollectionBase);
