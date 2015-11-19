import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('player/gru-question-viewer', 'Integration | Component | player/gru question viewer', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }

});

test('Question viewer layout', function (assert) {

  assert.expect(11);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text": "Dummy question text",
      "media": "test.jpg",
      "isOpenEnded": true,
      "hints": []
    });

  this.set('question', question);
  this.render(hbs`{{player/gru-question-viewer question=question}}`);

  var $component = this.$(); //component dom element

  var $questionPanel = $component.find(".question-panel");
  T.exists(assert, $questionPanel, "Missing question panel");
  T.exists(assert, $questionPanel.find("h3"), "Missing question header");
  T.exists(assert, $questionPanel.find(".question span"), "Missing question text");
  T.exists(assert, $questionPanel.find(".question img"), "Missing question media");
  T.exists(assert, $questionPanel.find(".information button.hint"), "Missing hint button");
  T.exists(assert, $questionPanel.find(".information button.explanation"), "Missing explanation button");

  var $answerPanel = $component.find(".answers-panel");
  T.exists(assert, $answerPanel, "Missing answer panel");
  T.exists(assert, $answerPanel.find("h3"), "Missing answer header");
  T.exists(assert, $answerPanel.find(".gru-open-ended"), "Missing open ended question component");
  T.exists(assert, $answerPanel.find(".actions button.save"), "Missing submit button");
  assert.ok($answerPanel.find(".actions button.save").attr("disabled"), "Button should be disabled");

});

test('Question viewer submit button', function (assert) {
  assert.expect(3);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text": "Dummy question text",
      "media": "test.jpg",
      "isOpenEnded": true
    });

  this.set('question', question);
  this.on("mySubmitQuestion", function(question){
    assert.equal(question.get("id"), 10, "Wrong id");
  });
  this.render(hbs`{{player/gru-question-viewer question=question onSubmitQuestion="mySubmitQuestion"}}`);

  var $component = this.$(); //component dom element

  var $answerPanel = $component.find(".answers-panel");
  assert.ok($answerPanel.find(".actions button.save").attr("disabled"), "Button should be disabled");
  var $openEndedComponent = $answerPanel.find(".gru-open-ended");
  $openEndedComponent.find("textarea").val("test");
  $openEndedComponent.find("textarea").change();

  assert.ok(!$answerPanel.find(".actions button.save").attr("disabled"), "Button should not be disabled");

  $answerPanel.find(".actions button.save").click();
});

