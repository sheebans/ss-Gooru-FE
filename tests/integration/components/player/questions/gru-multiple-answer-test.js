import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('player/questions/gru-multiple-answer', 'Integration | Component | player/questions/gru multiple answer', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
  }
});

test('Multiple answer question layout', function (assert) {

  assert.expect(6);

  const question = Ember.Object.create(
    {
      "id": 10,
      "answers": [
        {
          "id": 1,
          "text": "<p>An aquifer</p>",
          "answerType": "text",
          "isCorrect": true,
          "sequence": 1
        },
        {
          "id": 2,
          "text": "<p>A well</p>",
          "answerType": "text",
          "isCorrect": false,
          "sequence": 2
        },
        {
          "id": 3,
          "text": "<p>A pump</p>",
          "answerType": "text",
          "isCorrect": false,
          "sequence": 3
        }
      ],
      "order": 2
    });

  this.set('question', question);

  this.render(hbs`{{player/questions/gru-multiple-answer question=question}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find(".instructions"), "Missing instructions");
  assert.equal($component.find(".answer-choices tbody tr").length, 3, "Missing answer choices");
  assert.equal($component.find(".answer-choices tr input[type=radio]").length, 6, "Missing answer choices radio inputs");
  assert.equal(T.text($component.find(".answer-choices tbody tr:eq(0) td:eq(2) p")), "An aquifer", "Incorrect Message");
  assert.equal(T.text($component.find(".answer-choices tbody tr:eq(1) td:eq(2) p")), "A well", "Incorrect Message");
  assert.equal(T.text($component.find(".answer-choices tbody tr:eq(2) td:eq(2) p")), "A pump", "Incorrect Message");
});


test('Multiple answer question events', function (assert) {

  assert.expect(4);

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
          "id": 3,
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
    assert.ok(answerId, "Missing answer id"); //this should be called 3 times
  });

  this.on('myOnAnswerCompleted', function(question, answerId) {
    assert.equal(answerId, 'yes-3', "Wrong answer id"); //the answer is completed by clicking on answer id 3
  });

  this.render(hbs`{{player/questions/gru-multiple-answer question=question
        onAnswerChanged="myOnAnswerChanged" onAnswerCompleted="myOnAnswerCompleted"}}`);

  var $component = this.$(); //component dom element

  //select a radio button
  $component.find(".answer-choices tbody tr:eq(0) input[type=radio]:eq(0)").click(); //Yes
  $component.find(".answer-choices tbody tr:eq(1) input[type=radio]:eq(0)").click(); //Yes
  $component.find(".answer-choices tbody tr:eq(2) input[type=radio]:eq(0)").click(); //Yes

});
