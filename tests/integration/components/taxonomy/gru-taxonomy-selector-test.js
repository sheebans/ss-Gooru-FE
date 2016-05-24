import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('gru-taxonomy-selector', 'Integration | Component | taxonomy/gru taxonomy selector', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('Layout - read only', function (assert) {

  var srcObject = Ember.Object.create(Ember.getOwner(this).ownerInjection(), {
    taxonomy: Ember.A(['ID-1'])
  });
  var editObject = Ember.Object.create(Ember.getOwner(this).ownerInjection(), {
    taxonomy: Ember.A(['ID-1'])
  });

  this.set('srcObject', srcObject);
  this.set('editObject', editObject);

  this.render(hbs`
    {{taxonomy.gru-taxonomy-selector isEditing=false srcObject=srcObject editObject=editObject}}
  `);

  const $component = this.$(".content.gru-taxonomy-selector");
  assert.ok($component.length, 'Component found');

  assert.equal($component.find('.category span.label').text(), this.get('i18n').t('common.category').string, 'Category label');
  assert.ok($component.find('.category .btn-empty').length, 'Default category');
  assert.equal($component.find('.category .btn-empty').text(), this.get('i18n').t('common.categoryOptions.k12').string, 'Selected category text');

  assert.equal($component.find('.subject label span span').text(), this.get('i18n').t('taxonomy.gru-taxonomy-selector.primary-subject-and-course').string, 'Subject label');
  assert.ok($component.find('.subject .subjects .btn-empty').length, 'Selected subjects');
});

test('Layout - edit', function (assert) {

  var srcObject = Ember.Object.create(Ember.getOwner(this).ownerInjection(), {
    taxonomy: Ember.A(['ID-1'])
  });
  var editObject = Ember.Object.create(Ember.getOwner(this).ownerInjection(), {
    taxonomy: Ember.A(['ID-1'])
  });

  this.set('srcObject', srcObject);
  this.set('editObject', editObject);
  this.render(hbs`
    {{taxonomy.gru-taxonomy-selector isEditing=true srcCategory=srcCategory editCategory=editCategory}}
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