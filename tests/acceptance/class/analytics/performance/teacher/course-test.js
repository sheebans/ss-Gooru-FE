import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | class/analytics/performance/teacher/course', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-analytics-performance-teacher-course-token',
      user: {
        /* using a pochita, @see classes/class-for-pochita-as-teacher-200-response.js */
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/class/class-for-pochita-as-teacher/analytics/performance/teacher/course');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/analytics/performance/teacher/course');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-teacher-course");
    T.exists(assert, $performanceContainer.find(".gru-content .gru-metrics-table"), "Missing metrics table component");

    const $classMenu = find(".controller.class .gru-class-navigation .class-menu");
    T.exists(assert, $classMenu.find(".analytics.selected"), "Missing selected analytics item");

    //assert breadcrumb text
    const $breadcrumb = find(".controller.class .breadcrumb");

  });
});

test('Navigate to unit', function(assert) {
  visit('/class/class-for-pochita-as-teacher/analytics/performance/teacher/course');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/analytics/performance/teacher/course');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-teacher-course");
    const $metricTable = $performanceContainer.find(".gru-content .gru-metrics-table");

    click($metricTable.find("td:eq(0)"));
    andThen(function(){
      assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/analytics/performance/teacher/unit/29292');
    });

    //menu is still selected
    const $classMenu = find(".controller.class .gru-class-navigation .class-menu");
    T.exists(assert, $classMenu.find(".analytics.selected"), "Missing selected analytics item");
  });
});
