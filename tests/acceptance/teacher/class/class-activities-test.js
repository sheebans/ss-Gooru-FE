import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | teacher/class/class-activities', {
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
  visit('/teacher/class/class-for-pochita-as-teacher/class-activities');
  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-activities'
    );

    const $container = find(
      '.teacher.class .controller.teacher.class.class-activities'
    );
    assert.ok($container.length, 'Missing class activities tab container');

    const $buttonsContainer = $container.find('.buttons-container');
    assert.ok($buttonsContainer.length, 'Missing buttons container');
    assert.ok(
      $buttonsContainer.find('.course-map').length,
      'Missing course-map button'
    );
    assert.ok(
      $buttonsContainer.find('.my-content').length,
      'Missing my-content button'
    );
    assert.ok(
      $container.find('.class-activity-accordion').length,
      'Missing class activity accordion'
    );

    T.exists(
      assert,
      $container.find('.collections'),
      'Missing activities collections'
    );
  });
});

test('Go to course-map from links panel', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-activities');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-activities'
    );
    const $courseMapLink = find('.buttons-container .course-map');

    click($courseMapLink);
    andThen(function() {
      assert.equal(
        currentURL(),
        '/add-from-course-map/462bcc67-1717-4140-bdc0-672e7bf4cdb1',
        'Wrong route'
      );
    });
  });
});

test('Go to my content from links panel', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-activities');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-activities'
    );
    const $myContentLink = find('.buttons-container .my-content');

    click($myContentLink);
    andThen(function() {
      assert.equal(
        currentURL(),
        '/id-for-pochita/content/courses',
        'Wrong route'
      );
    });
  });
});

test('Delete class activity', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-activities');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-activities'
    );

    const $container = find(
      '.teacher.class .controller.teacher.class.class-activities'
    );

    assert.equal(
      $container.find('.collections .gru-class-activity-panel').length,
      6,
      'Should have 6 class activities'
    );
    var $collection = $container.find(
      '.collections .gru-class-activity-panel:eq(0)'
    );
    click(
      $collection.find(
        '.panel-heading .info .actions-container button.remove-item'
      )
    ); //remove class activity
    andThen(function() {
      var $removeClassActivityModal = find(
        '.gru-modal .gru-remove-class-activity'
      );
      var $deleteButton = $removeClassActivityModal.find('button.delete');
      click($deleteButton);
      andThen(function() {
        assert.equal(
          $container.find('.collections .gru-class-activity-panel').length,
          4,
          'Should have 4 class activities'
        );
      });
    });
  });
});
