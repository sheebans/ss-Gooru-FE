import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('reports/assessment/gru-questions', 'Integration | Component | reports/assessment/gru questions', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Questions Layout', function (assert) {
  assert.expect(16);

  const questions = Ember.A([Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 1"
    }),
    correct: true,
    timeSpent: 10, //seconds
    reaction: 5,
    order: 1,
    answer: "answer"
  }), Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 2"
    }),
    correct: false,
    timeSpent: 25, //seconds
    reaction: 2,
    order: 2,
    answer: "answer"
  })]);

  this.set('questions', questions);
  this.render(hbs`{{reports/assessment/gru-questions questions=questions}}`);
  const $component = this.$(); //component dom element
  const $question = $component.find(".gru-questions");

  T.exists(assert, $question, 'Missing questions component');
  T.exists(assert, $question.find('.title h2'), 'Missing questions title');
  T.exists(assert, $question.find('.switch-section'), 'Missing switch section');
  T.exists(assert, $question.find('table th.header.number'), 'Missing number header');
  T.exists(assert, $question.find('table th.header.question'), 'Missing question header');
  T.exists(assert, $question.find('table th.header.answer'), 'Missing answer header');
  T.exists(assert, $question.find('table th.header.score'), 'Missing score header');
  T.exists(assert, $question.find('table th.header.time-spent'), 'Missing time spent header');
  T.exists(assert, $question.find('table thead th.header.reaction'), 'Missing reaction header');
  T.exists(assert, $question.find('table tbody td.number-question'), 'Missing number column');
  T.exists(assert, $question.find('table tbody td.question-text'), 'Missing text column');
  T.exists(assert, $question.find('table tbody td.question-answer'), 'Missing answer column');
  T.exists(assert, $question.find('table tbody td.question-score'), 'Missing score column');
  T.exists(assert, $question.find('table tbody td.question-time'), 'Missing time spent column');
  T.exists(assert, $question.find('table tbody td.question-reaction'), 'Missing reaction column');
  assert.equal($question.find('table tbody tr').length,2, "Incorrect number of rows");
});

