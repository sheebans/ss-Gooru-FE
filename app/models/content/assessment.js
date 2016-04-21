import Ember from 'ember';
import CollectionBase from 'gooru-web/models/content/collection-base';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message:'Please enter the assessment title.'
      })
    ]
  }
});

// Properties specific to assessments should be placed here!
const assessmentProperties = { };

const mergedProperties = $.extend({}, CollectionBase, assessmentProperties);

/**
 * Assessment model
 * typedef {Object} Assessment
 */
export default Ember.Object.extend(Validations, mergedProperties);
