import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/questions/gru-reorder', 'Integration | Component | player/questions/gru reorder', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
  }
});

test('Reorder question layout', function (assert) {

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

  this.render(hbs`{{player/questions/gru-reorder question=question}}`);

  var $component = this.$(); //component dom element

  assert.ok($component.find(".instructions"), "Missing instructions");
  assert.equal($component.find(".sortable li").length, 3, "Incorrect number of answer choices");
  assert.ok($component.find(".sortable li:first-child").hasClass("ui-sortable-handle"), "Class added by sortable plugin is missing");
  assert.equal($component.find(".sortable li:first-child").text().trim(), "An aquifer", "First answer choice does not have the right text");
  assert.equal($component.find(".sortable li:first-child").data('id'), 1, "First answer choice, data-id value is incorrect");
  assert.equal($component.find(".sortable li:last-child").text().trim(), "A pump", "Last answer choice does not have the right text");
  assert.equal($component.find(".sortable li:last-child").data('id'), 3, "Last answer choice, data-id value is incorrect");
});

test('Notifications works after reordering questions', function (assert) {

  var answerOrder = null;
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

  this.on('changeAnswer', function(question, answerArray) {
    assert.deepEqual(answerArray, answerOrder, "Answer changed, but the answers are not in the correct order");
  });

  this.on('completeAnswer', function(question, answerArray) {
    assert.deepEqual(answerArray, answerOrder, "Answer completed, but the answers are not in the correct order");
  });

  this.render(hbs`{{player/questions/gru-reorder question=question
                    onAnswerChanged="changeAnswer"
                    onAnswerCompleted="completeAnswer"}}`);

  var $component = this.$(); //component dom element

  assert.equal($component.find(".sortable li:first-child").data('id'), 1, "First answer choice, data-id value is incorrect");
  assert.equal($component.find(".sortable li:last-child").data('id'), 3, "Last answer choice, data-id value is incorrect");

  // Move first item to be the last
  $component.find('.sortable li:first-child')
            .insertAfter('.sortable li:last-child');
  answerOrder = [2, 3, 1];
  $component.find('.sortable').trigger('sortupdate');

  // Move current first item to be the second one
  $component.find('.sortable li:first-child')
    .insertBefore('.sortable li:last-child');
  answerOrder = [3, 2, 1];
  $component.find('.sortable').trigger('sortupdate');

});
