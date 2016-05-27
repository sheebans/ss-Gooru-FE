import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  username: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter a username.'
      }),
      validator('length', {
        min: 4,
        max: 20,
        message: 'Username must be between 4 and 20 characters.'
      })
    ]
  },
  studentId:[
    validator('format', {
      regex: /^\w+$/,
      message: '{{description}}',
      descriptionKey: 'common.errors.add-student-id'
    })
  ]
});
