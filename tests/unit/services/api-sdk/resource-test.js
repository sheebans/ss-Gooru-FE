import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/resource', 'Unit | Service | api-sdk/resource', {

});

test('createResource', function(assert) {
  const service = this.subject();
  let resourceModel = Ember.Object.create();

  assert.expect(2);

  // There is not a Adapter stub in this case
  // Pretender was included because it is needed to simulate the response Headers including the Location value
  this.pretender.map(function() {
    this.post('/api/nucleus/v1/resources', function() {
      return [201, {'Content-Type': 'text/plain', 'Location': 'resource-id'}, ''];
    }, false);
  });

  service.set('resourceSerializer', Ember.Object.create({
    serializeCreateResource: function(resourceObject) {
      assert.deepEqual(resourceObject, resourceModel, 'Wrong resource object');
      return {};
    }
  }));

  var done = assert.async();
  service.createResource(resourceModel)
    .then(function() {
      assert.equal(resourceModel.get('id'), 'resource-id', 'Wrong resource id');
      done();
    });
});
