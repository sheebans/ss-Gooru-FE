import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('player/gru-question-viewer', 'Integration | Component | player/gru question viewer', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }

});

//test('Hints and Explanation', function(assert) {
//
//  assert.expect(2);
//  const question = Ember.Object.create(
//    {
//      "id": 10,
//      "answers": [
//        {
//          "id": 1,
//          "answerText": "An aquifer",
//          "answerType": "text",
//          "isCorrect": true,
//          "sequence": 1
//        },
//        {
//          "id": 2,
//          "answerText": "A well",
//          "answerType": "text",
//          "isCorrect": false,
//          "sequence": 2
//        },
//        {
//          "id": 3,
//          "answerText": "A pump",
//          "answerType": "text",
//          "isCorrect": false,
//          "sequence": 3
//        }
//      ],
//      "order": 2,
//      "hints": ["hints test 1","hints test 2"],
//      "explanation": "This is a explanation for test"
//    });
//
//  this.set('question', question);
//  this.render(hbs`{{player/gru-question-viewer question=question}}`);
//
//  var $component = this.$(); //component dom element
//  var $hints = $component.find(".information .hints-description");
//  T.exists(assert, $hints, "Missing hints section");
//  $hints.click();
//  assert.equal($component.find(".hints-description p").length, 1, "Missing hints");
//  //andThen(function(){
//  //  $hints.click();
//  //  andThen(function(){
//  //    assert.equal($component.find(".hints-description p").length, 2, "Missing hints");
//  //    var $explanations = $component.find(".information .explanation-description");
//  //    $explanations.click();
//  //    andThen(function(){
//  //      assert.equal($component.find(".explanation-description p").length, 1, "Missing explanation");
//  //    });
//  //  });
//  //});
//});
