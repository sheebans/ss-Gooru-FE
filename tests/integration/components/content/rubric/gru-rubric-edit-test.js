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
  assert.ok($component.find('section#information').length,'Missing information section');
  assert.ok($component.find('section#information .header').length,'Missing information header');
  assert.ok($component.find('section#information .header h2').length,'Missing information header title');
  assert.ok($component.find('section#information .title label .gru-input').length,'Missing assessment title input');
});
