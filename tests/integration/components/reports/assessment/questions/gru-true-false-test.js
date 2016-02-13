import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('reports/assessment/questions/gru-true-false', 'Integration | Component | reports/assessment/questions/gru true false', {
  integration: true
});

test('True False Correct Answer', function (assert) {

  var question = Ember.Object.create({
    answers: Ember.A([
      Ember.Object.create({id: "1", isCorrect: false, text: "True"}),
      Ember.Object.create({id: "2", isCorrect: true, text: "False"})
    ])
  });
  var showCorrect = true;
  this.set('question', question);
  this.set('showCorrect', showCorrect);

  this.render(hbs`{{reports/assessment/questions/gru-true-false question=question showCorrect=showCorrect}}`);

  const $component = this.$(); //component dom element
  T.notExists(assert, $component.find('li:nth-child(1) span i'), 'The first answer should dont have selected icon');
  T.exists(assert, $component.find('li:nth-child(2) span.correct'), 'The third answer should have selected icon');
});

test('True False Your Answer Incorrect', function (assert) {

  var question = Ember.Object.create({
    answers: Ember.A([
      Ember.Object.create({id: "1", isCorrect: false, text: "True"}),
      Ember.Object.create({id: "2", isCorrect: true, text: "False"})
    ])
  });
  var userAnswer = "1";
  this.set('question', question);
  this.set('userAnswer', userAnswer);

  this.render(hbs`{{reports/assessment/questions/gru-true-false question=question userAnswer=userAnswer}}`);
  const $component = this.$(); //component dom element
  T.exists(assert, $component.find('li:nth-child(1) span.incorrect'), 'The first answer should have the incorrect icon');
  T.notExists(assert, $component.find('li:nth-child(2) span i'), 'The second answer should dont have selected icon');
});

test('True False Your Answer Correct', function (assert) {

  var question = Ember.Object.create({
    answers: Ember.A([
      Ember.Object.create({id: "1", isCorrect: false, text: "True"}),
      Ember.Object.create({id: "2", isCorrect: true, text: "False"})
    ])
  });
  var userAnswer = "2";
  this.set('question', question);
  this.set('userAnswer', userAnswer);

  this.render(hbs`{{reports/assessment/questions/gru-true-false question=question userAnswer=userAnswer}}`);
  const $component = this.$(); //component dom element
  T.notExists(assert, $component.find('li:nth-child(1) span i'), 'The first answer should dont have selected icon');
  T.exists(assert, $component.find('li:nth-child(2) span.correct'), 'The second answer should have the incorrect icon');
});

test('True False anonymous', function (assert) {

  var question = Ember.Object.create({
    answers: Ember.A([
      Ember.Object.create({id: "1", isCorrect: false, text: "True"}),
      Ember.Object.create({id: "2", isCorrect: true, text: "False"})
    ])
  });
  var userAnswer = "2";
  this.set('question', question);
  this.set('userAnswer', userAnswer);

  this.render(hbs`{{reports/assessment/questions/gru-true-false question=question userAnswer=userAnswer}}`);
  const $component = this.$(); //component dom element
  T.notExists(assert, $component.find('li:nth-child(1) span i'), 'The first answer should dont have selected icon');
  T.exists(assert, $component.find('li:nth-child(2) span.anonymous'), 'The second answer should be anonymous');
});
