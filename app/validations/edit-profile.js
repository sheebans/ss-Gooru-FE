import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  username: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.add-username'
      }),
      validator('length', {
        min: 4,
        max: 10,
        message: '{{description}}',
        descriptionKey: 'common.errors.username-length'
      }),
      validator('format', {
        regex: /^\w+$/,
        message: '{{description}}',
        descriptionKey: 'common.errors.add-student-id'
      })
    ]
  },
  studentId:[
    validator('format', {
      allowBlank:true,
      regex: /^\w+$/,
      message: '{{description}}',
      descriptionKey: 'common.errors.add-student-id'
    })
  ]
});

