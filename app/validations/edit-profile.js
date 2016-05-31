import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  studentId:[
    validator('format', {
      regex: /^\w+$/,
      message: '{{description}}',
      descriptionKey: 'common.errors.add-student-id'
    })
  ]
});
