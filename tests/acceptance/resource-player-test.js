import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | resource-player', {
  beforeEach: function() {
    window.localStorage.setItem(
      'id-for-pochita_next',
      JSON.stringify({
        context: {
          collection_id: 'first-assessment-id',
          class_id: 'class-for-pochita-as-student',
          course_id: 'course-123',
          unit_id: 'first-unit-id',
          lesson_id: 'first-lesson-id',
          current_item_id: 'first-assessment-id'
        },
        suggestions: []
      })
    );
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'player-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  },
  afterEach: function() {
    window.localStorage.clear();
  }
});

test('Layout', function(assert) {
  visit(
    '/study-player/class/class-for-pochita-as-student/course/course-123/resource/image-resource-id?collectionUrl=collection-url'
  );

  andThen(function() {
    assert.equal(
      currentURL(),
      '/study-player/class/class-for-pochita-as-student/course/course-123/resource/image-resource-id?collectionUrl=collection-url'
    );
  });
});
