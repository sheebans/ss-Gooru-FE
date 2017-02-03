import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'goals.create.error-add-title'
      }),
      validator('reserved-words')
    ]
  },

  reflection: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'goals.create.error-add-reflection'
      }),
      validator('reserved-words')
    ]
  }
});
