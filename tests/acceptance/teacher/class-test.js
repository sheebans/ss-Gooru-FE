import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | teacher class', {
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
  visit('/teacher/class/class-for-pochita-as-teacher');

  andThen(function() {
    assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher');

    const $classContainer = find('.teacher.class');
    T.exists(assert, $classContainer, 'Missing class container');

    const $classHeader = $classContainer.find('.header');
    const $classCodeContainer = $classHeader.find('.code');
    const $announcements = $classHeader.find('.announcements');
    const $graphics = $classHeader.find('.graphics');
    T.exists(assert, $classHeader, 'Missing class header');
    T.exists(assert, $classCodeContainer, 'Missing class code container');
    T.exists(assert, $announcements, 'Missing announcements panel');
    T.exists(assert, $graphics, 'Missing graphics panel');

    T.exists(assert, $classHeader.find('.go-back-container .back-to'), 'Missing back link');

    T.exists(assert, $classHeader.find('h1'), 'Missing class title');
    assert.equal(T.text($classHeader.find('h1')), 'Pochita As Teacher - With Course', 'Incorrect class title text');

    assert.equal(T.text($classCodeContainer.find('.class-code')), 'I4BYYQZ', 'Incorrect class code text');
    T.exists(assert, $classCodeContainer.find('.gru-copy-value'), 'Missing copy value component');

    T.exists(assert, $announcements.find('.panel-heading'), 'Missing announcements panel-heading');
    T.exists(assert, $announcements.find('.panel-body'), 'Missing announcements panel-body');
    T.exists(assert, $announcements.find('.panel-body .edit button'), 'Missing edit button');
    assert.equal(T.text($announcements.find('.panel-body .greeting span')), 'Class Greeting', 'Incorrect class greeting text');

    T.exists(assert, $graphics.find('.panel-heading'), 'Missing graphics panel-heading');
    assert.equal($graphics.find('.panel-body .graphic').length, 3, 'Number of header graphics');
    T.exists(assert, $graphics.find('.panel-body .graphic.completed'), 'Missing completed graphic');
    T.exists(assert, $graphics.find('.panel-body .graphic.completed .gru-radial-chart'), 'Missing completed gru-radial-chart component');
    T.exists(assert, $graphics.find('.panel-body .graphic.completed .legend'), 'Missing completed legend');
    T.exists(assert, $graphics.find('.panel-body .graphic.performance'), 'Missing performance graphic');
    T.exists(assert, $graphics.find('.panel-body .graphic.performance .gru-bubble-chart'), 'Missing performance gru-bubble-chart component');
    T.exists(assert, $graphics.find('.panel-body .graphic.performance .legend'), 'Missing performance legend');
    T.exists(assert, $graphics.find('.panel-body .graphic.improvement'), 'Missing improvement graphic');

    T.exists(assert, $classContainer.find('> .gru-class-navigation'), 'Missing class navigation component');
    T.exists(assert, $classContainer.find('> .content'), 'Missing class content');
  });
});

test('Click on back link', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher');

  andThen(function() {
    assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher');

    const $classContainer = find('.teacher.class');
    const $classHeader = $classContainer.find('.header');

    click($classHeader.find(".go-back-container .back-to"));
    andThen(function() {
      assert.equal(currentURL(), '/teacher-home');
    });

  });
});
