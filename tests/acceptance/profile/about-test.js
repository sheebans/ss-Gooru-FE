import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile about', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'about-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/id-for-pochita/about');

  andThen(function() {
    assert.equal(currentURL(), '/id-for-pochita/about');

    const $aboutContainer = find(".controller.about");
    const $firstName = $aboutContainer.find(".first-name");
    const $lastName = $aboutContainer.find(".last-name");
    const $username = $aboutContainer.find(".username");
    const $bio = $aboutContainer.find(".bio");
    const $role = $aboutContainer.find(".role");
    const $schoolDistrict = $aboutContainer.find(".district");
    const $state = $aboutContainer.find(".state");
    const $country = $aboutContainer.find(".country");

    T.exists(assert, $aboutContainer, "Missing about container");
    T.exists(assert, $firstName, "Missing user first name");
    assert.equal(T.text($firstName), 'Pochita', 'Wrong first name text');
    T.exists(assert,$lastName, "Missing user last name");
    assert.equal(T.text($lastName), 'Salas', 'Wrong last name text');
    T.exists(assert,$username, "Missing username");
    assert.equal(T.text($username), 'pochita', 'Wrong username text');
    T.exists(assert,$bio, "Missing user biography");
    assert.equal(T.text($bio), 'I am teacher Pochita', 'Wrong biography text');
    T.exists(assert,$role, "Missing user role");
    assert.equal(T.text($role), 'teacher', 'Wrong role text');
    T.exists(assert,$schoolDistrict, "Missing user school");
    assert.equal(T.text($schoolDistrict), 'school-district', 'Wrong school text');
    T.exists(assert,$state, "Missing user state");
    assert.equal(T.text($state), 'San Jose', 'Wrong state text');
    T.exists(assert,$country, "Missing user country");
    assert.equal(T.text($country), 'CR', 'Wrong country text');
    T.exists(assert, $aboutContainer.find(".student-id"), "Missing Student ID");
  });
});
