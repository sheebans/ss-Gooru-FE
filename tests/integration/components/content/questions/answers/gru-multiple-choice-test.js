import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('content/questions/answers/gru-multiple-choice', 'Integration | Component | content/questions/answers/gru multiple choice', {
  integration: true
});

test('Multiple choice answer layout', function(assert) {
  this.render(hbs`{{content/questions/answers/gru-multiple-choice}}`);
  var $component = this.$(); //component dom element
  const $newAnswer = $component.find('.panel.add-answer');
  assert.ok($newAnswer.length, "Add new answer choice button missing");
  $newAnswer.click();
  return wait().then(function () {
    const $option = $component.find('.multiple-choice');
    assert.ok($option.length, "New answer missing");
    assert.ok($option.find('.letter-container'), "Answer letter missing");
    assert.ok($option.find('.delete i.delete'), "Delete button missing");
    assert.ok($option.find('.check'), "Correct  button missing");
    const $check = $component.find('.check');
    $check.click();
    return wait().then(function () {
      assert.ok($option.find('.check.correct'), "The answer should be correct");
    });
  });
});
