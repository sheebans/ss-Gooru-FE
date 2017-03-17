import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Category from 'gooru-web/models/rubric/rubric-category';

moduleForComponent('content/rubric/gru-category', 'Integration | Component | content/rubric/gru category', {
  integration: true
});

test('Category collapsed', function(assert) {

  let category = Category.create({
    title : 'Category Title'
  });

  this.set('category', category);

  this.render(hbs`{{content/rubric/gru-category category=category index=1}}`);
  const $component = this.$();

  assert.ok($component.find('.category-index'), 'Missing category index');
  assert.ok($component.find('.required'), 'Missing Category Title Label');
  assert.ok($component.find('a.title h2'), 'Missing title');
  assert.ok($component.find('.actions .item-actions.border'), 'Missing category actions');
  assert.ok($component.find('.actions .item-actions.border .delete'), 'Missing delete category button');
  assert.ok($component.find('.actions .item-actions.border .edit'), 'Missing edit category button');
  assert.ok($component.find('.actions .item-actions.border .copy'), 'Missing copy category button');
});
test('Category expanded', function(assert) {

  let category = Category.create({
    title : 'Category Title'
  });

  this.set('category', category);
  this.set('isPanelExpanded', true);
  this.set('isEditingInline', true);

  this.render(hbs`{{content/rubric/gru-category category=category index=1 isEditingInline=isEditingInline isPanelExpanded=isPanelExpanded}}`);
  const $component = this.$();

  assert.ok($component.find('.actions .item-actions'), 'Missing category actions');
  assert.ok($component.find('.actions .item-actions .cancel'), 'Missing cancel category button');
  assert.ok($component.find('.actions .item-actions .save'), 'Missing save category button');
  assert.ok($component.find('.actions .panel-body .feedback label'), 'Missing category feedback');
  assert.ok($component.find('.actions .panel-body .required-feedback'), 'Missing requires feedback checkbox');
});
test('Delete Category', function(assert) {
  assert.expect(1);

  this.on('parentAction', function(category){
    assert.ok(categoryDelete, category);
  });

  var categoryDelete = Category.create({
    title:'Category for test'
  });

  this.set('category',categoryDelete);
  this.render(hbs`{{content/rubric/gru-category category=category onDeleteCategory='parentAction'}}`);

  var $component = this.$();
  var $delete = $component.find('.btn.delete');
  $delete.click();
});

test('Copy Category', function(assert) {
  assert.expect(1);

  this.on('parentAction', function(category){
    assert.ok(categoryCopy, category);
  });

  var categoryCopy = Category.create({
    title:'Category for test'
  });

  this.set('category',categoryCopy);
  this.render(hbs`{{content/rubric/gru-category category=category onCopyCategory='parentAction'}}`);

  var $component = this.$();
  var $copy = $component.find('.btn.copy');
  $copy.click();
});
