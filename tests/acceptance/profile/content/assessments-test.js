import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile content assessments', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'assessments-content-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/profile/pochita/content/assessments');

  andThen(function() {
    assert.equal(currentURL(), '/profile/pochita/content/assessments');

    const $contentCourseContainer = find(".controller.content-assessments");
    T.exists(assert, $contentCourseContainer, "Missing content assessments container");
  });
});
