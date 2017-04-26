import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | resource-player', {
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

test('Layout', function (assert) {
  visit('/study-player/class/class-for-pochita-as-student/course/course-123/resource/image-resource-id?collectionUrl=collection-url');

  andThen(function () {
    assert.equal(currentURL(), '/study-player/class/class-for-pochita-as-student/course/course-123/resource/image-resource-id?collectionUrl=collection-url');

    const $playerHeader = find('.gru-study-header');
    T.exists(assert, $playerHeader, 'Missing study player header');

    const $resources = $playerHeader.find('.resources');
    T.notExists(assert, $resources.find('.count-resources'), 'Should not show resource count');
    T.exists(assert, $resources.find('.btn-back'), 'Missing back to collection button');

    const $suggestions = $playerHeader.find('.suggestions');
    T.notExists(assert, $suggestions.find('.suggested-resources'), 'Should not show suggested resources');
    T.exists(assert, $suggestions.find('.resource-title'), 'Missing resource title');

    const $playerContainer = find('.resource-player .qz-resource-viewer');
    T.exists(assert, $playerContainer, 'Missing quizzes resource player component');
  });
});
