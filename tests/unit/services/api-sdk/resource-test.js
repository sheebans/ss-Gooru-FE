import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';
import ResourceModel from 'gooru-web/models/content/resource';

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

test('readResource', function(assert) {
  const service = this.subject();
  assert.expect(2);

  service.set('resourceAdapter', Ember.Object.create({
    readResource: function(resourceId) {
      assert.equal(1, resourceId, "readResource() function was called" );
      return Ember.RSVP.resolve({ id: resourceId });
    }
  }));

  service.set('resourceSerializer', Ember.Object.create({
    normalizeReadResource: function(resourceData) {
      assert.deepEqual({ id: 1 }, resourceData, 'Wrong resource data');
      return {};
    }
  }));

  var done = assert.async();
  service.readResource(1).then(function() { done(); });
});

test('updateResource', function(assert) {
  const service = this.subject();
  const expectedResourceId = 'resource-id';
  const expectedResourceModel = ResourceModel.create({ title: 'Resource title' });

  assert.expect(2);

  service.set('resourceAdapter', Ember.Object.create({
    updateResource: function(resourceId) {
      assert.equal(resourceId, expectedResourceId, "Wrong resource id" );
      return Ember.RSVP.resolve();
    }
  }));

  service.set('resourceSerializer', Ember.Object.create({
    serializeUpdateResource: function(resourceObject) {
      assert.deepEqual(resourceObject, expectedResourceModel, 'Wrong resource object');
      return {};
    }
  }));

  var done = assert.async();
  service.updateResource(expectedResourceId, expectedResourceModel).then(function() { done(); });
});
