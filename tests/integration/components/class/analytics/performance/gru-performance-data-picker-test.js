import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('class/analytics/performance/gru-data-picker', 'Integration | Component | class/analytics/performance/gru performance data picker', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Performance Data Picker Layout', function(assert) {
  assert.expect(7);
  const valueDefault = Ember.A["Score"];

  this.set('valueDefault', valueDefault);
  this.render(hbs`{{class/analytics/performance/gru-data-picker selectedPerformance=valueDefault}}`);

  const $component = this.$(); //component dom element
  const $performanceDataPicker = $component.find(".gru-data-picker");

  T.exists(assert, $performanceDataPicker, 'Missing performance data picker');

  const $options = $component.find(".performance-list li");
  assert.equal($options.length, 5, "Incorrect number of options displayed");

  const $optionScore = $component.find(".performance-list li span.score");
  T.exists(assert, $optionScore, 'Missing Score option');

  const $optionCompletion = $component.find(".performance-list li span.completion");
  T.exists(assert, $optionCompletion, 'Missing Completion option');

  const $optionTime = $component.find(".performance-list li span.time");
  T.exists(assert, $optionTime, 'Missing Time option');

  const $optionReaction = $component.find(".performance-list li span.reaction");
  T.exists(assert, $optionReaction, 'Missing Reaction option');

  const $optionAttempt = $component.find(".performance-list li span.attempt");
  T.exists(assert, $optionAttempt, 'Missing Attempt option');
});

test('Performance Data Picker Default', function(assert) {
  assert.expect(2);

  this.render(hbs`{{class/analytics/performance/gru-data-picker}}`);

  const $component = this.$(); //component dom element

  const $optionsActive = $component.find(".active");
  assert.equal($optionsActive.length, 1, "Incorrect number of active options");

  const $optionScore = $component.find(".performance-list li .score");
  assert.ok($optionScore.hasClass('active'));

});

test('Select performance', function(assert) {
  assert.expect(1);

  this.on('parentAction', function(performance){
    assert.equal('score', performance[0].get('value'));
  });

  this.render(hbs`{{class/analytics/performance/gru-data-picker onChangePerformance='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $performanceDataPicker = $component.find("ul.performance-list");
  $performanceDataPicker.find("li:first-child").click();
});

test('Verify selected performance with specific max value', function(assert) {
  assert.expect(4);

  const max = 3;
  this.on('parentAction', function(performance){
    assert.ok(performance.get("length") <= 3, "Selected options should be less than max"); //this is called 4 times
  });

  this.set('max', max);


  this.render(hbs`{{class/analytics/performance/gru-data-picker max=max onChangePerformance='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $performanceDataPicker = $component.find("ul.performance-list");
  $performanceDataPicker.find("li:eq(1)").click();//try select completion option
  $performanceDataPicker.find("li:eq(0)").click();
  $performanceDataPicker.find("li:eq(2)").click();
  $performanceDataPicker.find("li:eq(3)").click();
});

test('Verify that there is at least one selected', function(assert) {
  assert.expect(2);

  this.on('parentAction', function(selectedOptions){
    assert.ok(selectedOptions.get("length") === 1, "Selected options should be equal than min");
  });


  this.render(hbs`{{class/analytics/performance/gru-data-picker onChangePerformance='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $performanceDataPicker = $component.find("ul.performance-list");
  $performanceDataPicker.find("li:eq(0)").click();//try unselected score
  $performanceDataPicker.find("li:eq(1)").click();//change option


});
