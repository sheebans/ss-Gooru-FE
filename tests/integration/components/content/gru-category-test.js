import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/gru-category', 'Integration | Component | content/gru category', {
  integration: true
});

test('Category Read Only Layout', function(assert) {

  this.render(hbs`
    {{content.gru-category isEditing=false courseCategory=1}}
  `);

  var $component = this.$();
  var $categoryComponent = $component.find(".gru-category");

  assert.equal($categoryComponent.find('span.category-label').text(), 'Category', 'Incorrect title');
  assert.ok($categoryComponent.find('button.btn-empty'), 'Missing Category Option');
  assert.equal($categoryComponent.find('button.btn-empty').text(), 'K-12', 'Incorrect Category');
});

test('Category Edit Layout', function(assert) {

  this.render(hbs`
    {{content.gru-category isEditing=true courseCategory=1}}
  `);

  var $component = this.$();
  var $categoryComponent = $component.find(".gru-category");
  assert.equal($categoryComponent.find('span.category-label').text(), 'Category', 'Incorrect title');
  assert.ok($categoryComponent.find('.category-group .btn-group'), 'Missing Category group');
  assert.equal($categoryComponent.find('.category-group button:eq(0)').text(), 'K-12', 'Incorrect Category');
  assert.ok($categoryComponent.find('.category-group button:eq(0)').hasClass('btn-primary'), 'Component class is missing');
  assert.equal($categoryComponent.find('.category-group button:eq(1)').text(), 'Higher Education', 'Incorrect Category');
  assert.equal($categoryComponent.find('.category-group button:eq(2)').text(), 'Professional Development', 'Incorrect Category');
});
