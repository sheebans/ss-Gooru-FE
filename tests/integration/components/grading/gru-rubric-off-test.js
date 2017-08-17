import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'grading/gru-rubric-off',
  'Integration | Component | grading/gru rubric off',
  {
    integration: true
  }
);

test('Layout', function(assert) {
  this.render(hbs`{{grading/gru-rubric-off}}`);
  const $component = this.$('.grading.gru-rubric-off');

  assert.ok($component.length, 'Missing component');
  assert.ok(
    $component.find('.overall-comment .title').length,
    'Missing overall title'
  );
  assert.ok(
    $component.find('.overall-comment .comment-lead').length,
    'Missing overall lead'
  );
  assert.ok(
    $component.find('textarea').length,
    'Missing overall comment textarea'
  );
});
