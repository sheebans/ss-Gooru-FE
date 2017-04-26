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
  visit('/study-player/class/class-for-pochita-as-teacher/course/course-123?unitId=first-unit-id&lessonId=first-lesson-id&collectionId=first-assessment-id');

  andThen(function () {
    assert.equal(currentURL(), '/study-player/class/class-for-pochita-as-teacher/course/course-123?collectionId=first-assessment-id&lessonId=first-lesson-id&resourceId=image-resource-id&type=assessment&unitId=first-unit-id');

    const $playerHeader = find('.gru-study-header');
    T.exists(assert, $playerHeader, 'Missing study player header');

    const $playerContainer = find('.player-container .qz-player');
    T.exists(assert, $playerContainer, 'Missing quizzes player component');
  });
});

test('Redirect to Course Map', function (assert) {
  visit('/study-player/class/class-for-pochita-as-student/course/course-123?unitId=first-unit-id&lessonId=first-lesson-id&collectionId=first-assessment-id');

  andThen(function () {
    assert.equal(currentURL(), '/study-player/class/class-for-pochita-as-student/course/course-123?collectionId=first-assessment-id&lessonId=first-lesson-id&resourceId=image-resource-id&type=assessment&unitId=first-unit-id');

    const $playerHeader = find('.gru-study-header');
    T.exists(assert, $playerHeader, 'Missing study player header');

    const $courseMapButton = $playerHeader.find('.actions .course-map');
    click($courseMapButton);
    andThen(function () {
      assert.equal(currentURL(), '/student/class/class-for-pochita-as-student/course-map?location=first-unit-id%2Bfirst-lesson-id%2Bfirst-assessment-id&refresh=true');
    });
  });
});

test('Take A Tour', function(assert){
  assert.expect(2);
  visit('/study-player/class/class-for-pochita-as-student/course/course-123?unitId=first-unit-id&lessonId=first-lesson-id&collectionId=first-assessment-id');
  andThen(function() {
    let $tooltip;
    click(".app-container .gru-take-tour button.start-tour");
    andThen(function() {
      $tooltip = $("div.introjs-tooltip");

      T.exists(assert, $tooltip, "First step of the tour should display a tooltip");
      assert.equal(T.text($tooltip.find('.tour-header h2')), 'Welcome!', 'First step title should be "Welcome!"');
    });
  });
});
