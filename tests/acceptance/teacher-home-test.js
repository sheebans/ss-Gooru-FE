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
  }
});

test('Layout', function(assert) {
  assert.expect(10);
  visit('/teacher-home');

  andThen(function() {
    assert.equal(currentURL(), '/teacher-home');

    T.exists(assert, find("header.gru-header"), "Header component not found");

    const $teacherContainer = find(".controller.teacher-landing");
    T.exists(assert, $teacherContainer, "Missing teacher container");
    const $teacherPanel = $teacherContainer.find(".teacher-panel");
    T.exists(assert, $teacherPanel.find(".greetings"), "Missing teacher greetings");
    T.exists(assert, $teacherPanel.find(".teacher-header .panel.announcements"), "Missing announcements panel in header");
    const $navigatorContainer = $teacherPanel.find(".teacher-navigator");
    T.exists(assert, $navigatorContainer, "Missing teacher navigator");
    T.exists(assert, $teacherPanel.find(".actions .create-class-cta"), "Missing create class button");
    assert.ok($("#active-classes").hasClass("active"), "Active classes should be visible");
    const $tabContent = $teacherPanel.find(".tab-content");
    assert.equal($tabContent.find('#active-classes .gru-teacher-class-card').length, 13 ,"Wrong number of current class cards");
    click("#archived-classes");
    andThen(function() {
      assert.equal($tabContent.find('#archived-classes .gru-class-card').length, 0 ,"Wrong number of archived class cards");
    });
  });
});

test('Take A Tour', function(assert){
  assert.expect(2);
  visit('/teacher-home');
  andThen(function() {
    let $tooltip;
    click(".app-container .gru-take-tour button.start-tour");
    andThen(function() {
      $tooltip = $("div.introjs-tooltip");

      T.exists(assert, $tooltip, "First step of the tour should display a tooltip");
      assert.equal(T.text($tooltip.find('.tour-header h2')), 'Your Homepage', 'First step title should be "Your Homepage"');
    });
  });
});

test('Go to class with no content', function(assert) {
  visit('/teacher-home');

  andThen(function() {
    assert.equal(currentURL(), '/teacher-home');
    const $announcement = find('.announcements .classes-announcements ul li:nth-child(1) a');
    click($announcement);
    andThen(function() {
      assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher-no-course/quick-start', 'Wrong route');
    });
  });
});

test('Go to class with content', function(assert) {
  visit('/teacher-home');

  andThen(function() {
    assert.equal(currentURL(), '/teacher-home');
    const $announcement = find('.announcements .classes-announcements ul li:nth-child(2) a');
    click($announcement);
    andThen(function() {
      assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher/course-map', 'Wrong route');
    });
  });
});
