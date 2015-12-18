import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';
import {KEY_CODES} from "gooru-web/config/config";

moduleForAcceptance('Acceptance | class/analytics/performance/student', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-analytics-performance-student-token',
      user: {
        /* Using pochita, but as a student in classes */
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    T.exists(assert, $performanceContainer, "Missing performance container");

    T.exists(assert, $performanceContainer.find(".navigation .performance"), "Missing performance navigation tab");
    T.exists(assert, $performanceContainer.find(".navigation .mastery"), "Missing mastery navigation tab");
    T.exists(assert, $performanceContainer.find(".controls .student-breadcrumb .gru-breadcrumb"), "Missing performance breadcrumb");
    T.exists(assert, $performanceContainer.find(".controls .student-actions"), "Missing performance actions");
    T.exists(assert, $performanceContainer.find(".controls .student-actions .gru-actions-bar"), "Missing performance actions component");
    T.exists(assert, $performanceContainer.find(".snapshot"), "Missing performance snapshot");
    T.exists(assert, $performanceContainer.find(".gru-content"), "Missing performance content");

    const $classMenu = find(".controller.class .gru-class-navigation .class-menu");
    T.exists(assert, $classMenu.find(".analytics.selected"), "Missing selected analytics item");
  });
});

test('Navigating from class navigation', function(assert) {
  visit('/class/class-for-pochita-as-student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student');

    const $overviewMenuItem = find(".navigation .class-menu .analytics");

    click($overviewMenuItem);
    andThen(function() {
      //making sure it goes to the teacher view
      assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    });
  });
});

test('When view by collection option is selected', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    const $collectionViewOption = $performanceContainer.find(".controls .gru-actions-bar .dropdown-menu .collection");

    click($collectionViewOption);
    andThen(function() {
      assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student?filterBy=collection');

    });
  });
});

test('When filtering by collection is  pre-selected', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student?filterBy=collection');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student?filterBy=collection');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    const $menu = $performanceContainer.find(".controls .gru-actions-bar .drop-menu");
    assert.equal(T.text($menu.find(".selected-filter")), 'View Collection', 'Wrong text selected');
  });
});

test('View Full Screen and Exit Full Screen', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    const $viewFullScreen = $performanceContainer.find(".controls .gru-actions-bar .full-screen");

    T.exists(assert, $performanceContainer.find(".controls .gru-actions-bar button.full-screen.view-full-screen"), "Button should be on view full screen mode");

    click($viewFullScreen); //enter full screen mode
    andThen(function() {
      const $navigation = find(".controller div.navigation.hide");

      T.exists(assert, $performanceContainer.find(".controls .gru-actions-bar button.full-screen.exit-full-screen"), "Button should be on exit full screen mode");
      T.exists(assert, $navigation, "Navigation Menu should be hidden");

      click($viewFullScreen); //exit full screen mode
      andThen(function() {
        const $navigation = find(".controller div.navigation.show");
        T.exists(assert, $performanceContainer.find(".controls .gru-actions-bar button.full-screen.view-full-screen"), "Button should be on view full screen mode");
        T.exists(assert, $navigation, "Navigation Menu should be visible");
      });
    });
  });
});

test('Exit Full Screen by pressing Esc', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    const $viewFullScreen = $performanceContainer.find(".controls .gru-actions-bar .full-screen");

    click($viewFullScreen); //enter full screen mode
    andThen(function() {
      var $navigation = find(".controller div.navigation.hide");

      T.exists(assert, $performanceContainer.find(".controls .gru-actions-bar button.full-screen.exit-full-screen"), "Button should be on exit full screen mode");
      T.exists(assert, $navigation, "Navigation Menu should be hidden");

      keyEvent($performanceContainer, 'keyup', KEY_CODES.ESCAPE); //exit full screen by pressing ESC
      andThen(function() {
        $navigation = find(".controller div.navigation.show");
        T.exists(assert, $performanceContainer.find(".controls .gru-actions-bar button.full-screen.view-full-screen"), "Button should be on view full screen mode");
        T.exists(assert, $navigation, "Navigation Menu should be show");
      });
    });
  });
});


