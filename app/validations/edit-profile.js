import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  username: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter a username.'
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
