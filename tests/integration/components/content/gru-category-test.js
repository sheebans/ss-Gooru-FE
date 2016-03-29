import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/gru-category', 'Integration | Component | content/gru category', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('Layout - read only', function (assert) {

  this.render(hbs`
    {{content.gru-category isEditing=false srcCategory=1}}
  `);

  const $component = this.$(".content.gru-category");
  assert.ok($component.length, 'Component found');

  assert.equal($component.find('span.label').text(), this.get('i18n').t('common.category').string, 'Label');
  assert.ok($component.find('.btn-empty').length, 'Selected category');
  assert.equal($component.find('.btn-empty').text(), this.get('i18n').t('common.categoryOptions.k12').string, 'Selected category text');
});

test('Layout - edit', function (assert) {

  this.set('srcCategory', 1);
  this.set('editCategory', 1);
  this.render(hbs`
    {{content.gru-category isEditing=true srcCategory=srcCategory editCategory=editCategory}}
  `);

  const $component = this.$(".content.gru-category");
  assert.ok($component.length, 'Component found');
  assert.equal($component.find('span.label').text(), this.get('i18n').t('common.category').string, 'Label');

  const $btnGroup = $component.find('> .btn-group');
  assert.ok($btnGroup.length, 'Button group');
  assert.equal($btnGroup.find('button').length, 3, 'Number of buttons in button group');
  assert.equal($btnGroup.find('button.btn-primary').length, 1, 'Number of selected buttons in button group');
  assert.ok($btnGroup.find('button:eq(0)').hasClass('btn-primary'), 'First button is selected');

  $btnGroup.find('button:eq(2)').click();
  assert.equal($btnGroup.find('button.btn-primary').length, 1, 'Number of selected buttons in button group');
  assert.ok($btnGroup.find('button:eq(2)').hasClass('btn-primary'), 'Third button is selected');
  assert.equal(this.get('editCategory'), 3, 'Edit category value updated correctly');
});