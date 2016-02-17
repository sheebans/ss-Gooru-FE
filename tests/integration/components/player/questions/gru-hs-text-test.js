import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/questions/gru-hs-text', 'Integration | Component | player/questions/gru hs text', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
  }
});

test('Layout', function (assert) {

  const question = Ember.Object.create(
    {
      "answers": [
        Ember.Object.create(
          {
            "id": 1,
            "text": "Banana"
          }),
        Ember.Object.create(
          {
            "id": 2,
            "text": "Orange"
          }),
        Ember.Object.create(
          {
            "id": 3,
            "text": "Apple"
          }),
        Ember.Object.create(
          {
            "id": 4,
            "text": "Watermelon"
          })
      ]
    });

  this.set('question', question);

  this.render(hbs`{{player/questions/gru-hs-text question=question}}`);

  const $component = this.$(); //component dom element
  const $answersContainer = $component.find('.answer-choices');

  assert.ok($component.find(".instructions"), "Missing instructions");
  assert.equal($answersContainer.find("li.answer").length, 4, "Incorrect number of answer choices");

  assert.equal($answersContainer.find("li.answer:first-child").data('id'), 1, "First answer choice, data-id value is incorrect");
  assert.equal($answersContainer.find("li.answer:first-child span").text().trim(), "Banana", "First answer choice does not have the right text");
  assert.equal($answersContainer.find("li.answer:last-child").data('id'), 4, "Last answer choice, data-id value is incorrect");
  assert.equal($answersContainer.find("li.answer:last-child span").text().trim(), "Watermelon", "Last answer choice does not have the right text");
});

test('Selecting answers', function (assert) {

  const question = Ember.Object.create(
    {
      "answers": [
        Ember.Object.create(
          {
            "id": 1,
            "text": "Banana"
          }),
        Ember.Object.create(
          {
            "id": 2,
            "text": "Orange"
          })
      ]
    });

  this.set('question', question);

  this.render(hbs`{{player/questions/gru-hs-text question=question}}`);

  const $answers = this.$('li.answer');
  const $firstAnswer = $answers.eq(0);
  const $secondAnswer = $answers.eq(1);

  assert.equal(this.$('li.selected').length, 0, 'Initial number of answers selected is incorrect');

  $firstAnswer.click();
  assert.ok($firstAnswer.hasClass('selected'), 'First answer should have been selected');

  $secondAnswer.click();
  assert.ok($secondAnswer.hasClass('selected'), 'Second answer should have been selected');
  assert.equal(this.$('li.selected').length, 2, 'Incorrect number of answers selected');

  $firstAnswer.click();
  assert.ok(!$firstAnswer.hasClass('selected'), 'First answer should have been deselected');
  assert.equal(this.$('li.selected').length, 1, 'Incorrect number of answers selected');

  $secondAnswer.click();
  assert.ok(!$secondAnswer.hasClass('selected'), 'Second answer should have been deselected');
  assert.equal(this.$('li.selected').length, 0, 'Incorrect number of answers selected');
});

test('Notifications work after selecting questions', function (assert) {

  var answers = [];
  const question = Ember.Object.create(
    {
      "answers": [
        Ember.Object.create(
          {
            "id": 1,
            "text": "Banana"
          }),
        Ember.Object.create(
          {
            "id": 2,
            "text": "Orange"
          }),
        Ember.Object.create(
          {
            "id": 3,
            "text": "Apple"
          }),
        Ember.Object.create(
          {
            "id": 4,
            "text": "Watermelon"
          })
      ]
    });

  this.set('question', question);

  this.on('changeAnswer', function (question, answerArray) {
    assert.deepEqual(answerArray, answers, "Answer changed, but the answers are not correct");
  });

  this.on('completeAnswer', function (question, answerArray) {
    assert.deepEqual(answerArray, answers, "Answer completed, but the answers are not correct");
  });

  this.on('clearAnswer', function (question, answerArray) {
    assert.deepEqual(answerArray, [], "Answer cleared, but the answers are not correct");
  });

  this.render(hbs`{{player/questions/gru-hs-text question=question
                    onAnswerChanged="changeAnswer"
                    onAnswerCompleted="completeAnswer"
                    onAnswerCleared="clearAnswer" }}`);

  const $answers = this.$('li.answer');

  // Select first answer
  answers = [1];
  $answers.eq(0).click();

  answers = [1, 3];
  $answers.eq(2).click();

  // Three answers selected
  answers = [1, 3, 4];
  $answers.eq(3).click();

  // Now, test deselecting all answers
  answers = [1, 4];
  $answers.eq(2).click();

  answers = [4];
  $answers.eq(0).click();

  // Send onAnswerCleared notification
  $answers.eq(3).click();
});
