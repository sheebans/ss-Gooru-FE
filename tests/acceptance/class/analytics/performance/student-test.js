import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | class/analytics/performance/student', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-analytics-performance-student-token',
      user: {
        gooruUId: 'class-analytics-performance-student-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/class/class-10/analytics/performance/student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-10/analytics/performance/student');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    T.exists(assert, $performanceContainer, "Missing performance container");

    T.exists(assert, $performanceContainer.find(".navigation .performance-tab"), "Missing performance navigation tab");
    T.exists(assert, $performanceContainer.find(".navigation .mastery-tab"), "Missing mastery navigation tab");
    T.exists(assert, $performanceContainer.find(".controls .performance-breadcrumb"), "Missing performance breadcrumb");
    T.exists(assert, $performanceContainer.find(".controls .performance-actions"), "Missing performance actions");
    T.exists(assert, $performanceContainer.find(".snapshot"), "Missing performance snapshot");
    T.exists(assert, $performanceContainer.find(".performance-content"), "Missing performance content");

    const $classMenu = find(".controller.class .gru-class-navigation .class-menu");
    T.exists(assert, $classMenu.find(".analytics.selected"), "Missing selected analytics item");
  });
});
