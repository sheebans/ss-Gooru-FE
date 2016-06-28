import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import T from 'gooru-web/tests/helpers/assert';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | integration', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'token-value'
    });
  }
});


test('teams route to info', function(assert) {
  visit('/integration/teams?token=invalid-token&classId=class-for-pochita-as-teacher&page=info');
  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/sign-in');
  });
});

/*

test('teams route to info on invalid classId', function(assert) {
  visit('/integration/teams?token=any-token&classId=invalid-class-id&page=info');
  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/info');
  });
});

test('teams route to incorrect page', function(assert) {
  visit('/integration/teams?token=any-token&classId=class-for-pochita-as-teacher&page=unexistant-page');
  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/info');
  });
});

test('teams route to info', function(assert) {
  visit('/integration/teams?token=any-token&classId=class-for-pochita-as-teacher&page=info');
  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/info');
  });
});

test('teams route to data analytics page in a teacher class', function(assert) {
  visit('/integration/teams?token=any-token&classId=class-for-pochita-as-teacher&page=data');
  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/analytics/performance/teacher');
  });
});

test('teams route to data analytics page in a student class', function(assert) {
  visit('/integration/teams?token=any-token&classId=class-for-pochita-as-student&page=data');

  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');
  });
});

test('teams route to overview/course-map', function(assert) {
  visit('/integration/teams?token=any&classId=class-for-pochita-as-teacher&page=course-map');
  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/overview');
  });
});
*/
