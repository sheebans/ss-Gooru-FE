import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('reports/assessment/questions/gru-multiple-choice', 'Integration | Component | reports/assessment/questions/gru multiple choice', {
  integration: true
});

test('Multiple Choice Correct Answer', function(assert) {

  var question = Ember.Object.create({
    answers: Ember.A([
      Ember.Object.create({ id: "1", isCorrect: false,text:"Answer 1" }),
      Ember.Object.create({ id: "2", isCorrect: false,text:"Answer 2" }),
      Ember.Object.create({ id: "3", isCorrect: true,text:"Answer 3" })
    ])
  });
  var showCorrect = true;
  this.set('question', question);
  this.set('showCorrect', showCorrect);
  this.render(hbs`{{reports/assessment/questions/gru-multiple-choice question=question showCorrect=showCorrect}}`);
  const $component = this.$(); //component dom element
  const $multipleChoice = $component.find(".reports.assessment.questions.gru-multiple-choice");

  T.exists(assert, $multipleChoice, 'Missing multiple choice component');
  T.notExists(assert, $multipleChoice.find('li:nth-child(1) span i'), 'The first answer should dont have selected icon');
  T.notExists(assert, $multipleChoice.find('li:nth-child(2) span i'), 'The second answer should dont have selected icon');
  T.exists(assert, $multipleChoice.find('li:nth-child(3) span.correct'), 'The third answer should have selected icon');
});

test('Multiple Choice Your Answer Incorrect', function(assert) {

  var question = Ember.Object.create({
    answers: Ember.A([
      Ember.Object.create({ id: "1", isCorrect: false,text:"Answer 1" }),
      Ember.Object.create({ id: "2", isCorrect: false,text:"Answer 2" }),
      Ember.Object.create({ id: "3", isCorrect: true,text:"Answer 3" })
    ])
  });
  var userAnswer = "1";
  this.set('question', question);
  this.set('userAnswer', userAnswer);

  this.render(hbs`{{reports/assessment/questions/gru-multiple-choice question=question userAnswer=userAnswer}}`);
  const $component = this.$(); //component dom element
  const $multipleChoice = $component.find(".reports.assessment.questions.gru-multiple-choice");
  T.exists(assert, $multipleChoice, 'Missing multiple choice component');
  T.exists(assert, $multipleChoice.find('li:nth-child(1) span.incorrect'), 'The first answer should have the incorrect icon');
  T.notExists(assert, $multipleChoice.find('li:nth-child(2) span i'), 'The second answer should dont have selected icon');
  T.notExists(assert, $multipleChoice.find('li:nth-child(3) span i'), 'The third answer should dont have selected icon');
});

test('Multiple Choice Your Answer Correct', function(assert) {

  var question = Ember.Object.create({
    answers: Ember.A([
      Ember.Object.create({ id: "1", isCorrect: false,text:"Answer 1" }),
      Ember.Object.create({ id: "2", isCorrect: false,text:"Answer 2" }),
      Ember.Object.create({ id: "3", isCorrect: true,text:"Answer 3" })
    ])
  });
  var userAnswer = "3";
  this.set('question', question);
  this.set('userAnswer', userAnswer);

  this.render(hbs`{{reports/assessment/questions/gru-multiple-choice question=question userAnswer=userAnswer}}`);
  const $component = this.$(); //component dom element
  const $multipleChoice = $component.find(".reports.assessment.questions.gru-multiple-choice");
  T.exists(assert, $multipleChoice, 'Missing multiple choice component');
  T.notExists(assert, $multipleChoice.find('li:nth-child(1) span i'), 'The first answer should dont have selected icon');
  T.notExists(assert, $multipleChoice.find('li:nth-child(2) span i'), 'The second answer should dont have selected icon');
  T.exists(assert, $multipleChoice.find('li:nth-child(3) span.correct'), 'The third answer should have the correct icon');
});

test('Multiple Choice anonymous', function(assert) {

  var question = Ember.Object.create({
    answers: Ember.A([
      Ember.Object.create({ id: "1", isCorrect: false,text:"Answer 1" }),
      Ember.Object.create({ id: "2", isCorrect: false,text:"Answer 2" }),
      Ember.Object.create({ id: "3", isCorrect: true,text:"Answer 3" })
    ])
  });
  var userAnswer = "3";
  this.set('question', question);
  this.set('userAnswer', userAnswer);

  this.render(hbs`{{reports/assessment/questions/gru-multiple-choice question=question userAnswer=userAnswer anonymous=true}}`);
  const $component = this.$(); //component dom element
  const $multipleChoice = $component.find(".reports.assessment.questions.gru-multiple-choice");
  T.exists(assert, $multipleChoice, 'Missing multiple choice component');
  T.exists(assert, $multipleChoice.find('li:nth-child(3) span.anonymous'), 'The third answer is anonymous');
});
