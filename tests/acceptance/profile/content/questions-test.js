import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile content resources', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'resources-content-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/profile/pochita/content/questions');

  andThen(function() {
    assert.equal(currentURL(), '/profile/pochita/content/questions');

    const $contentCourseContainer = find(".controller.content-questions");
    T.exists(assert, $contentCourseContainer, "Missing content questions container");

    const cards = $contentCourseContainer.find(".questions.card");
    assert.equal(cards.length, 5, "Missing cards");

  });
});
