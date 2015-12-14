import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from "ember";

moduleForComponent('class/analytics/performance/gru-data-picker', 'Integration | Component | class/analytics/performance/gru data picker', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Data Picker Layout', function(assert) {
  assert.expect(7);

  this.render(hbs`{{class/analytics/performance/gru-data-picker }}`);

  const $component = this.$(); //component dom element
  const $dataPicker = $component.find(".gru-data-picker");

  T.exists(assert, $dataPicker, 'Missing performance data picker');

  const $options = $component.find(".option-list li");
  assert.equal($options.length, 5, "Incorrect number of options displayed");

  const $optionScore = $component.find(".option-list li span.score");
  T.exists(assert, $optionScore, 'Missing Score option');

  const $optionCompletion = $component.find(".option-list li span.completion");
  T.exists(assert, $optionCompletion, 'Missing Completion option');

  const $optionTime = $component.find(".option-list li span.time");
  T.exists(assert, $optionTime, 'Missing Time option');

  const $optionReaction = $component.find(".option-list li span.reaction");
  T.exists(assert, $optionReaction, 'Missing Reaction option');

  const $optionAttempt = $component.find(".option-list li span.attempt");
  T.exists(assert, $optionAttempt, 'Missing Attempt option');
});

test('Data Picker Default', function(assert) {
  assert.expect(2);

  this.render(hbs`{{class/analytics/performance/gru-data-picker}}`);

  const $component = this.$(); //component dom element

  const $optionsActive = $component.find(".active");
  assert.equal($optionsActive.length, 1, "Incorrect number of active options");

  const $optionScore = $component.find(".option-list li .score");
  assert.ok($optionScore.hasClass('active'));

});
test('Verify the icons', function(assert) {
  assert.expect(2);
  const iconDefault = "fa-square-o";
  const iconSelected = "fa-check-square-o";
  this.set('iconDefault', iconDefault);
  this.set('iconSelected', iconSelected);

  this.render(hbs`{{class/analytics/performance/gru-data-picker  icon-default=iconDefault icon-selected=iconSelected}}`);
  var $component = this.$(); //component dom element
  var $dataPicker = $component.find("ul.option-list");
  var $scoreOption =  $dataPicker.find("span.score i.fa"); //Score is selected by default
  assert.ok($scoreOption.hasClass('fa-check-square-o'));
  var $completionOption =  $dataPicker.find("span.completion i.fa"); // Completion is unselected by default
  assert.ok($completionOption.hasClass('fa-square-o'));
});

test('Select option', function(assert) {
  assert.expect(1);

  this.on('parentAction', function(options){
    assert.equal('score', options[0].get('value'));
  });

  this.render(hbs`{{class/analytics/performance/gru-data-picker onOptionsChange='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $dataPicker = $component.find("ul.option-list");
  $dataPicker.find("li:first-child a").click();
});

test('Verify selected option with specific max value', function(assert) {
  assert.expect(4);

  const max = 3;
  this.on('parentAction', function(options){
    assert.ok(options.get("length") <= 3, "Selected options should be less than max"); //this is called 4 times
  });

  this.set('max', max);


  this.render(hbs`{{class/analytics/performance/gru-data-picker max=max onOptionsChange='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $dataPicker = $component.find("ul.option-list");
  $dataPicker.find("li:eq(1) a").click();//try select completion option
  $dataPicker.find("li:eq(0) a").click();
  $dataPicker.find("li:eq(2) a").click();
  $dataPicker.find("li:eq(3) a").click();
});

test('Verify that there is at least one selected', function(assert) {
  assert.expect(2);

  this.on('parentAction', function(selectedOptions){
    assert.ok(selectedOptions.get("length") === 1, "Selected options should be equal than min");
  });


  this.render(hbs`{{class/analytics/performance/gru-data-picker onOptionsChange='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $dataPicker = $component.find("ul.option-list");
  $dataPicker.find("li:eq(0) a").click();//try unselected score
  $dataPicker.find("li:eq(1) a").click();//change option


});
test('Verify the option can not be unselected when is readOnly', function(assert) {
  assert.expect(1);

  const options= Ember.A([Ember.Object.create({
    'value': 'score',
    'selected':true,
    'readOnly':true
  }),Ember.Object.create({
    'value': 'completion',
    'selected':true,
    'readOnly':false
  }),Ember.Object.create({
    'value': 'study-time',
    'selected':true,
    'readOnly':false
  }),Ember.Object.create({
    'value': 'reaction',
    'selected':false,
    'readOnly':false
  }),Ember.Object.create({
    'value': 'attempt',
    'selected':false,
    'readOnly':false
  })
    ]);
  const max =3;
  this.set('options', options);
  this.set('max', max);

  this.render(hbs`{{class/analytics/performance/gru-data-picker  options=options max=max}}`);
  var $component = this.$(); //component dom element
  var $dataPicker = $component.find("ul.option-list");
  $dataPicker.find("li:eq(1) a").click();//Select completion
  $dataPicker.find("li:eq(0) a").click();//try unselected score
  const $optionScore = $component.find(".option-list li .score");
  assert.ok($optionScore.hasClass('active'));
});

