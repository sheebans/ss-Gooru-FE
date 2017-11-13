import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | Student Home Landing page', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'user-token',
      user: {
        gooruUId: 'param-123'
      }
    });
    window.localStorage.setItem('param-123_logins', 1);
  }
});

test('Layout', function(assert) {
  window.localStorage.setItem('param-123_logins', 3);
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');

    T.exists(assert, find('header.gru-header'), 'Header component not found');

    const $userContainer = find('.controller.student-landing');
    T.exists(assert, $userContainer, 'Missing student container');

    const $leftUserContainer = $userContainer.find('.student-left-panel');
    T.exists(
      assert,
      $leftUserContainer.find('.greetings'),
      'Missing student greetings'
    );
    T.exists(
      assert,
      $leftUserContainer.find('.greetings .title'),
      'Missing student name'
    );
    assert.equal(
      $leftUserContainer.find('.greetings .title span').text(),
      'Hello, Student!',
      'Incorrect student name text'
    );
    T.exists(
      assert,
      $leftUserContainer.find('.greetings .featured-courses'),
      'Missing student name'
    );

    const $featuredCourses = $leftUserContainer.find(
      '.student-featured-courses'
    );
    T.exists(assert, $featuredCourses, 'Missing featured courses component');

    const $navigatorContainer = $leftUserContainer.find('.student-navigator');
    T.exists(assert, $navigatorContainer, 'Missing student navigator');

    assert.ok(
      $('.active-classes').hasClass('active'),
      'Active classes should be visible'
    );

    const $tabContent = $leftUserContainer.find('.content');
    assert.equal(
      $tabContent.find('.gru-student-class-card').length,
      7,
      'Wrong number of class cards'
    );
  });
});

test('Will disappear next login', function(assert) {
  window.localStorage.setItem('param-123_logins', 5);
  visit('/student-home');

  andThen(function() {
    const $userContainer = find('.controller.student-landing');
    const $leftUserContainer = $userContainer.find('.student-left-panel');
    T.exists(
      assert,
      $leftUserContainer.find('.greetings .featured-courses'),
      'Missing student name'
    );
    const $featuredCourses = $leftUserContainer.find(
      '.student-featured-courses'
    );
    T.exists(assert, $featuredCourses, 'Missing featured courses component');
  });
});

test('Layout without feature courses', function(assert) {
  window.localStorage.setItem('param-123_logins', 6);
  visit('/student-home');

  andThen(function() {
    const $userContainer = find('.controller.student-landing');
    const $leftUserContainer = $userContainer.find('.student-left-panel');
    T.notExists(
      assert,
      $leftUserContainer.find('.greetings .featured-courses'),
      'Missing student name'
    );
    const $featuredCourses = $leftUserContainer.find(
      '.student-featured-courses'
    );
    T.notExists(assert, $featuredCourses, 'Missing featured courses component');
  });
});

test('Go to library from featured-courses panel', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    const $featuredCourses = find('.featured-courses');

    const $featuredCoursesLink = $featuredCourses.find('a');

    click($featuredCoursesLink);
    andThen(function() {
      assert.equal(currentURL(), '/library', 'Wrong route');
    });
  });
});

test('Take A Tour', function(assert) {
  assert.expect(2);
  visit('/student-home');
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

test('Go to course map from class card', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    const $card = find(
      '.gru-student-class-card:eq(0) .panel-heading >.title a'
    );
    click($card);
    andThen(function() {
      assert.equal(
        currentURL(),
        '/student/class/class-for-pochita-as-student/course-map?location=first-unit-id%2Bfirst-lesson-id%2Bfirst-assessment-id',
        'Wrong route'
      );
    });
  });
});

test('Go to performance from class card', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    const $card = find(
      '.gru-student-class-card:eq(0) .performance .percentage'
    );
    click($card);
    andThen(function() {
      assert.equal(
        currentURL(),
        '/student/class/class-for-pochita-as-student/performance?lessonId=637e7599-96de-4459-83cb-c72bd47ae4b0&unitId=first-unit-id',
        'Wrong route'
      );
    });
  });
});

test('Class order', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    let $title = find('.gru-student-class-card:eq(0) .panel-heading >.title');
    assert.ok(
      $title.text().includes('First Class Pochita'),
      'Incorrect first class title'
    );
  });
});
