import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/class-activity', 'Unit | Service | api-sdk/class-activity', {
});

test('addContentToClass', function(assert) {
  const service = this.subject();

  assert.expect(5);

  service.set('classActivityAdapter', Ember.Object.create({
    addContentToClass: function(classId, contentId, contentType, context) {
      assert.equal(classId, 123, 'Wrong class id');
      assert.equal(contentId, 321, 'Wrong content id');
      assert.equal(contentType, 'assessment', 'Wrong content type');
      assert.equal(context, 'any context', 'Wrong context');
      return Ember.RSVP.resolve(true);
    }
  }));

  var done = assert.async();
  service.addContentToClass(123, 321, 'assessment', 'any context')
    .then(function(response) {
      assert.ok(response, 'fake-response', 'Wrong response');
      done();
    });
});
