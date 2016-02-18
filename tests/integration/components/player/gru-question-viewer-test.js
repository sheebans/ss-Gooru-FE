import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import QuestionResult from 'gooru-web/models/result/question';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('player/gru-question-viewer', 'Integration | Component | player/gru question viewer', {
  integration: true,
  beforeEach: function () {
    this.i18n = this.container.lookup('service:i18n');
    this.i18n.set("locale","en");
  }

});

test('Layout', function (assert) {

  assert.expect(11);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text": "Dummy question text",
      "mediaUrl": "test.jpg",
      "questionType": 'OE',
      "hasMedia": true,
      "hints": []
    });

  const collection = Ember.Object.create({
    collectionType: "assessment",
    resources: Ember.A([question]),
    isLastResource: function(){
      return true;
    }
  });

  const questionResult = QuestionResult.create();

  this.set('questionResult', questionResult);
  this.set('question', question);
  this.set('collection',collection);

  this.render(hbs`{{player/gru-question-viewer question=question questionResult=questionResult collection=collection}}`);

  var $component = this.$(); //component dom element

  var $questionPanel = $component.find(".question-panel");
  T.exists(assert, $questionPanel, "Missing question panel");
  T.exists(assert, $questionPanel.find("h2"), "Missing question header");
  T.exists(assert, $questionPanel.find(".question span"), "Missing question text");
  T.exists(assert, $questionPanel.find(".question img"), "Missing question media");

  var $answerPanel = $component.find(".answers-panel");
  T.exists(assert, $answerPanel, "Missing answer panel");
  T.exists(assert, $answerPanel.find("h2"), "Missing answer header");
  T.exists(assert, $answerPanel.find(".gru-open-ended"), "Missing open ended question component");
  T.exists(assert, $answerPanel.find(".actions button.save"), "Missing submit button");

  const $saveButton = $answerPanel.find(".actions button.save");
  assert.ok($saveButton.attr("disabled"), "Button should be disabled");

  // There will be two question information sections in the page; however, only one will be
  // visible depending on a screen width breakpoint
  var $infoPanel = $component.find(".question-information").eq(0);
  assert.ok($infoPanel.find("button.hint"), "Missing hint button");
  assert.ok($infoPanel.find("button.explanation"), "Missing explanation button");

});

test('Submit button should become enabled and call action on submit', function (assert) {
  assert.expect(5);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text": "Dummy question text",
      "mediaUrl": "test.jpg",
      "questionType": 'OE',
      "hasMedia": true
    });

  const collection = Ember.Object.create({
    collectionType: "assessment",
    resources: Ember.A([question]),
    isLastResource: function(){
      return true;
    }
  });

  const questionResult = QuestionResult.create();

  this.set('questionResult', questionResult);
  this.set('question', question);
  this.set('collection',collection);

  this.on("mySubmitQuestion", function(question, questionResult){
    assert.equal(question.get("id"), 10, "Wrong id");
    assert.equal(questionResult.get("correct"), true, "Answer should be correct");
    assert.equal(questionResult.get("userAnswer"), "test", "Wrong id");
  });
  this.render(hbs`{{player/gru-question-viewer question=question questionResult=questionResult
      onSubmitQuestion="mySubmitQuestion" collection=collection}}`);

  var $component = this.$(); //component dom element

  var $answerPanel = $component.find(".answers-panel");
  assert.ok($answerPanel.find(".actions button.save").attr("disabled"), "Button should be disabled");
  var $openEndedComponent = $answerPanel.find(".gru-open-ended");
  $openEndedComponent.find("textarea").val("test");
  $openEndedComponent.find("textarea").change();

  assert.ok(!$answerPanel.find(".actions button.save").attr("disabled"), "Button should not be disabled");

  $answerPanel.find(".actions button.save").click();
});

