import Ember from 'ember';
import CollectionBase from 'gooru-web/models/content/collection-base';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.collection-title-presence'
      })
    ]
  },
  learningObjectives: [
    validator('length', {
      max: 500,
      message: '{{description}}',
      descriptionKey: 'common.errors.collection-learning-objectives-max-length'
    })
  ]
});

/**
 * Collection model
 * typedef {Object} Collection
 */
export default Ember.Object.extend(Validations, CollectionBase);
