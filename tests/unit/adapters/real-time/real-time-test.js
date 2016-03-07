import { moduleFor, test } from 'ember-qunit';
import Pretender from 'pretender';

moduleFor('adapter:real-time/real-time', 'Unit | Adapter | real-time/real-time', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
  beforeEach: function() {
    this.pretender = new Pretender();
  },
  afterEach: function() {
    this.pretender.shutdown();
  }
});

test('postData', function(assert) {
  const adapter = this.subject();
  const data = {
    query: {
      classId: 'the-class-id',
      collectionId: 'the-collection-id',
      userId: 'the-user-id'
    },
    body: {}
  };
  const routes = function() {
    this.post('/nucleus/realtime/class/the-class-id/collection/the-collection-id/user/the-user-id/event', function() {
      return [200, {'Content-Type': 'text/plain'}, ""];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.postData(data)
    .then(function(response) {
      assert.equal("", response, 'Wrong response');
    });
});

test('urlForGetEvents', function (assert) {
  const adapter = this.subject();
  const query = {
    classId: 'the-class-id',
    collectionId: 'the-collection-id'
  };
  const url = adapter.urlForGetEvents(query);

  assert.equal(url, '/nucleus/realtime/class/the-class-id/collection/the-collection-id/events', 'Wrong url');
});

test('urlForPostAttempt', function (assert) {
  const adapter = this.subject();
  const query = {
    classId: 'the-class-id',
    collectionId: 'the-collection-id',
    userId: 'the-user-id'
  };
  const url = adapter.urlForPostAttempt(query);

  assert.equal(url, '/nucleus/realtime/class/the-class-id/collection/the-collection-id/user/the-user-id/complete', 'Wrong url');
});

test('urlForDeleteAttempt', function (assert) {
  const adapter = this.subject();
  const query = {
    classId: 'the-class-id',
    collectionId: 'the-collection-id',
    userId: 'the-user-id'
  };
  const url = adapter.urlForDeleteAttempt(query);

  assert.equal(url, '/nucleus/realtime/class/the-class-id/collection/the-collection-id/user/the-user-id/reset', 'Wrong url');
});

test('urlForOnAir', function (assert) {
  const adapter = this.subject();
  const query = {
    classId: 'the-class-id',
    collectionId: 'the-collection-id'
  };
  const url = adapter.urlForOnAir(query);

  assert.equal(url, '/nucleus/realtime/class/the-class-id/collection/the-collection-id/onair', 'Wrong url');
});
