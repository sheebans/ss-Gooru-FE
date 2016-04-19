import { moduleFor, test } from 'ember-qunit';
import AssessmentModel from 'gooru-web/models/content/assessment';

moduleFor('serializer:content/assessment', 'Unit | Serializer | content/assessment');

test('serializeCreateAssessment', function(assert) {
  const serializer = this.subject();
  const assessmentObject = AssessmentModel.create({
    title: 'assessment-title',
    learningObjectives: 'any'
  });
  const expected = {
    title: 'assessment-title',
    learning_objective: 'any'
  };
  const response = serializer.serializeCreateAssessment(assessmentObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('serializeUpdateAssessment', function(assert) {
  const serializer = this.subject();
  const assessmentObject = AssessmentModel.create({
    title: 'assessment-title',
    learningObjectives: 'any'
  });
  const expected = {
    title: 'assessment-title',
    learning_objective: 'any'
  };
  const response = serializer.serializeUpdateAssessment(assessmentObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});
