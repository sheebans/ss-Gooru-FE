import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile content courses', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'course-content-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/profile/pochita/content/courses');

  andThen(function() {
    assert.equal(currentURL(), '/profile/pochita/content/courses');

    const $contentCourseContainer = find(".controller.profile-courses");
    T.exists(assert, $contentCourseContainer, "Missing content courses container");
    T.exists(assert, $contentCourseContainer.find(".course-content >div:first-child .card-info .course-title"), "Missing first course card");
    assert.equal(T.text($contentCourseContainer.find(".course-content >div:first-child .card-info .course-title")), "Jeff Course07", "Incorrect course card title text");
  });
});
