import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import { KEY_CODES } from 'gooru-web/config/config';

moduleForAcceptance('Acceptance | teacher/class/class-management', {
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
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');
  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );

    const $container = find(
      '.teacher.class .controller.teacher.class.class-management'
    );
    assert.ok($container.length, 'Missing class management tab container');

    assert.ok(
      $container.find('.class-information').length,
      'Missing class information'
    );
    assert.ok(
      $container.find('.course-information').length,
      'Missing course information'
    );

    const $classInformation = $container.find('.class-information');

    assert.ok(
      $classInformation.find('.class-name span').length,
      'Missing class information title'
    );

    assert.ok(
      $classInformation.find('.class-name .edit-text span').length,
      'Missing class title to edit'
    );
    assert.ok(
      $classInformation.find('.class-name .edit-text i').length,
      'Missing class title edit icon'
    );

    const $courseInformation = $container.find('.course-information');

    assert.ok(
      $courseInformation.find('.assessment-min-score span').length,
      'Missing course information title'
    );

    assert.ok(
      $courseInformation.find('.assessment-min-score .edit-text span').length,
      'Missing assessment min score to edit'
    );
    assert.ok(
      $courseInformation.find('.assessment-min-score .edit-text i').length,
      'Missing assessment min score edit icon'
    );
  });
});

test('If a blank name is saved it is not updated', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );

    const $container = find(
      '.teacher.class .controller.teacher.class.class-management'
    );
    assert.ok($container.length, 'Missing class management tab container');

    const $classInformation = $container.find('.class-information');
    const $editNameIcon = $classInformation.find(
      '.class-name .edit-text .edit-icon'
    );

    click($editNameIcon);

    return wait().then(function() {
      const $titleInput = $classInformation.find(
        '.class-name .edit-text .gru-input.title input'
      );
      $titleInput.val('');
      $titleInput.blur();
      return wait().then(function() {
        assert.ok(
          $classInformation.find('.class-name .edit-text .class-title'),
          'Class Title should be present'
        );
      });
    });
  });
});

test('Remove class', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );

    const $container = find(
      '.teacher.class .controller.teacher.class.class-management'
    );
    const $courseInformation = $container.find('.course-information');

    const $removeButton = $courseInformation.find('.actions .delete-btn');
    click($removeButton);
    andThen(function() {
      var $deleteContentModal = find('.gru-modal .gru-delete-class');
      var $check1 = $deleteContentModal.find('ul li:eq(0) input');
      click($check1);
      andThen(function() {
        var $check2 = $deleteContentModal.find('ul li:eq(1) input');
        click($check2);
        andThen(function() {
          var $check3 = $deleteContentModal.find('ul li:eq(2) input');
          click($check3);
          andThen(function() {
            var $input = $deleteContentModal.find('.delete-input');
            $input.val('delete');
            $input.blur();
            keyEvent($input, 'keyup', KEY_CODES.ENTER);
            andThen(function() {
              var $deleteButton = $deleteContentModal.find('button.delete');
              click($deleteButton);

              andThen(function() {
                assert.equal(currentURL(), '/teacher-home');
              });
            });
          });
        });
      });
    });
  });
});

test('Archive Class', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );

    const $container = find(
      '.teacher.class .controller.teacher.class.class-management'
    );
    const $courseInformation = $container.find('.course-information');
    const $archiveButton = $courseInformation.find('.actions .archive-btn');
    click($archiveButton);
    andThen(function() {
      const $archiveModal = find('.gru-modal .gru-archive-class');
      let $check1 = $archiveModal.find('ul li:eq(0) input');
      click($check1);
      andThen(function() {
        let $check2 = $archiveModal.find('ul li:eq(1) input');
        click($check2);
        andThen(function() {
          let $check3 = $archiveModal.find('ul li:eq(2) input');
          click($check3);
          andThen(function() {
            let $archiveButton = $archiveModal.find('button.archive');
            click($archiveButton);
            andThen(function() {
              assert.equal(currentURL(), '/teacher-home');
            });
          });
        });
      });
    });
  });
});
