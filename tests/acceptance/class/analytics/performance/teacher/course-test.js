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
    T.exists(assert, $performanceContainer.find(".gru-metrics-table"), "Missing metrics table component");

    const $classMenu = find(".controller.class .gru-class-navigation .class-menu");
    T.exists(assert, $classMenu.find(".analytics.selected"), "Missing selected analytics item");

    //assert breadcrumb text
    const $breadcrumb = find(".controller.class .gru-breadcrumb");
    const $breadcrumbItems = $breadcrumb.find("ul li");
    assert.equal($breadcrumbItems.length, 1, "Incorrect number of breadcrumb items");
    assert.equal(T.text($breadcrumb.find("ul li:last-child")), 'The Best Course Ever Made', "Wrong breadcrumb item label");

  });
});

test('Navigate to unit', function(assert) {
  visit('/class/class-for-pochita-as-teacher/analytics/performance/teacher/course');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/analytics/performance/teacher/course');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-teacher-course");
    const $metricTable = $performanceContainer.find(".gru-metrics-table");

    click($metricTable.find("thead tr:eq(0) th:eq(1)"));
    andThen(function(){
      assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/analytics/performance/teacher/unit/31886eac-f998-493c-aa42-016f53e9fa88');
    });

    //menu is still selected
    const $classMenu = find(".controller.class .gru-class-navigation .class-menu");
    T.exists(assert, $classMenu.find(".analytics.selected"), "Missing selected analytics item");
  });
});

test('Test data picker options selected', function(assert) {
  visit('/class/class-for-pochita-as-teacher/analytics/performance/teacher/course');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/analytics/performance/teacher/course');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-teacher-course");
    const $metricTable = $performanceContainer.find(".gru-metrics-table");
    const $dataPicker = find(".controller.class .gru-data-picker");

    click($dataPicker.find("ul.option-list a.completion"));
    click($metricTable.find("thead tr:eq(0) th:eq(1)"));
    andThen(function(){
      assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/analytics/performance/teacher/unit/31886eac-f998-493c-aa42-016f53e9fa88');
    });

    const $performanceInformation = $metricTable.find(".gru-metrics-performance-information");

    //datapicker score item is selected by default
    T.exists(assert, $performanceInformation.find(".score"), "Missing  datapicker score information");

    T.exists(assert, $performanceInformation.find(".gru-completion-information-chart"), "Missing  datapicker completion information");
    T.notExists(assert, $performanceInformation.find(".study-time"), "Study time item shouldn't be selected");
  });
});
