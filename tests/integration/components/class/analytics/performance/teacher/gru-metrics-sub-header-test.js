//import { moduleForComponent, test } from 'ember-qunit';
//import hbs from 'htmlbars-inline-precompile';
//import T from 'gooru-web/tests/helpers/assert';
//
//moduleForComponent('/class/analytics/performance/teacher/gru-metrics-sub-header', 'Integration | Component | /class/analytics/performance/teacher/gru-metrics-sub-header', {
//  integration: true,
//  beforeEach: function () {
//    this.container.lookup('service:i18n').set("locale","en");
//  }
//});
//
//test('Metrics Table Layout', function(assert) {
//  assert.expect(5);
//
//  this.render(hbs`{{class/analytics/performance/teacher/gru-metrics-table }}`);
//
//  const $component = this.$(); //component dom element
//  const $metricsTable = $component.find(".gru-metrics-table");
//
//  T.exists(assert, $metricsTable, 'Missing teacher metrics table');
//
//  const $table = $metricsTable.find(".table");
//  T.exists(assert, $table, 'Missing table');
//
//  const $thead = $table.find("thead");
//  T.exists(assert, $thead, 'Missing thead of the table');
//
//  const $tbody = $table.find("tbody");
//  T.exists(assert, $tbody, 'Missing tbody of the table');
//
//  const $subheader = $table.find(".sub-header");
//  T.exists(assert, $subheader, 'Missing filters sub-header');
//});

