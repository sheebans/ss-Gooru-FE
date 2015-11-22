import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/gru-viewer', 'Integration | Component | player/gru viewer', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
  }
});

test('On question submit', function (assert) {
  assert.expect(3);

  const resource = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text": "Dummy resource text",
      "media": "test.jpg",
      "isQuestion": true,
      "questionType": 'OE'
    });

  this.set('resource', resource);
  this.on("mySubmitQuestion", function(question){
    assert.equal(question.get("id"), 10, "Wrong id");
  });
  this.render(hbs`{{player/gru-viewer resource=resource onSubmitQuestion="mySubmitQuestion"}}`);

  var $component = this.$(); //component dom element

  var $answerPanel = $component.find(".answers-panel");
  assert.ok($answerPanel.find(".actions button.save").attr("disabled"), "Button should be disabled");
  var $openEndedComponent = $answerPanel.find(".gru-open-ended");
  $openEndedComponent.find("textarea").val("test");
  $openEndedComponent.find("textarea").change();

  assert.ok(!$answerPanel.find(".actions button.save").attr("disabled"), "Button should not be disabled");

  $answerPanel.find(".actions button.save").click();
});

test('Narration', function (assert) {


  assert.expect(3);

  const resourceMockA = Ember.Object.create({
    id: 1,
    'name': 'Resource #3',
    'type': 'question',
    narration: 'Some narration message here',
    owner: {
      avatarUrl: '76514d68-5f4b-48e2-b4bc-879b745f3d70.png'
    },
    hasNarration: true,
    hasOwner: true
  });

  this.set("resource", resourceMockA);

  this.render(hbs`{{player/gru-viewer resource=resource}}`);

  var $component = this.$(); //component dom element
  const $gruViewer = $component.find(".gru-viewer");
  T.exists(assert, $gruViewer, "Missing narration section");
  T.exists(assert, $gruViewer.find(".narration img.avatar"), "Missing autor image");
  T.exists(assert, $gruViewer.find(".narration .message"), "Missing narration");
});
