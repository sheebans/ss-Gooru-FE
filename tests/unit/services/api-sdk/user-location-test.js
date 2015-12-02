import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/user-location', 'Unit | Service | api-sdk/user-location', {
  // This will enabled when the code is complete
  //needs: ['serializer:user/user-location', 'model:user/user-location', 'adapter:user/user-location']
});

test('findOneByUser', function (assert) {
  const service = this.subject();
  const userLocation = service.findOneByUser('id-1');
  assert.equal(userLocation.get('unit'), 'unit-1', 'Wrong unit');
  assert.equal(userLocation.get('lesson'), 'lesson-1', 'Wrong lesson');
  assert.equal(userLocation.get('collection'), 'collection-1', 'Wrong collection');
  assert.equal(userLocation.get('users.length'), 1, 'Missing users');
  const user = userLocation.get('users.firstObject');
  assert.equal(user.get('id'), 'id-1', 'Missing user id');
  assert.equal(user.get('firstName'), 'firstname-1', 'Missing user firstName');
  assert.equal(user.get('lastName'), 'lastname-1', 'Missing user lastName');
  assert.equal(user.get('email'), 'user_1@test.com', 'Missing user email');
  assert.equal(user.get('username'), 'username-1', 'Missing user username');
});

test('findByCourse', function (assert) {
  const service = this.subject();
  const userLocations = service.findByCourse('course-1');
  assert.equal(userLocations.get('length'), 3, 'Missing user locations');
  const userLocation = userLocations.get('firstObject');
  assert.equal(userLocation.get('unit'), 'unit-1', 'Wrong unit');
  assert.equal(userLocation.get('users.length'), 2, 'Missing users');
  const user = userLocation.get('users.firstObject');
  assert.equal(user.get('id'), 'id-1', 'Missing user id');
  assert.equal(user.get('firstName'), 'firstname-1', 'Missing user firstName');
  assert.equal(user.get('lastName'), 'lastname-1', 'Missing user lastName');
  assert.equal(user.get('email'), 'user_1@test.com', 'Missing user email');
  assert.equal(user.get('username'), 'username-1', 'Missing user username');
});

test('findByCourseAndUnit', function (assert) {
  const service = this.subject();
  const userLocations = service.findByCourseAndUnit('course-1', 'unit-1');
  assert.equal(userLocations.get('length'), 3, 'Missing user locations');
  const userLocation = userLocations.get('firstObject');
  assert.equal(userLocation.get('unit'), 'unit-1', 'Wrong unit');
  assert.equal(userLocation.get('lesson'), 'lesson-1', 'Wrong lesson');
  assert.equal(userLocation.get('users.length'), 2, 'Missing users');
  const user = userLocation.get('users.firstObject');
  assert.equal(user.get('id'), 'id-1', 'Missing user id');
  assert.equal(user.get('firstName'), 'firstname-1', 'Missing user firstName');
  assert.equal(user.get('lastName'), 'lastname-1', 'Missing user lastName');
  assert.equal(user.get('email'), 'user_1@test.com', 'Missing user email');
  assert.equal(user.get('username'), 'username-1', 'Missing user username');
});

test('findByCourseAndUnitAndLesson', function (assert) {
  const service = this.subject();
  const userLocations = service.findByCourseAndUnitAndLesson('course-1', 'unit-1', 'lesson-1');
  assert.equal(userLocations.get('length'), 3, 'Missing user locations');
  const userLocation = userLocations.get('firstObject');
  assert.equal(userLocation.get('unit'), 'unit-1', 'Wrong unit');
  assert.equal(userLocation.get('lesson'), 'lesson-1', 'Wrong lesson');
  assert.equal(userLocation.get('collection'), 'collection-1', 'Wrong collection');
  assert.equal(userLocation.get('users.length'), 2, 'Missing users');
  const user = userLocation.get('users.firstObject');
  assert.equal(user.get('id'), 'id-1', 'Missing user id');
  assert.equal(user.get('firstName'), 'firstname-1', 'Missing user firstName');
  assert.equal(user.get('lastName'), 'lastname-1', 'Missing user lastName');
  assert.equal(user.get('email'), 'user_1@test.com', 'Missing user email');
  assert.equal(user.get('username'), 'username-1', 'Missing user username');
});
