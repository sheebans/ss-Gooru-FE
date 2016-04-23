import Ember from 'ember';
import CollectionBase from 'gooru-web/models/content/collection-base';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.assessment-title-presence'
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


// Properties specific to assessments should be placed here!
const assessmentProperties = { };

const mergedProperties = $.extend({}, CollectionBase, assessmentProperties);

/**
 * Assessment model
 * typedef {Object} Assessment
 */
export default Ember.Object.extend(Validations, mergedProperties);
