//import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/course-location', 'Unit | Service | api-sdk/course-location', {
  // This will enabled when the code is complete
  //needs: ['serializer:course/location', 'model:course/location', 'adapter:course/location']
});

// TODO: Fix these tests to work with async requests

//test('findOneByUser', function (assert) {
//  const service = this.subject();
//  const courseLocation = service.findOneByUser('id-1');
//  assert.equal(courseLocation.get('unit'), 'unit-1', 'Wrong unit');
//  assert.equal(courseLocation.get('lesson'), 'lesson-1', 'Wrong lesson');
//  assert.equal(courseLocation.get('collection'), 'collection-1', 'Wrong collection');
//  assert.equal(courseLocation.get('locationUsers.length'), 1, 'Missing users');
//  const locationUser = courseLocation.get('locationUsers.firstObject');
//  assert.equal(locationUser.get('isActive'), true, 'Wrong active status');
//  assert.equal(locationUser.get('user.id'), 'id-1', 'Wrong user id');
//  assert.equal(locationUser.get('user.firstName'), 'firstname-1', 'Wrong user firstName');
//  assert.equal(locationUser.get('user.lastName'), 'lastname-1', 'Wrong user lastName');
//  assert.equal(locationUser.get('user.email'), 'user_1@test.com', 'Wrong user email');
//  assert.equal(locationUser.get('user.username'), 'username-1', 'Wrong user username');
//});
//
//test('findByCourse', function (assert) {
//  const service = this.subject();
//  const courseLocations = service.findByCourse('course-with-45-users');
//  assert.equal(courseLocations.get('length'), 3, 'Missing course locations');
//  const courseLocation = courseLocations.get('firstObject');
//  assert.equal(courseLocation.get('unit'), 'unit-1', 'Wrong unit');
//  assert.equal(courseLocation.get('locationUsers.length'), 45, 'Missing users');
//  const locationUser = courseLocation.get('locationUsers.firstObject');
//  assert.equal(locationUser.get('isActive'), true, 'Wrong active status');
//  assert.equal(locationUser.get('user.id'), 'id-1', 'Wrong user id');
//  assert.equal(locationUser.get('user.firstName'), 'firstname-1', 'Wrong user firstName');
//  assert.equal(locationUser.get('user.lastName'), 'lastname-1', 'Wrong user lastName');
//  assert.equal(locationUser.get('user.email'), 'user_1@test.com', 'Wrong user email');
//  assert.equal(locationUser.get('user.username'), 'username-1', 'Wrong user username');
//});
//
//test('findByCourseAndUnit', function (assert) {
//  const service = this.subject();
//  const courseLocations = service.findByCourseAndUnit('course-with-30-users', 'unit-1');
//  assert.equal(courseLocations.get('length'), 3, 'Missing course locations');
//  const courseLocation = courseLocations.get('firstObject');
//  assert.equal(courseLocation.get('unit'), 'unit-1', 'Wrong unit');
//  assert.equal(courseLocation.get('lesson'), 'lesson-1', 'Wrong lesson');
//  assert.equal(courseLocation.get('locationUsers.length'), 30, 'Missing users');
//  const locationUser = courseLocation.get('locationUsers.firstObject');
//  assert.equal(locationUser.get('isActive'), true, 'Wrong active status');
//  assert.equal(locationUser.get('user.id'), 'id-1', 'Wrong user id');
//  assert.equal(locationUser.get('user.firstName'), 'firstname-1', 'Wrong user firstName');
//  assert.equal(locationUser.get('user.lastName'), 'lastname-1', 'Wrong user lastName');
//  assert.equal(locationUser.get('user.email'), 'user_1@test.com', 'Wrong user email');
//  assert.equal(locationUser.get('user.username'), 'username-1', 'Wrong user username');
//});
//
//test('findByCourseAndUnitAndLesson', function (assert) {
//  const service = this.subject();
//  const courseLocations = service.findByCourseAndUnitAndLesson('course-with-3-users', 'unit-1', 'lesson-1');
//  assert.equal(courseLocations.get('length'), 3, 'Missing course locations');
//  const courseLocation = courseLocations.get('firstObject');
//  assert.equal(courseLocation.get('unit'), 'unit-1', 'Wrong unit');
//  assert.equal(courseLocation.get('lesson'), 'lesson-1', 'Wrong lesson');
//  assert.equal(courseLocation.get('collection'), 'collection-1', 'Wrong collection');
//  assert.equal(courseLocation.get('locationUsers.length'), 3, 'Missing users');
//  const locationUser = courseLocation.get('locationUsers.firstObject');
//  assert.equal(locationUser.get('isActive'), true, 'Wrong active status');
//  assert.equal(locationUser.get('user.id'), 'id-1', 'Wrong user id');
//  assert.equal(locationUser.get('user.firstName'), 'firstname-1', 'Wrong user firstName');
//  assert.equal(locationUser.get('user.lastName'), 'lastname-1', 'Wrong user lastName');
//  assert.equal(locationUser.get('user.email'), 'user_1@test.com', 'Wrong user email');
//  assert.equal(locationUser.get('user.username'), 'username-1', 'Wrong user username');
//});