test('Clicking on the "Hints" button should display a certain number of hints and then become disabled', function(assert) {

  const question = Ember.Object.create({
      "id": 10,
      "order": 2,
      "text": "Dummy question text",
      "questionType": 'OE',
      "hasMedia": false,
      "hints": [
        {
          hintId: 790,
          hintText: "Hints text 1",
          sequence: 1
        },
        {
          hintId: 791,
          hintText: "Hints text 2",
          sequence: 2
        }
      ]
    });

  const collection = Ember.Object.create({
    collectionType: "assessment",
    resources: Ember.A([question]),
    isLastResource: function(){
      return true;
    }
  });

  const questionResult = QuestionResult.create();

  this.set('questionResult', questionResult);
  this.set('question', question);
  this.set('collection',collection);

  this.render(hbs`{{player/gru-question-viewer question=question questionResult=questionResult collection=collection}}`);

  var $infoSection = this.$(".question-panel").eq(0);
  assert.ok($infoSection.find(".hints"), "Missing hints section");
  assert.equal($infoSection.find(".hints li").length, 0, "No hints should be visible");

  $infoSection.find(".btn-group .hint").click();
  assert.equal($infoSection.find(".hints li").length, 1, "Hint should be displayed");
  assert.equal($infoSection.find(".hints li:first-child").text().trim(), "Hints text 1", "Hint's content is incorrect");
  assert.ok(!$infoSection.find(".btn-group .hint").attr('disabled'), 'Hint button should not be disabled');

  $infoSection.find(".btn-group .hint").click();
  assert.equal($infoSection.find(".hints li").length, 2, "Hints should be displayed");
  assert.equal($infoSection.find(".hints li:last-child").text().trim(), "Hints text 2", "Hint's content is incorrect");
  assert.ok($infoSection.find(".btn-group .hint").attr('disabled'), 'Hint button should be disabled');
});

test('Clicking on the "Explanation" button should display an explanation and then it should become disabled', function(assert) {

  const question = Ember.Object.create({
    "id": 11,
    "order": 2,
    "text": "Dummy question text",
    "questionType": 'OE',
    "hasMedia": false,
    "hints": [],
    "explanation": "<p>This is a test explanation</p>"
  });

  const collection = Ember.Object.create({
    collectionType: "assessment",
    resources: Ember.A([question]),
    isLastResource: function(){
      return true;
    }
  });

  const questionResult = QuestionResult.create();

  this.set('questionResult', questionResult);
  this.set('question', question);
  this.set('collection', collection);
  this.render(hbs`{{player/gru-question-viewer question=question questionResult=questionResult collection=collection}}`);

  var $infoSection = this.$(".question-panel").eq(0);
  assert.ok(!$infoSection.find(".btn-group .explanation").attr('disabled'), 'Explanation button should be enabled');
  assert.ok(!$infoSection.find(" > .explanation").length, "Explanation section should not be visible");

  $infoSection.find(".btn-group .explanation").click();
  assert.ok($infoSection.find("> .explanation").length, 1, "Explanation should be displayed");
  assert.equal($infoSection.find(".panel.explanation .panel-body .explanation p").text().trim(), "This is a test explanation", "Explanation does not display the right content");
  assert.ok($infoSection.find(".btn-group .explanation").attr('disabled'), 'Explanation button should be disabled');
});

test('Save Button Text when assessment and not last resource', function (assert) {

  assert.expect(1);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text": "Dummy question text",
      "mediaUrl": "test.jpg",
      "questionType": 'OE',
      "hasMedia": true,
      "hints": []
    });

  const collection = Ember.Object.create({
    collectionType: "assessment",
    isAssessment: true,
    resources: Ember.A([question]),
    isLastResource: function(){
      return false;
    }
  });

  const questionResult = QuestionResult.create();

  this.set('questionResult', questionResult);
  this.set('question', question);
  this.set('collection',collection);

  this.render(hbs`{{player/gru-question-viewer question=question questionResult=questionResult collection=collection}}`);

  var $component = this.$(); //component dom element
  var $answerPanel = $component.find(".answers-panel");
  const $saveButton = $answerPanel.find(".actions button.save");
  assert.equal(T.text($saveButton), this.i18n.t('common.save-next').toString(), 'Wrong button text');
});

