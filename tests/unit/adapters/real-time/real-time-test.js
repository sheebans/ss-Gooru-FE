import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:real-time/real-time', 'Unit | Adapter | real-time/real-time', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('urlForPostEvent', function (assert) {
  const adapter = this.subject();
  const query = {
    classId: 'the-class-id',
    collectionId: 'the-collection-id',
    userId: 'the-user-id'
  };
  const url = adapter.urlForPostEvent(query);

  assert.equal(url, '/nucleus/realtime/class/the-class-id/collection/the-collection-id/user/the-user-id/event', 'Wrong url');
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
