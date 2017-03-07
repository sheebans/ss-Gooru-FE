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

    assert.ok($container.find('.class-panel').length, 'Missing class panel');
    assert.ok($container.find('.course-panel').length, 'Missing course panel');
    assert.ok($container.find('.teachers-panel').length, 'Missing teacher panel');

    const $coursePanel = $container.find('.course-panel');
    assert.ok($coursePanel.find('.assessment-min-score h5').length, 'Missing assessment min score information');
    assert.ok($coursePanel.find('.assessment-min-score h5 .gru-icon').length, 'Missing assessment min score edit icon');
    assert.ok($coursePanel.find('.course-information .gru-course-card.small').length, 'Missing small course card');
  });
});
