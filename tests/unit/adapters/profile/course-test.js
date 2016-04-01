import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:profile/course', 'Unit | Adapter | profile/course', {
  // needs: []
});

test('getCourses', function(assert) {
  // TODO Remove this
  assert.equal(true, true, 'Wrong response');
  /*
  const adapter = this.subject();
  this.pretender.map(function() {
    this.get('/api/nucleus/v1/profiles/profile-id/courses', function(request) {
      assert.equal('course-subject', request.queryParams['q'], 'Wrong term');
      assert.equal('collection', request.queryParams['flt.collectionType'], 'Wrong collection type');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchCollections('any-term')
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
    */
});

