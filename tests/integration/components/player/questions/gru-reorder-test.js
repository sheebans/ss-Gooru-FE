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

  let question = Ember.Object.create({
    "id": "569906aadfa0072204f7c7c7",
    questionType: 'HT_RO',
    text: 'Reorder Question',
    hints: [],
    explanation: 'Sample explanation text',
    answers: Ember.A([ // ["crc", "bra", "pan", "chi"]
      Ember.Object.create({id: "1", text: "An aquifer", order: 1}),
      Ember.Object.create({id: "2", text: "A well", order: 2}),
      Ember.Object.create({id: "3", text: "A pump", order: 3})
    ]),
    "resourceType": "assessment-question",
    "resourceFormat": "question",
    "order": 3,
    "hasAnswers": true
  });

  this.set('question', question);

  this.render(hbs`{{player/questions/gru-reorder question=question}}`);

  var $component = this.$(); //component dom element

  assert.ok($component.find(".instructions"), "Missing instructions");
  assert.equal($component.find(".sortable li").length, 3, "Incorrect number of answer choices");
  assert.ok($component.find(".sortable li:first-child").hasClass("ui-sortable-handle"), "Class added by sortable plugin is missing");
  assert.equal($component.find(".sortable li:first-child div").text().trim(), "An aquifer", "First answer choice does not have the right text");
  assert.equal($component.find(".sortable li:first-child").data('id'), 1, "First answer choice, data-id value is incorrect");
  assert.equal($component.find(".sortable li:last-child div").text().trim(), "A pump", "Last answer choice does not have the right text");
  assert.equal($component.find(".sortable li:last-child").data('id'), 3, "Last answer choice, data-id value is incorrect");
});

test('Notifications work after reordering questions', function (assert) {


  let question = Ember.Object.create({
    "id": "569906aadfa0072204f7c7c7",
    questionType: 'HT_RO',
    text: 'Reorder Question',
    hints: [],
    explanation: 'Sample explanation text',
    answers: Ember.A([ // ["crc", "bra", "pan", "chi"]
      Ember.Object.create({id: "aquifer", text: "An aquifer", order: 3}),
      Ember.Object.create({id: "well", text: "A well", order: 2}),
      Ember.Object.create({id: "pump", text: "A pump", order: 1})
    ]),
    "resourceType": "assessment-question",
    "resourceFormat": "question",
    "order": 3,
    "hasAnswers": true
  });

  var answers = [];

  this.set('question', question);

  this.on('changeAnswer', function (question, stats) {
    //called 2 times
    assert.deepEqual(stats, answers, "Answer changed, but the answers are not in the correct order");
  });

  this.on('completeAnswer', function (question, stats) {
    //called 2 times
    assert.deepEqual(stats, answers, "Answer completed, but the answers are not in the correct order");
  });

  this.render(hbs`{{player/questions/gru-reorder question=question
                    onAnswerChanged="changeAnswer"
                    onAnswerCompleted="completeAnswer"}}`);

  var $component = this.$(); //component dom element

  assert.equal($component.find(".sortable li:first-child").data('id'), "pump", "First answer choice, data-id value is incorrect");
  assert.equal($component.find(".sortable li:last-child").data('id'), "aquifer", "Last answer choice, data-id value is incorrect");

  // Move first item to be the last
  $component.find('.sortable li:first-child')
    .insertAfter('.sortable li:last-child');

  answers = { answer: ["well", "aquifer", "pump"], correct: false };
  $component.find('.sortable').trigger('sortupdate');

  // Move current first item to be the second one
  $component.find('.sortable li:first-child')
    .insertBefore('.sortable li:last-child');
  answers = { answer: ["aquifer", "well", "pump"], correct: false };
  $component.find('.sortable').trigger('sortupdate');

});

test('Reorder question layout - read only', function (assert) {

  let question = Ember.Object.create({
    "id": "569906aadfa0072204f7c7c7",
    questionType: 'HT_RO',
    text: 'Reorder Question',
    hints: [],
    explanation: 'Sample explanation text',
    answers: Ember.A([ // ["crc", "bra", "pan", "chi"]
      Ember.Object.create({id: "1", text: "An aquifer", order: 1}),
      Ember.Object.create({id: "2", text: "A well", order: 2}),
      Ember.Object.create({id: "3", text: "A pump", order: 3})
    ]),
    "resourceType": "assessment-question",
    "resourceFormat": "question",
    "order": 3,
    "hasAnswers": true
  });

  this.set('question', question);

  this.render(hbs`{{player/questions/gru-reorder question=question readOnly=true}}`);

  var $component = this.$(); //component dom element
  assert.equal($component.find(".sortable.disabled").length, 1, "Sortable should be disabled");
});
