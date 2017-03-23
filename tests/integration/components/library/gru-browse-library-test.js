import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('library/gru-browse-library', 'Integration | Component | library/gru browse library', {
  integration: true
});

test('Browse Library Test', function(assert) {

  this.render(hbs`{{library/gru-browse-library}}`);
  const $component = this.$();
  let $options = $component.find('.tab');
  assert.equal($options.filter(':first-child').text().trim(), 'Featured Libraries', 'Featured Libraries tab is missing');
  assert.ok($component.find('#featured-libraries'),'Missing featured libraries section');
});