test('Save Button Text when assessment and last resource', function (assert) {

  assert.expect(1);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text": "Dummy question text",
      "mediaUrl": "test.jpg",
      "questionType": 'OE',
      "hasMedia": true,
      "hints": []
    });

  const collection = Ember.Object.create({
    collectionType: "assessment",
    resources: Ember.A([question]),
    isAssessment: true,
    isLastResource: function(){
      return true;
    }
  });

  const questionResult = QuestionResult.create();

  this.set('questionResult', questionResult);
  this.set('question', question);
  this.set('collection',collection);

  this.render(hbs`{{player/gru-question-viewer question=question questionResult=questionResult collection=collection}}`);

  var $component = this.$(); //component dom element
  var $answerPanel = $component.find(".answers-panel");
  const $saveButton = $answerPanel.find(".actions button.save");
  assert.equal(T.text($saveButton), this.i18n.t('common.save-submit').toString(), 'Wrong button text');
});

test('Save Button Text when collection and not last resource', function (assert) {

  assert.expect(1);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text": "Dummy question text",
      "mediaUrl": "test.jpg",
      "questionType": 'OE',
      "hasMedia": true,
      "hints": []
    });

  const collection = Ember.Object.create({
    collectionType: "collection",
    isAssessment: false,
    resources: Ember.A([question]),
    isLastResource: function(){
      return false;
    }
  });

  const questionResult = QuestionResult.create();

  this.set('questionResult', questionResult);
  this.set('question', question);
  this.set('collection',collection);

  this.render(hbs`{{player/gru-question-viewer question=question questionResult=questionResult collection=collection}}`);

  var $component = this.$(); //component dom element
  var $answerPanel = $component.find(".answers-panel");
  const $saveButton = $answerPanel.find(".actions button.save");
  assert.equal(T.text($saveButton), this.i18n.t('common.save-next').toString(), 'Wrong button text');
});

test('Save Button Text when collection and last resource', function (assert) {

  assert.expect(1);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text": "Dummy question text",
      "mediaUrl": "test.jpg",
      "questionType": 'OE',
      "hasMedia": true,
      "hints": []
    });

  const collection = Ember.Object.create({
    collectionType: "collection",
    isAssessment: false,
    resources: Ember.A([question]),
    isLastResource: function(){
      return true;
    }
  });

  const questionResult = QuestionResult.create();

  this.set('questionResult', questionResult);
  this.set('question', question);
  this.set('collection',collection);

  this.render(hbs`{{player/gru-question-viewer question=question questionResult=questionResult collection=collection}}`);

  var $component = this.$(); //component dom element
  var $answerPanel = $component.find(".answers-panel");
  const $saveButton = $answerPanel.find(".actions button.save");
  assert.equal(T.text($saveButton), this.i18n.t('common.save-finish').toString(), 'Wrong button text');
});

test('Submit button disabled when submitted', function (assert) {
  assert.expect(1);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text": "Dummy question text",
      "mediaUrl": "test.jpg",
      "questionType": 'OE',
      "hasMedia": true
    });

  const collection = Ember.Object.create({
    collectionType: "assessment",
    resources: Ember.A([question]),
    isLastResource: function(){
      return true;
    }
  });

  const questionResult = QuestionResult.create();

  this.set('questionResult', questionResult);
  this.set('question', question);
  this.set('collection',collection);

  this.render(hbs`{{player/gru-question-viewer question=question questionResult=questionResult
      submitted=true collection=collection}}`);

  var $component = this.$(); //component dom element

  var $answerPanel = $component.find(".answers-panel");
  assert.ok($answerPanel.find(".actions button.save").attr("disabled"), "Button should be disabled");
});

