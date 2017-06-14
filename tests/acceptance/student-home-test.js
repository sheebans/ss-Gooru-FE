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
  }
});


test('Layout', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');

    T.exists(assert, find('header.gru-header'), 'Header component not found');

    const $userContainer = find('.controller.student-landing');
    T.exists(assert, $userContainer, 'Missing student container');

    const $leftUserContainer = $userContainer.find('.student-left-panel');
    T.exists(assert, $leftUserContainer.find('.greetings'), 'Missing student greetings');
    T.exists(assert, $leftUserContainer.find('.greetings .title'), 'Missing student name');
    assert.equal( $leftUserContainer.find('.greetings .title span').text(),'Hello, Student!','Incorrect student name text');
    T.exists(assert, $leftUserContainer.find('.greetings p'), 'Missing count classrooms');
    assert.equal( $leftUserContainer.find('.greetings p').text(), "You're currently enrolled in 7 classrooms",'Incorrect count classrooms text');

    const $panelsContainer = $leftUserContainer.find('.panels');
    T.exists(assert, $panelsContainer, 'Missing panels container');

    const $featuredCourses = $panelsContainer.find('.featured-courses');
    T.exists(assert, $featuredCourses, 'Missing featured courses panel');

    T.exists(assert, $featuredCourses.find('.panel-heading'), 'Missing featured courses panel-heading');
    T.exists(assert, $featuredCourses.find('.panel-body'), 'Missing featured courses panel-body');

    T.exists(assert, $featuredCourses.find('.panel-body .legend'), 'Missing panel body legend');
    T.exists(assert, $featuredCourses.find('.panel-body .courses'), 'Missing courses');
    assert.equal($featuredCourses.find('.panel-body .courses .gru-course-card').length, 2 ,'Wrong number of featured course cards');
    T.exists(assert, $featuredCourses.find('.panel-body .actions .library'), 'Missing library button');
    T.exists(assert, $featuredCourses.find('.panel-body .will-disappear'), 'Missing will-disappear legend');

    const $navigatorContainer = $leftUserContainer.find('.student-navigator');
    T.exists(assert, $navigatorContainer, 'Missing student navigator');
    T.exists(assert, $navigatorContainer.find('.actions .join-class-cta'), 'Missing join class button');

    assert.ok($('#active-classes').hasClass('active'), 'Active classes should be visible');

    const $tabContent = $leftUserContainer.find('.tab-content');
    assert.equal($tabContent.find('.gru-student-class-card').length, 7 ,'Wrong number of class cards');
  });
});

test('Go to library from featured-courses panel', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    const $featuredCourses = find('.panel.featured-courses');
    const $featuredCoursesButton = $featuredCourses.find('.actions button.library');

    click($featuredCoursesButton);
    andThen(function() {
      assert.equal(currentURL(), '/library', 'Wrong route');
    });
  });
});

test('Take A Tour', function(assert){
  assert.expect(2);
  visit('/student-home');
  andThen(function() {
    let $tooltip;
    click(".app-container .gru-take-tour button.start-tour");
    andThen(function() {
      $tooltip = $("div.introjs-tooltip");

      T.exists(assert, $tooltip, "First step of the tour should display a tooltip");
      assert.equal(T.text($tooltip.find('.tour-header h2')), 'Take a Tour Icon', 'First step title should be "Take a Tour Icon"');
    });
  });
});

test('Go to course map from class card', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    const $card = find('.gru-student-class-card:eq(0)  a');
    click($card);
    andThen(function() {
      assert.equal(currentURL(), '/student/class/class-for-pochita-as-student/course-map?location=first-unit-id%2Bfirst-lesson-id%2Bfirst-assessment-id', 'Wrong route');
    });
  });
});

test('Valid bubble chart when the class does not has performance', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    let $chart = find('.gru-student-class-card:eq(1) .gru-bubble-chart .bubble-circle');
    assert.equal($chart.attr('style'),'background-color:#949A9F','Incorrect chart color');
    assert.equal($chart.find('span').text(),'--','Incorrect score');
  });
});

test('Valid bubble chart when the class has performance', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    let $chart = find('.gru-student-class-card:eq(0) .gru-bubble-chart .bubble-circle');
    assert.equal($chart.attr('style'),'background-color:#F46360','Incorrect chart color');
    assert.equal($chart.find('span').text(),'0%','Incorrect score');
  });
});

test('Valid completed chart when the class has started', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    let $chart = find('.gru-student-class-card:eq(0) .gru-radial-chart .radial-svg .labels');
    assert.equal($chart.text(),'1/3','Incorrect label');
  });
});


test('Valid completed chart when the class has not started', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    let $chart = find('.gru-student-class-card:eq(1) .gru-radial-chart .radial-svg .labels');
    assert.equal($chart.text(),'--','Incorrect label');
  });
});

test('Class order', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    let $title = find('.gru-student-class-card:eq(0) h5');
    assert.equal($title.text().trim(),'First Class Pochita as Student','Incorrect first class');
  });
});
