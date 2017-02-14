import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | student class', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'student-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/student/class/class-for-pochita-as-student');

  andThen(function() {
    assert.equal(currentURL(), '/student/class/class-for-pochita-as-student');

    const $classContainer = find('.student.class');
    T.exists(assert, $classContainer, 'Missing class container');

    const $classHeader = $classContainer.find('.header');
    const $firstColumnHeader = $classContainer.find('.header .first-column');
    const $secondColumnHeader = $classContainer.find('.header .second-column');
    T.exists(assert, $classHeader, 'Missing class header');
    T.exists(assert, $firstColumnHeader, 'Missing first column header');
    T.exists(assert, $secondColumnHeader, 'Missing second column header');

    T.exists(assert, $firstColumnHeader.find('h1'), 'Missing class title');
    assert.equal(T.text($firstColumnHeader.find('h1')), 'Pochita As Student - With Course', 'Incorrect class title text');
    T.exists(assert, $firstColumnHeader.find('.code'), 'Missing class code');
    assert.equal(T.text($firstColumnHeader.find('.code')), 'I4BYYQZ', 'Incorrect class code text');
    const $headerBoxes = $firstColumnHeader.find('.boxes');
    assert.equal($headerBoxes.find('> .box').length, 3, 'Number of header boxes');
    T.exists(assert, $headerBoxes.find('> .box.completed'), 'Missing completed box');
    T.exists(assert, $headerBoxes.find('> .box.performance'), 'Missing performance box');
    T.exists(assert, $headerBoxes.find('> .box.performance .gru-bubble-chart'), 'Missing performance gru-bubble-chart component');
    T.exists(assert, $headerBoxes.find('> .box.performance .legend'), 'Missing performance legend');
    T.exists(assert, $headerBoxes.find('> .box.improvement'), 'Missing improvement box');

    T.exists(assert, $secondColumnHeader.find('.announcements'), 'Missing announcements panel');
    T.exists(assert, $secondColumnHeader.find('.announcements .panel-heading'), 'Missing announcements panel-heading');
    T.exists(assert, $secondColumnHeader.find('.announcements .panel-body'), 'Missing announcements panel-body');
    assert.equal(T.text($secondColumnHeader.find('.announcements .panel-body .greeting')), 'Class Greeting', 'Incorrect class greeting text');

    T.exists(assert, $classContainer.find('> .gru-class-navigation'), 'Missing class navigation component');
    T.exists(assert, $classContainer.find('> .content'), 'Missing class content');
  });
});
