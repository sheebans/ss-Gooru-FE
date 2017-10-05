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

test('Layout without thumbnail', function(assert) {
  this.render(
    hbs`{{grading/gru-task-header promptText='prompt text' promptTitle='prompt title'}}`
  );

  let $component = this.$();
  let $questionText = $component.find('.question-text');
  let $promptTitle = $questionText.find('.title');
  let $promptText = $questionText.find('.prompt-text');
  let $promptThumbnail = $questionText.find('.prompt-thumbnail');

  T.exists(assert, $component.find('.icon'), 'Missing icon');
  T.exists(assert, $questionText, 'Missing question text');
  T.exists(assert, $promptTitle, 'Missing prompt title');
  T.exists(assert, $promptText, 'Missing prompt text');
  T.notExists(assert, $promptThumbnail, 'Thumbnail should not be displayed');
  assert.ok(
    T.text($promptTitle).includes('prompt title'),
    'Wrong text in prompt title'
  );
  assert.ok(
    T.text($promptText).includes('prompt text'),
    'Wrong text in prompt text'
  );
});

test('Layout with thumbnail', function(assert) {
  this.render(
    hbs`{{grading/gru-task-header promptText='prompt text' promptTitle='prompt title' promptThumbnail='prompt thumbnail'}}`
  );

  let $component = this.$();
  let $questionText = $component.find('.question-text');
  let $promptTitle = $questionText.find('.title');
  let $promptText = $questionText.find('.prompt-text');
  let $promptThumbnail = $questionText.find('.prompt-thumbnail');

  T.exists(assert, $component.find('.icon'), 'Missing icon');
  T.exists(assert, $questionText, 'Missing question text');
  T.exists(assert, $promptTitle, 'Missing prompt title');
  T.exists(assert, $promptText, 'Missing prompt text');
  T.exists(assert, $promptThumbnail, 'Missing prompt thumbnail');
  assert.ok(
    T.text($promptTitle).includes('prompt title'),
    'Wrong text in prompt title'
  );
  assert.ok(
    T.text($promptText).includes('prompt text'),
    'Wrong text in prompt text'
  );
});
