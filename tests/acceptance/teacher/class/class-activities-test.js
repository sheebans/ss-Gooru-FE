import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | teacher/class/class-activities', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'teacher-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function (assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-activities');
  andThen(function() {

    assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher/class-activities');

    const $container = find(".teacher.class .controller.teacher.class.class-activities");
    assert.ok($container.length, 'Missing class activities tab container');

    T.exists(assert, $container.find(".today"), "Missing today title");
    T.exists(assert, $container.find(".collections"), "Missing activities collections");
  });
});
