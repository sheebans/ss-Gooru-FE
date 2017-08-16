import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent(
  'grading/gru-task-header',
  'Integration | Component | grading/gru-task header',
  {
    integration: true
  }
);

test('Layout', function(assert) {
  this.render(hbs`{{grading/gru-task-header promptText='prompt text'}}`);

  let $component = this.$();
  let $questionText = $component.find('.question-text');
  let $promptTitle = $questionText.find('.title');
  let $promptText = $questionText.find('.prompt-text');

  T.exists(assert, $component.find('.icon'), 'Missing icon');
  T.exists(assert, $questionText, 'Missing question text');
  T.exists(assert, $promptTitle, 'Missing prompt title');
  T.exists(assert, $promptText, 'Missing prompt text');
  assert.ok(
    T.text($promptText).includes('prompt text'),
    'Wrong text in prompt text'
  );
});
