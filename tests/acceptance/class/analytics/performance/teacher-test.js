import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | class/analytics/performance/teacher', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-analytics-performance-teacher-token',
      user: {
        /* using a teacher id, @see classes/any-class-info-200-response.js */
        gooruUId: 'teacher-123'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/class/class-10/analytics/performance/teacher');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-10/analytics/performance/teacher');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-teacher");
    T.exists(assert, $performanceContainer, "Missing performance container");

    T.exists(assert, $performanceContainer.find(".navigation .performance"), "Missing performance navigation tab");
    T.exists(assert, $performanceContainer.find(".navigation .mastery"), "Missing mastery navigation tab");
    T.exists(assert, $performanceContainer.find(".controls .gru-breadcrumb"), "Missing performance breadcrumb");
    T.exists(assert, $performanceContainer.find(".controls .gru-actions"), "Missing performance actions");
    T.exists(assert, $performanceContainer.find(".gru-filters .data-picker"), "Missing data picker");
    T.exists(assert, $performanceContainer.find(".gru-filters .performance-scale"), "Missing performance scale area");
    T.exists(assert, $performanceContainer.find(".gru-content"), "Missing performance content");

    const $classMenu = find(".controller.class .gru-class-navigation .class-menu");
    T.exists(assert, $classMenu.find(".analytics.selected"), "Missing selected analytics item");
  });
});

test('Navigating from class navigation', function(assert) {
  visit('/class/class-10');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-10');

    const $overviewMenuItem = find(".navigation .class-menu .analytics");

    click($overviewMenuItem);
    andThen(function() {
      //making sure it goes to the teacher view
      assert.equal(currentURL(), '/class/class-10/analytics/performance/teacher');
    });
  });
});
