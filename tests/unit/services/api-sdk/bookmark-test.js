import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/bookmark', 'Unit | Service | api-sdk/bookmark', {

});

test('createBookmark', function(assert) {
  const service = this.subject();
  let bookmarkModel = Ember.Object.create();

  assert.expect(2);

  // There is not a Adapter stub in this case
  // Pretender was included because it is needed to simulate the response Headers including the Location value
  this.pretender.map(function() {
    this.post('/api/nucleus/v2/bookmarks', function() {
      return [201, {'Content-Type': 'text/plain', 'Location': 'bookmark-id'}, ''];
    }, false);
  });

  service.set('bookmarkSerializer', Ember.Object.create({
    serializeCreateBookmark: function(bookmarkObject) {
      assert.deepEqual(bookmarkObject, bookmarkModel, 'Wrong bookmark object');
      return {};
    }
  }));

  var done = assert.async();
  service.createBookmark(bookmarkModel)
    .then(function() {
      assert.equal(bookmarkModel.get('id'), 'bookmark-id', 'Wrong bookmark id');
      done();
    });
});

test('fetchBookmarks', function(assert) {
  const service = this.subject();

  assert.expect(3);

  service.set('bookmarkAdapter', Ember.Object.create({
    fetchBookmarks: function(offset = 0, limit) {
      assert.deepEqual(offset, 0, 'Wrong default offset');
      assert.deepEqual(limit, 20, 'Wrong default limit');
      return Ember.RSVP.resolve([]);
    }
  }));

  service.set('bookmarkSerializer', Ember.Object.create({
    normalizeFetchBookmarks: function(bookmarksPayload) {
      assert.deepEqual(bookmarksPayload, [], 'Wrong bookmarks payload');
      return [];
    }
  }));

  var done = assert.async();
  service.fetchBookmarks()
    .then(function() {
      done();
    });
});