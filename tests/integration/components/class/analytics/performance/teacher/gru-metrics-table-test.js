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
  assert.expect(7);

  const headersMock = Ember.A([Ember.Object.create({
    id: '82168746-a4af-48aa-9975-01f6434cd806',
    title: 'Unit A1'
  })]);

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

  this.render(hbs`{{class/analytics/performance/teacher/gru-metrics-table headers=headers performanceDataMatrix=performanceDataMatrix}}`);

  const $component = this.$(); //component dom element
  const $metricsTable = $component.find(".gru-metrics-table");

  T.exists(assert, $metricsTable, 'Missing teacher metrics table');

  const $table = $metricsTable.find(".table");
  T.exists(assert, $table, 'Missing table');

  const $thead = $table.find("thead");
  T.exists(assert, $thead, 'Missing thead of the table');

  const $tbody = $table.find("tbody");
  T.exists(assert, $tbody, 'Missing tbody of the table');

  const $subheader = $thead.find(".sub-header");
  T.exists(assert, $subheader, 'Missing filters sub-header');

  assert.equal($thead.find("tr:first-child th").length, 2, "The thead should have only 2 headers");

  assert.equal($tbody.find("th.user-info").length, 2, "The tbody should have only 2 user headers");

});


