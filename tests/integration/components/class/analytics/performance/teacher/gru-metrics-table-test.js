import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from "ember";

moduleForComponent('/class/analytics/performance/teacher/gru-metrics-table', 'Integration | Component | /class/analytics/performance/teacher/gru-metrics-table', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Metrics Table Layout', function(assert) {
  assert.expect(10);

  const headersMock = Ember.A([Ember.Object.create({
    id: '82168746-a4af-48aa-9975-01f6434cd806',
    title: 'Unit A1'
  })]);

  const dataPickerOptionsMock= Ember.A(["score","completion"]);

  const classPerformanceDataMock = Ember.A([
    Ember.Object.create({
      performanceData: Ember.Object.create({
        score : 10,
        completionDone: 13,
        completionTotal: 50,
        timeSpent: 3600
      })
    }),
    Ember.Object.create({
      user: 'Jennifer Ajoy',
      performanceData:  Ember.A([
        Ember.Object.create({
        score : 10,
        completionDone: 13,
        completionTotal: 50,
        timeSpent: 3600
        }),
        Ember.Object.create({
          id: '82168746-a4af-48aa-9975-01f6434cd806',
          score : 10,
          completionDone: 13,
          completionTotal: 50,
          timeSpent: 3600
        })
      ])
    }),
    Ember.Object.create({
      user: 'Jeffrey Bermudez',
      performanceData:  Ember.A([
        Ember.Object.create({
          id: '82168746-a4af-48aa-9975-01f6434cd806',
          score : 50,
          completionDone: 11,
          completionTotal: 40,
          timeSpent: 2600
        }),
        Ember.Object.create({
          id: '82168746-a4af-48aa-9975-01f6434cd806',
          score : 50,
          completionDone: 11,
          completionTotal: 40,
          timeSpent: 2600
        })
      ])
    })
  ]);

  this.set('headers', headersMock);
  this.set('performanceDataMatrix', classPerformanceDataMock);
  this.set('selectedOptions', dataPickerOptionsMock);
  this.set('headerType', 'unit');

  this.render(hbs`{{class/analytics/performance/teacher/gru-metrics-table headers=headers performanceDataMatrix=performanceDataMatrix dataPickerOptions=selectedOptions headerType=headerType}}`);

  const $component = this.$(); //component dom element
  const $metricsTable = $component.find(".gru-metrics-table");

  T.exists(assert, $metricsTable, 'Missing teacher metrics table');

  const $table = $metricsTable.find(".table");
  T.exists(assert, $table, 'Missing table');

  const $thead = $table.find("thead");
  T.exists(assert, $thead, 'Missing thead of the table');

  const $tbody = $table.find("tbody");
  T.exists(assert, $tbody, 'Missing tbody of the table');

  const $subheader = $thead.find(".gru-metrics-sub-header");
  T.exists(assert, $subheader, 'Missing sub-header component');

  const $performanceInformation = $metricsTable.find(".gru-metrics-performance-information");
  T.exists(assert, $performanceInformation, 'Missing performance information component');

  assert.equal($thead.find("tr:first-child th").length, 2, "The thead should have only 2 headers");
  assert.equal(T.text($thead.find("tr:first-child th:eq(1) .prefix")), "U1", "Wrong prefix header");
  assert.equal($tbody.find("th.user-info").length, 2, "The tbody should have only 2 user headers");

  //no-content text shouln't be visible because the table has data
  const $noContentText = $metricsTable.find(".no-content");
  T.notExists(assert, $noContentText, "The no-content text shouln't be visible");

});


