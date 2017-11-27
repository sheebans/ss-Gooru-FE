import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

moduleForComponent(
  '/class/analytics/performance/teacher/gru-metrics-table',
  'Integration | Component | /class/analytics/performance/teacher/gru-metrics-table',
  {
    integration: true,
    beforeEach: function() {
      this.container.lookup('service:i18n').set('locale', 'en');
    }
  }
);

test('Metrics Table Header Collection', function(assert) {
  const headersMock = Ember.A([
    Ember.Object.create({
      id: '82168746-a4af-48aa-9975-01f6434cd806',
      title: 'Collection C1',
      collectionType: 'collection'
    })
  ]);

  const dataPickerOptionsMock = Ember.A(['completion']);

  const classPerformanceDataMock = Ember.A([
    Ember.Object.create({
      performanceData: Ember.Object.create({
        score: 10,
        completionDone: 13,
        completionTotal: 50,
        timeSpent: 3600
      })
    }),
    Ember.Object.create({
      user: 'Jennifer Ajoy',
      performanceData: Ember.A([
        Ember.Object.create({
          score: 10,
          completionDone: 13,
          completionTotal: 50,
          timeSpent: 3600
        }),
        Ember.Object.create({
          id: '82168746-a4af-48aa-9975-01f6434cd806',
          score: 10,
          completionDone: 13,
          completionTotal: 50,
          timeSpent: 3600
        })
      ])
    })
  ]);

  this.set('headers', headersMock);
  this.set('performanceDataMatrix', classPerformanceDataMock);
  this.set('selectedOptions', dataPickerOptionsMock);
  this.set('headerType', 'collection');

  this.on('externalAction', function() {
    assert.ok(false, 'This should not be called');
  });

  this.render(
    hbs`{{class/analytics/performance/teacher/gru-metrics-table headers=headers performanceDataMatrix=performanceDataMatrix dataPickerOptions=selectedOptions headerType=headerType onNavigation='externalAction'}}`
  );

  const $component = this.$(); //component dom element
  const $metricsTable = $component.find('.gru-metrics-table');

  T.exists(assert, $metricsTable, 'Missing teacher metrics table');

  const $collectionHeader = $metricsTable.find('.table .headers .header:eq(1)');
  $collectionHeader.click();
});

test('Metrics Table actions', function(assert) {
  assert.expect(1);

  const headersMock = Ember.A([
    Ember.Object.create({
      id: '82168746-a4af-48aa-9975-01f6434cd806',
      title: 'Assessment A1'
    })
  ]);

  const dataPickerOptionsMock = Ember.A(['completion', 'score']);

  const classPerformanceDataMock = Ember.A([
    Ember.Object.create({
      performanceData: Ember.Object.create({
        score: 10,
        completionDone: 13,
        completionTotal: 50,
        timeSpent: 3600
      })
    }),
    Ember.Object.create({
      user: 'Jennifer Ajoy',
      performanceData: Ember.A([
        Ember.Object.create({
          score: 11,
          completionDone: 13,
          completionTotal: 50,
          timeSpent: 3600
        }),
        Ember.Object.create({
          id: '82168746-a4af-48aa-9975-01f6434cd806',
          score: 12,
          completionDone: 13,
          completionTotal: 50,
          timeSpent: 3600,
          hasStarted: true
        })
      ])
    })
  ]);

  this.set('headers', headersMock);
  this.set('performanceDataMatrix', classPerformanceDataMock);
  this.set('selectedOptions', dataPickerOptionsMock);
  this.set('headerType', 'collection');

  this.on('navigationAction', function() {
    assert.ok(true, 'This should be called');
  });

  this.on('clickReport', function(performance, userPerformance) {
    assert.equal(performance.get('score'), 13, 'Wrong score');
    assert.ok(userPerformance, 'Missing userPerformance');
  });

  this
    .render(hbs`{{class/analytics/performance/teacher/gru-metrics-table headers=headers
      performanceDataMatrix=performanceDataMatrix dataPickerOptions=selectedOptions
      onClickReport='clickReport'
      headerType=headerType onNavigation='navigationAction'}}`);

  const $component = this.$();
  const $metricsTable = $component.find('.gru-metrics-table');

  T.exists(assert, $metricsTable, 'Missing teacher metrics table');

  const $collectionHeader = $metricsTable.find('.table .headers .header:eq(1)');
  $collectionHeader.click();
  return wait().then(function() {
    const $report = $metricsTable.find(
      'tbody  .gru-metrics-performance-information:eq(1) .report span'
    );
    $report.click();
  });
});
