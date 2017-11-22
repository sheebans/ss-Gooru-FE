import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | Teacher Home Landing page', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'user-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
    window.localStorage.setItem('id-for-pochita_logins', 1);
  }
});

test('Layout', function(assert) {
  window.localStorage.setItem('id-for-pochita_logins', 3);
  visit('/teacher-home');

  andThen(function() {
    assert.equal(currentURL(), '/teacher-home');

    T.exists(assert, find('header.gru-header'), 'Header component not found');

    const $teacherContainer = find('.controller.teacher-landing');
    T.exists(assert, $teacherContainer, 'Missing teacher container');
    const $teacherPanel = $teacherContainer.find('.teacher-panel');
    T.exists(
      assert,
      $teacherPanel.find('.greetings'),
      'Missing teacher greetings'
    );

    const $panelsContainer = $teacherPanel.find('.panels');
    T.exists(assert, $panelsContainer, 'Missing panels container');

    const $featuredCourses = $panelsContainer.find('.teacher-featured-courses');
    T.exists(assert, $featuredCourses, 'Missing featured courses component');

    const $navigatorContainer = $teacherPanel.find('.teacher-navigator');
    T.exists(assert, $navigatorContainer, 'Missing teacher navigator');
    assert.ok(
      $('#active-classes').hasClass('active'),
      'Active classes should be visible'
    );
    const $tabContent = $teacherPanel.find('.tab-content');

    click('#archived-classes');
    andThen(function() {
      assert.ok($('span.no-archived'), 'Missing no archived available lead');
      assert.equal(
        $tabContent.find('#archived-classes .gru-class-card').length,
        2,
        'Wrong number of archived class cards'
      );
    });
  });
});

test('Will disappear next login', function(assert) {
  window.localStorage.setItem('id-for-pochita_logins', 5);
  visit('/teacher-home');

  andThen(function() {
    const $teacherContainer = find('.controller.teacher-landing');
    const $teacherPanel = $teacherContainer.find('.teacher-panel');
    const $panelsContainer = $teacherPanel.find('.panels');
    T.exists(assert, $panelsContainer, 'Missing panels container');

    const $featuredCourses = $panelsContainer.find('.teacher-featured-courses');
    T.exists(assert, $featuredCourses, 'Missing featured courses component');
  });
});

test('Layout without panels', function(assert) {
  window.localStorage.setItem('id-for-pochita_logins', 6);
  visit('/teacher-home');

  andThen(function() {
    const $teacherContainer = find('.controller.teacher-landing');
    const $teacherPanel = $teacherContainer.find('.teacher-panel');
    const $panelsContainer = $teacherPanel.find('.panels');
    T.notExists(assert, $panelsContainer, 'Panels container should not appear');
  });
});

test('Take A Tour', function(assert) {
  assert.expect(2);
  visit('/teacher-home');
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
        'Take a Tour',
        'First step title should be "Take a Tour"'
      );
    });
  });
});
