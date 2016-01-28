import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('reports/assessment/questions/gru-hot-text-highlight', 'Integration | Component | reports/assessment/questions/gru-hot-text-highlight', {
  integration: true
});

test('Hot Text Highlight User Answer', function(assert) {
  var question= Ember.Object.create({
    questionType: 'HT_HL',
    text: '<p>Seleccione las palabras escritas incorrectamente</p>',
    hints: [],
    explanation: 'Sample explanation text',
    answers:  Ember.A(["<p>[Le] casa es de [colo] rojo pero pero el [teco] es azul ajax</p>"]),
    order: 2
  });
  var userAnswer = Ember.A(["<p>[Le] casa es de colo rojo pero [pero] el [teco] es azul [ajax]</p>"]);
  this.set('question', question);
  this.set('userAnswer', userAnswer);

  this.render(hbs`{{reports/assessment/questions/gru-hot-text-highlight question=question userAnswer=userAnswer}}`);
  const $component = this.$(); //component dom element
  const $ht_hl = $component.find(".reports.assessment.questions.gru-hot-text-highlight");

  T.exists(assert, $ht_hl, 'Missing  component');
  const $firstAnswer= $ht_hl.find('span.isCorrect:eq(0)');
  T.exists(assert,$firstAnswer , 'There are no correct answers, there should be 2');

  assert.equal(T.text($firstAnswer), "Le", "Incorrect first correct answer");

  const $firstIncorrectAnswer= $ht_hl.find('span.isIncorrect:eq(0)');
  T.exists(assert,$firstIncorrectAnswer , 'There are no correct answers, there should be 2');

  assert.equal(T.text($firstIncorrectAnswer), "pero", "Incorrect first incorrect answer");
});

test('Hot Text Highlight User Answer', function(assert) {
  var question= Ember.Object.create({
    questionType: 'HT_HL',
    text: '<p>Seleccione las palabras escritas incorrectamente</p>',
    hints: [],
    explanation: 'Sample explanation text',
    answers:  Ember.A(["<p>La casa es de [colo] rojo pero el [teco] es azul </p>"]),
    order: 2
  });
  this.set('question', question);
  this.set('showCorrect', true);

  this.render(hbs`{{reports/assessment/questions/gru-hot-text-highlight question=question showCorrect=showCorrect}}`);
  const $component = this.$(); //component dom element
  const $ht_hl = $component.find(".reports.assessment.questions.gru-hot-text-highlight");

  T.exists(assert, $ht_hl, 'Missing  component');
  const $firstAnswer= $ht_hl.find('span.isCorrect:eq(0)');
  T.exists(assert,$firstAnswer , 'There are no correct answers, there should be 2');

  assert.equal(T.text($firstAnswer), "colo", "Incorrect first correct answer");

  const $firstIncorrectAnswer= $ht_hl.find('span.isCorrect:eq(1)');
  T.exists(assert,$firstIncorrectAnswer , 'There are no correct answers, there should be 2');

  assert.equal(T.text($firstIncorrectAnswer), "teco", "Incorrect second correct answer");

  T.notExists(assert, $ht_hl.find('span.isIncorrect'), 'There should not be incorrect answers at all');
});
