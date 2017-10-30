import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | add from course map', {
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

test('Layout', function(assert) {
  visit('/add-from-course-map/class-for-pochita-as-teacher');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/add-from-course-map/class-for-pochita-as-teacher'
    );

    const $container = find('.content.add-from-course-map');
    T.exists(assert, $container, 'Missing add-from-course-map container');

    T.exists(
      assert,
      $container.find('.go-back-container .back-to'),
      'Missing back link'
    );

    T.exists(assert, $container.find('.panel.title'), 'Missing panel title');

    T.exists(
      assert,
      $container.find('.gru-accordion-course'),
      'Missing gru-accordion-course component'
    );
  });
});

test('Click on back link', function(assert) {
  visit('/add-from-course-map/class-for-pochita-as-teacher');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/add-from-course-map/class-for-pochita-as-teacher'
    );

    const $container = find('.content.add-from-course-map');

    click($container.find('.go-back-container .back-to'));
    andThen(function() {
      assert.equal(
        currentURL(),
        '/teacher/class/462bcc67-1717-4140-bdc0-672e7bf4cdb1/class-activities'
      );
    });
  });
});
