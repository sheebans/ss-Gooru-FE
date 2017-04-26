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
        gooruUId: 'id-for-pochita'
      }
    });
  }
});


test('Layout', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');

    T.exists(assert, find('header.gru-header'), 'Header component not found');
    T.exists(assert, find('.announcements'),'Missing announcements panel');
    T.exists(assert, find('.announcements .warning i'),'Missing warning icon');
    T.exists(assert, find('.announcements .warning span.announcements-lead'),'Missing warning announcements lead');
    assert.equal(find('.announcements .classes-announcements ul li').length,5,'Missing announcements lust');
    T.exists(assert, find('.more-classes'),'Missing more classes indetifier');

    const $userContainer = find('.controller.student-landing');
    T.exists(assert, $userContainer, 'Missing student container');

    const $leftUserContainer = $userContainer.find('.student-left-panel');
    T.exists(assert, $leftUserContainer.find('.greetings'), 'Missing student greetings');
    T.exists(assert, $leftUserContainer.find('.greetings .title'), 'Missing student name');
    assert.equal( $leftUserContainer.find('.greetings .title span').text(),'Hello, Pochita!','Incorrect student name text');
    T.exists(assert, $leftUserContainer.find('.greetings p'), 'Missing count classrooms');
    assert.equal( $leftUserContainer.find('.greetings p').text(), "You're currently enrolled in 7 classrooms",'Incorrect count classrooms text');

    const $navigatorContainer = $leftUserContainer.find('.student-navigator');
    T.exists(assert, $navigatorContainer, 'Missing student navigator');
    T.exists(assert, $navigatorContainer.find('.actions .join-class-cta'), 'Missing join class button');
    T.exists(assert, $navigatorContainer.find('.actions .manage-goals-cta'), 'Missing manage goals button');

    assert.ok($('#active-classes').hasClass('active'), 'Active classes should be visible');

    const $tabContent = $leftUserContainer.find('.tab-content');
    assert.equal($tabContent.find('.gru-student-class-card').length, 7 ,'Wrong number of class cards');
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

test('Go to manage goals page', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');

    const $userContainer = find('.controller.student-landing');
    const $leftUserContainer = $userContainer.find('.student-left-panel');
    const $navigatorContainer = $leftUserContainer.find('.student-navigator');

    click($navigatorContainer.find('.actions .manage-goals-cta'));
    andThen(function() {
      assert.equal(currentURL(), '/goals/manage', 'Wrong route');
    });
  });
});

test('Go to course map from announcement', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    const $announcement = find('.announcements .classes-announcements ul li:nth-child(1) a');
    click($announcement);
    andThen(function() {
      assert.equal(currentURL(), '/student/class/class-for-pochita-as-student/course-map?location=first-unit-id%2Bfirst-lesson-id%2Bfirst-assessment-id', 'Wrong route');
    });
  });
});

test('Go to course map from class card', function(assert) {
  visit('/student-home');

  andThen(function() {
    assert.equal(currentURL(), '/student-home');
    const $card = find('.gru-student-class-card:eq(0) a');
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
