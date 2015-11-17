import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('player/questions/gru-multiple-choice', 'Integration | Component | player/questions/gru multiple choice', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
  }

});

test('Multiple choice question layout', function (assert) {

  assert.expect(7);

  const question = Ember.Object.create(
    {
      "id": 10,
      "answers": [
        {
          "id": 1,
          "answerText": "An aquifer",
          "answerType": "text",
          "isCorrect": true,
          "sequence": 1
        },
        {
          "id": 2,
          "answerText": "A well",
          "answerType": "text",
          "isCorrect": false,
          "sequence": 2
        },
        {
          "aid": 3,
          "answerText": "A pump",
          "answerType": "text",
          "isCorrect": false,
          "sequence": 3
        }
      ],
      "order": 2
    });

  this.set('question', question);
  this.on('myOnAnswerChanged', function(question, answerId) {
    //todo check for selected answer
    assert.equal(question.get("id"), 10, "Wrong question id");
    assert.equal(answerId, 2, "Wrong answer id");
  });

  this.on('myOnAnswerCompleted', function(question, answerId) {
    //todo check for selected answer
    assert.equal(question.get("id"), 10, "Wrong question id");
    assert.equal(answerId, 2, "Wrong answer id");
  });

  this.render(hbs`{{player/questions/gru-multiple-choice question=question
        onAnswerChanged="myOnAnswerChanged" onAnswerCompleted="myOnAnswerCompleted"}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find(".instructions"), "Missing instructions");
  assert.equal($component.find(".answer-choices .radio").length, 3, "Missing answer choices");
  assert.equal($component.find(".answer-choices .radio input[type=radio]").length, 3, "Missing answer choices radio inputs");

  //select a radio button
  $component.find(".answer-choices .radio input[type=radio]:eq(1)").click();

});
