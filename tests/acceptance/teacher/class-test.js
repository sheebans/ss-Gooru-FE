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
    T.exists(
      assert,
      $classContainer.find('> .gru-class-navbar'),
      'Missing class navigation component'
    );
    T.exists(
      assert,
      $classContainer.find('> .content'),
      'Missing class content'
    );

    const $classHeader = $classContainer.find('.header');
    T.exists(assert, $classHeader, 'Missing class header');
    T.exists(
      assert,
      $classHeader.find('.go-back-container .back-to'),
      'Missing back link'
    );
    T.exists(assert, $classHeader.find('h1'), 'Missing class title');
    assert.equal(
      T.text($classHeader.find('h1')),
      'Pochita As Teacher - With Course',
      'Incorrect class title text'
    );

  });
});

test('Click on back link', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher');
  andThen(function() {
    assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher');

    const $classContainer = find('.teacher.class');
    const $classHeader = $classContainer.find('.header');

    click($classHeader.find('.go-back-container .back-to'));
    andThen(function() {
      assert.equal(currentURL(), '/teacher-home');
    });
  });
});

test('Take A Tour', function(assert) {
  assert.expect(2);
  visit('/teacher/class/class-for-pochita-as-teacher');
  andThen(function() {
    let $tooltip;
    click('.app-container .gru-take-tour button.start-tour');
    andThen(function() {
      $tooltip = $('div.introjs-tooltip');

      T.exists(
        assert,
        $tooltip,
        'First step of the tour should display a tooltip'
      );
      assert.equal(
        T.text($tooltip.find('.tour-header h2')),
        'Welcome!',
        'First step title should be "Welcome!"'
      );
    });
  });
});
