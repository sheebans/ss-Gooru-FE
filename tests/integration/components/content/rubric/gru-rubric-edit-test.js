import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/rubric/gru-rubric-edit', 'Integration | Component | content/rubric/gru rubric edit', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{content/rubric/gru-rubric-edit}}`);
  const $component = this.$();
  assert.ok($component.find('.gru-rubric-edit').length, 'Missing rubric edit component');
  assert.ok($component.find('.content.gru-header').length, 'Missing rubric header');
});
