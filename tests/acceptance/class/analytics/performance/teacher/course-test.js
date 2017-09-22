import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | class/analytics/performance/teacher/course', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-analytics-performance-teacher-course-token',
      user: {
        /* using a pochita, @see classes/class-for-pochita-as-teacher-200-response.js */
        gooruUId: 'id-for-pochita'
      }
    });
  }
});
test('Test collections/assessments filter button selected', function(assert) {
  visit(
    '/class/class-for-pochita-as-teacher/analytics/performance/teacher/course'
  );

  andThen(function() {
    assert.equal(
      currentURL(),
      '/class/class-for-pochita-as-teacher/analytics/performance/teacher/course'
    );

    const $actionsBar = find('.controller.class .gru-actions-bar');
    const $assessmentButton = $actionsBar.find('button.assessment');
    const $collectionButton = $actionsBar.find('button.collection');
    assert.ok(
      $assessmentButton.hasClass('selected'),
      'assessment button should be selected by default'
    );

    click($collectionButton); //click on collections filter button

    andThen(function() {
      assert.ok(
        $collectionButton.hasClass('selected'),
        'collection button should be selected'
      );
      assert.ok(
        !$assessmentButton.hasClass('selected'),
        'assessment button should not be selected'
      );
      assert.equal(
        currentURL(),
        '/class/class-for-pochita-as-teacher/analytics/performance/teacher/course?filterBy=collection'
      );

      click($assessmentButton); //click on assessments filter button
      andThen(function() {
        assert.ok(
          !$collectionButton.hasClass('selected'),
          'collection button should not be selected'
        );
        assert.ok(
          $assessmentButton.hasClass('selected'),
          'assessment button should be selected'
        );

        assert.equal(
          currentURL(),
          '/class/class-for-pochita-as-teacher/analytics/performance/teacher/course'
        );
      });
    });
  });
});
