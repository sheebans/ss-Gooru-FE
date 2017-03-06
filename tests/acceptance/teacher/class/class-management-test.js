import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | teacher/class/class-management', {
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
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');
  andThen(function() {

    assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher/class-management');

    const $container = find(".teacher.class .controller.class-management");
    assert.ok($container.length, 'Missing class management tab container');

    const $tabs = find(".panel", $container);
    assert.equal($tabs.length, 3, 'The class management must have 3 tabs');
  });
});
