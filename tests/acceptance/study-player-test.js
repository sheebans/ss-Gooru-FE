import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | study-player', {
  beforeEach: function () {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'player-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout - default to collection since parameter is not sent', function (assert) {
  visit('/study-player/class/class-for-pochita-as-teacher/course/course-123/unit/first-unit-id/lesson/first-lesson-id/collection/first-assessment-id');

  andThen(function () {
    assert.equal(currentURL(), '/study-player/class/class-for-pochita-as-teacher/course/course-123/unit/first-unit-id/lesson/first-lesson-id/collection/first-assessment-id?resourceId=image-resource-id');

    const $playerHeader = find('.gru-study-header');
    T.exists(assert, $playerHeader, 'Missing study player header');

    const $playerContainer = find('.player-container .qz-player');
    T.exists(assert, $playerContainer, 'Missing quizzes player component');
  });
});

test('Redirect to Course Map', function (assert) {
  visit('/study-player/class/class-for-pochita-as-student/course/course-123/unit/first-unit-id/lesson/first-lesson-id/collection/first-assessment-id');

  andThen(function () {
    assert.equal(currentURL(), '/study-player/class/class-for-pochita-as-student/course/course-123/unit/first-unit-id/lesson/first-lesson-id/collection/first-assessment-id?resourceId=image-resource-id');

    const $playerHeader = find('.gru-study-header');
    T.exists(assert, $playerHeader, 'Missing study player header');

    const $courseMapButton = $playerHeader.find('.actions .course-map');
    click($courseMapButton);
    andThen(function () {
      assert.equal(currentURL(), '/student/class/class-for-pochita-as-student/course-map?location=first-unit-id%2Bfirst-lesson-id%2Bfirst-assessment-id&refresh=true');
    });
  });
});
