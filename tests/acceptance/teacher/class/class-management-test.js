import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';
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

    const $studentsPanel = $container.find('.students-panel');

    assert.ok(
      $studentsPanel.find('.table').length,
      'Missing student list table'
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
        assert.equal(
          T.text($classInformation.find('.class-name .edit-text .class-title')),
          'Pochita As Teacher - With Course'
        );
      });
    });
  });
});

/*test('If a diferent name is saved it is updated', function(assert) {
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
    var $editNameIcon = $classInformation.find(
      '.class-name .edit-text .edit-icon'
    );

    click($editNameIcon);

    return wait().then(function() {
      const $titleInput = $classInformation.find(
        '.class-name .edit-text .gru-input.title input'
      );
      $titleInput.val('Teacher Class');
      $titleInput.blur();
      return wait().then(function() {
        assert.equal(
          T.text($classInformation.find('.class-name .edit-text .class-title')),
          'Teacher Class'
        );
      });
    });
  });
}); */

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

test('Delete Student', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');
  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );
    let $container = find(
      '.teacher.class .controller.teacher.class.class-management'
    );
    let $studentsPanel = $container.find('.students-panel');
    let $delete = $studentsPanel.find(
      'table tbody tr:nth-child(1) .student-actions .delete-btn'
    );
    click($delete);
    andThen(function() {
      let $deleteModal = find('.gru-remove-student');
      var $check1 = $deleteModal.find('ul li:eq(0) input');
      click($check1);
      andThen(function() {
        var $check2 = $deleteModal.find('ul li:eq(1) input');
        click($check2);
        andThen(function() {
          var $check3 = $deleteModal.find('ul li:eq(2) input');
          click($check3);
          andThen(function() {
            var $input = $deleteModal.find('.delete-input');
            $input.val('delete');
            $input.blur();
            keyEvent($input, 'keyup', KEY_CODES.ENTER);
            andThen(function() {
              var $deleteButton = $deleteModal.find('button.delete');
              click($deleteButton);
              andThen(function() {
                assert.equal(
                  $studentsPanel.find('tr').length,
                  7,
                  'The students panel must have 7 students'
                );
              });
            });
          });
        });
      });
    });
  });
});

test('Sort Student by First Name', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');
  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );
    let $container = find(
      '.teacher.class .controller.teacher.class.class-management'
    );
    let $studentsPanel = $container.find('.students-panel');
    let $sortByFirstName = $studentsPanel.find(
      '.table-header .sortable.first-name'
    );
    click($sortByFirstName);
    andThen(function() {
      assert.equal(
        $studentsPanel.find('tr:first-child td.first-name').text(),
        'Yalu',
        'Incorrect first member'
      );
      assert.equal(
        $studentsPanel.find('tr:last-child td.first-name').text(),
        'Ashish',
        'Incorrect last member'
      );
      click($sortByFirstName);
      andThen(function() {
        assert.equal(
          $studentsPanel.find('tr:first-child td.first-name').text(),
          'Ashish',
          'Incorrect first member'
        );
        assert.equal(
          $studentsPanel.find('tr:last-child td.first-name').text(),
          'Yalu',
          'Incorrect last member'
        );
      });
    });
  });
});

test('Sort Student by Last Name', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');
  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );
    let $container = find(
      '.teacher.class .controller.teacher.class.class-management'
    );
    let $studentsPanel = $container.find('.students-panel');
    let $sortByLastName = $studentsPanel.find(
      '.table-header .sortable.last-name'
    );
    click($sortByLastName);
    andThen(function() {
      assert.equal(
        $studentsPanel.find('tr:first-child td.last-name').text(),
        'Ashish',
        'Incorrect first member'
      );
      assert.equal(
        $studentsPanel.find('tr:last-child td.last-name').text(),
        'Ye',
        'Incorrect last member'
      );
      click($sortByLastName);
      andThen(function() {
        assert.equal(
          $studentsPanel.find('tr:first-child td.last-name').text(),
          'Ye',
          'Incorrect first member'
        );
        assert.equal(
          $studentsPanel.find('tr:last-child td.last-name').text(),
          'Ashish',
          'Incorrect last member'
        );
      });
    });
  });
});

test('Sort Student by Student ID', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');
  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );
    let $container = find(
      '.teacher.class .controller.teacher.class.class-management'
    );
    let $studentsPanel = $container.find('.students-panel');
    let $sortByStudentId = $studentsPanel.find(
      '.table-header .sortable.student-id'
    );
    click($sortByStudentId);
    andThen(function() {
      assert.equal(
        $studentsPanel.find('tr:first-child td.student-id').text(),
        '',
        'Incorrect first member'
      );
      assert.equal(
        $studentsPanel.find('tr:last-child td.student-id').text(),
        'GC88888888888888888888888',
        'Incorrect last member'
      );
      click($sortByStudentId);
      andThen(function() {
        assert.equal(
          $studentsPanel.find('tr:first-child td.student-id').text(),
          'GC88888888888888888888888',
          'Incorrect first member'
        );
        assert.equal(
          $studentsPanel.find('tr:last-child td.student-id').text(),
          '',
          'Incorrect last member'
        );
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
