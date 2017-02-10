import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';

moduleForComponent('goal/gru-goal-form', 'Integration | Component | goal/gru goal form', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
    this.inject.service('i18n');
  }
});

var mockGoal = Ember.Object.create({
  "id": "goal-id",
  "title": "My Fitness Goal",
  "description": "This is Description to Goal",
  "start_date": 1409175049,
  "end_date": 1409175049,
  "status": "not_started",
  "reflection": "need to do better"
});

test('Create Goal Form Layout', function(assert) {

  this.set('goal', mockGoal);

  this.render(hbs`{{goal.gru-goal-form goal=goal}}`);

  var $component = this.$(); //component dom element

  const $goalFormContainer = $component.find(".gru-goal-form");
  const $panel = $goalFormContainer.find(".panel-form");
  const $form = $panel.find("#createGoalForm");

  T.exists(assert, $goalFormContainer, "Missing goal form section");
  T.exists(assert, $panel, "Missing goal form panel");
  T.exists(assert, $form, "Missing goal form");

  T.exists(assert, $form.find(".icon"), "Missing goal icon title");
  T.exists(assert, $form.find(".gru-input.title"), "Missing goal title field");
  T.exists(assert, $form.find(".form-group.status"), "Missing status select component");
  T.exists(assert, $form.find(".form-group.type"), "Missing type select component");
  T.exists(assert, $form.find(".form-group.start-date"), "Missing datepicker for start date");
  T.exists(assert, $form.find(".form-group.end-date"), "Missing datepicker for end date");
  T.exists(assert, $form.find(".gru-input.reflection"), "Missing reflection field");
  T.exists(assert, $form.find(".create-goal"), "Missing create goal button");
  T.exists(assert, $form.find(".cancel-goal"), "Missing cancel button");

});

test('Update Goal Form Layout', function(assert) {

  this.set('goal', mockGoal);

  this.render(hbs`{{goal.gru-goal-form goal=goal isEditView=true}}`);

  var $component = this.$(); //component dom element

  const $goalFormContainer = $component.find(".gru-goal-form");
  const $panel = $goalFormContainer.find(".panel-form");
  const $form = $panel.find("#createGoalForm");

  T.exists(assert, $goalFormContainer, "Missing goal form section");
  T.exists(assert, $panel, "Missing goal form panel");
  T.exists(assert, $form, "Missing goal form");

  T.exists(assert, $form.find(".icon"), "Missing goal icon title");
  T.exists(assert, $form.find(".gru-input.title"), "Missing goal title field");
  T.exists(assert, $form.find(".form-group.status"), "Missing status select component");
  T.exists(assert, $form.find(".form-group.type"), "Missing type select component");
  T.exists(assert, $form.find(".form-group.start-date"), "Missing datepicker for start date");
  T.exists(assert, $form.find(".form-group.end-date"), "Missing datepicker for end date");
  T.exists(assert, $form.find(".gru-input.reflection"), "Missing reflection field");
  T.exists(assert, $form.find(".update-goal"), "Missing update goal button");
  T.exists(assert, $form.find(".cancel-goal"), "Missing cancel button");

});

test('Goal Form - Create goal', function(assert) {
  assert.expect(1);

  this.set('goal', mockGoal);
  this.on('createGoal', function(){
    assert.ok(true, 'Create Goal action called');
  });

  this.render(hbs`{{goal.gru-goal-form goal=goal onCreate='createGoal'}}`);
  var $component = this.$(); //component dom element

  const $goalFormContainer = $component.find(".gru-goal-form");

  $goalFormContainer.find(".create-goal").click(); //click the button
  return wait();
});

test('Goal Form - Update goal', function(assert) {
  assert.expect(2);

  this.set('goal', mockGoal);
  this.on('update', function(goal){
    assert.ok(true, 'Update Goal action called');
    assert.equal(goal.get("id"), "goal-id", "Wrong id");
  });

  this.render(hbs`{{goal.gru-goal-form goal=goal isEditView=true onUpdate='update'}}`);
  var $component = this.$(); //component dom element

  const $goalFormContainer = $component.find(".gru-goal-form");

  $goalFormContainer.find(".update-goal").click(); //click the button
  return wait();
});

