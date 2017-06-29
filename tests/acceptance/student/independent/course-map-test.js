import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | student/independent/course-map', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-course-map-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout as a student', function (assert) {
  visit('/student/course/course-for-pochita-as-student/course-map');
  andThen(function() {

    assert.equal(currentURL(), '/student/course/course-for-pochita-as-student/course-map?location=');

    const $container = find('.student-independent-container .controller.course-map');
    assert.ok($container.length, 'Missing course map container');

    const $expandedUnits = find('.gru-accordion-unit.expanded', $container);
    assert.equal($expandedUnits.length, 0, 'Wrong number of unit accordions expanded');

    const $expandedLessons = find('.gru-accordion-lesson.expanded', $container);
    assert.equal($expandedLessons.length, 0, 'Wrong number of lesson accordions expanded');
  });
});
