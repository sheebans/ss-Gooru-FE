import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/questions/gru-hs-image', 'Integration | Component | player/questions/gru hs image', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
  }
});


test('Layout', function (assert) {

  const question = Ember.Object.create(
    {
      "assetBasePath": "http://test-base-path/",
      "isHotSpotImage": true,
      "answers": [
        Ember.Object.create(
          {
            "id": 1,
            "text": "test-1.png"
          }),
        Ember.Object.create(
          {
            "id": 2,
            "text": "test-2.png"
          }),
        Ember.Object.create(
          {
            "id": 3,
            "text": "test-3.png"
          })
      ]
    });

  this.set('question', question);

  this.render(hbs`{{player/questions/gru-hs-image question=question}}`);

  const $component = this.$(); //component dom element
  const $answersContainer = $component.find('.answer-choices');

  assert.ok($component.find(".instructions"), "Missing instructions");
  assert.equal($answersContainer.find("li.answer").length, 3, "Incorrect number of answer choices");

  assert.equal($answersContainer.find("li.answer:first-child").data('id'), 1, "First answer choice, data-id value is incorrect");
  assert.equal($answersContainer.find("li.answer:first-child img").prop('src'), "http://test-base-path/test-1.png", "First image path is not set correctly");
  assert.equal($answersContainer.find("li.answer:last-child").data('id'), 3, "Last answer choice, data-id value is incorrect");
  assert.equal($answersContainer.find("li.answer:last-child img").prop('src'), "http://test-base-path/test-3.png", "Last image path is not set correctly");
});

test('Selecting answers', function (assert) {

  const question = Ember.Object.create(
    {
      "assetBasePath": "",
      "isHotSpotImage": true,
      "answers": [
        Ember.Object.create(
          {
            "id": 1,
            "text": "test-1.png"
          }),
        Ember.Object.create(
          {
            "id": 2,
            "text": "test-2.png"
          })
      ]
    });

  this.set('question', question);

  this.render(hbs`{{player/questions/gru-hs-image question=question}}`);

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
      "assetBasePath": "",
      "isHotSpotImage": true,
      "answers": [
        Ember.Object.create(
          {
            "id": 1,
            "text": "test-1.png"
          }),
        Ember.Object.create(
          {
            "id": 2,
            "text": "test-2.png"
          }),
        Ember.Object.create(
          {
            "id": 3,
            "text": "test-3.png"
          }),
        Ember.Object.create(
          {
            "id": 4,
            "text": "test-4.png"
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

  this.render(hbs`{{player/questions/gru-hs-image question=question
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
