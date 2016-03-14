import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gru-question-options', 'Integration | Component | resource options', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('gru-question-options-default', function(assert) {

  const selectedOptionType = 'multiple-choice';

  this.set('selectedOptionType', selectedOptionType);

  this.render(hbs`{{search/gru-question-options selectedOptionType=selectedOptionType}}`); //render the component
  var $component = this.$(); //component dom element

  assert.expect(24); //making sure all asserts are called

  const $menuOptions =$component.find('.options');
  const $multipleChoiceButton =$menuOptions.find('.multiple-choice');
  T.exists(assert, $multipleChoiceButton, "Missing multiple choice button");
  T.exists(assert, $multipleChoiceButton.find('.icon'), "Missing icon multiple choice button");
  assert.equal(T.text($multipleChoiceButton.find('.text')), "Multiple Choice", "Incorrect multiple choice button text");

  const $multipleAnswerButton =$menuOptions.find('.multiple-answer');
  T.exists(assert, $multipleAnswerButton, "Missing multiple answer button");
  T.exists(assert, $multipleAnswerButton.find('.icon'), "Missing icon multiple answer button");
  assert.equal(T.text($multipleAnswerButton.find('.text')), "Multiple Answer", "Incorrect multiple answer button text");

  const $trueFalseButton =$component.find('.true-false');
  T.exists(assert, $trueFalseButton, "Missing true-false button");
  T.exists(assert, $trueFalseButton.find('.icon'), "Missing icon true-false button");
  assert.equal(T.text($trueFalseButton.find('.text')), "True / False", "Incorrect true-false button text");

  const $fibButton =$component.find('.fib');
  T.exists(assert, $fibButton, "Missing fib button");
  T.exists(assert, $fibButton.find('.icon'), "Missing icon fib button");
  assert.equal(T.text($fibButton.find('.text')), "Fill in the Blank", "Incorrect fib button text");

  const $htReorderButton =$component.find('.ht-reorder');
  T.exists(assert, $htReorderButton, "Missing ht-reorder button");
  T.exists(assert, $htReorderButton.find('.icon'), "Missing icon ht-reorder button");
  assert.equal(T.text($htReorderButton.find('.text')), "Hot Text- Reorder", "Incorrect ht-reorder button text");

  const $htHighlightButton =$component.find('.ht-highlight');
  T.exists(assert, $htHighlightButton, "Missing ht-highlight button");
  T.exists(assert, $htHighlightButton.find('.icon'), "Missing icon ht-highlight button");
  assert.equal(T.text($htHighlightButton.find('.text')), "Hot Text- Highlight", "Incorrect ht-highlight button text");

  const $hsTextButton =$component.find('.hs-text');
  T.exists(assert, $hsTextButton, "Missing hs-text button");
  T.exists(assert, $hsTextButton.find('.icon'), "Missing icon hs-text button");
  assert.equal(T.text($hsTextButton.find('.text')), "Hot Spot- Text", "Incorrect hs-text button text");

  const $hsImagestButton =$component.find('.hs-images');
  T.exists(assert, $hsImagestButton, "Missing hs-images button");
  T.exists(assert, $hsImagestButton.find('.icon'), "Missing icon hs-images button");
  assert.equal(T.text($hsImagestButton.find('.text')), "Hot Spot- Image", "Incorrect hs-images button text");

});

test('search-filter-onMultipleChoiceClick', function(assert) {
  assert.expect(1); //making sure all asserts are called

  const selectedOptionType = 'multiple-choice';

  this.set('selectedOptionType', selectedOptionType);

  this.on('selectMenuOption', function(option) {
    assert.equal(option, 'multiple-choice', "Incorrect multiple-choice option type");
  });

  this.render(hbs`{{search/gru-question-options selectedOptionType=selectedOptionType onSelectMenuOption='selectMenuOption'}}`);

  var $component = this.$(); //component dom element

  const $multipleChoiceOptionSelected = $component.find(".multiple-choice.btn-option.selected");
  T.exists(assert, $multipleChoiceOptionSelected, "Missing multiple choice option selected");
});
