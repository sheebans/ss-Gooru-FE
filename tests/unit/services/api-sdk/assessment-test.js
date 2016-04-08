import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/assessment', 'Unit | Service | api-sdk/assessment', {

});

test('createAssessment', function(assert) {
  const service = this.subject();
  let assessmentModel = Ember.Object.create();

  assert.expect(2);

  // There is not a Adapter stub in this case
  // Pretender was included because it is needed to simulate the response Headers including the Location value
  this.pretender.map(function() {
    this.post('/api/nucleus/v1/assessments', function() {
      return [201, {'Content-Type': 'text/plain', 'Location': 'assessment-id'}, ''];
    }, false);
  });

  service.set('assessmentSerializer', Ember.Object.create({
    serializeCreateAssessment: function(assessmentObject) {
      assert.deepEqual(assessmentObject, assessmentModel, 'Wrong assessment object');
      return {};
    }
  }));

  var done = assert.async();
  service.createAssessment(assessmentModel)
    .then(function() {
      assert.equal(assessmentModel.get('id'), 'assessment-id', 'Wrong assessment id');
      done();
    });
});
