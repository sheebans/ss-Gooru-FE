import { moduleForComponent, test } from 'ember-qunit';
import Category from 'gooru-web/models/rubric/rubric-category';


moduleForComponent('content/rubric/gru-category', 'Unit | Component | content/rubric/gru category', {
  unit: true
});

test('setFeedBack', function(assert) {
  let component = this.subject({
    category: Category.create({})
  });
  assert.equal(component.get('category.requiresFeedback'),true,'Feedback should be required');
  component.send('setFeedBack');
  assert.equal(component.get('category.requiresFeedback'),false,'Feedback should not be required');
});

test('editInline', function(assert) {
  let component = this.subject({
    category: Category.create({title:'test'})
  });
  assert.equal(component.get('isPanelExpanded'),false,'Panel should not expanded');
  assert.equal(component.get('isEditingInline'),false,'Should not edit inline');
  component.send('editInline');
  assert.deepEqual(component.get('tempCategory'),component.get('category'),'Should copy the category');
  assert.equal(component.get('isPanelExpanded'),true,'Panel should be expanded');
  assert.equal(component.get('isEditingInline'),true,'Should edit inline');
});

test('cancel', function(assert) {
  let component = this.subject({
    category: Category.create({title:'test'})
  });
  component.send('editInline');
  assert.equal(component.get('isPanelExpanded'),true,'Panel should be expanded');
  assert.equal(component.get('isEditingInline'),true,'Should edit inline');

  component.send('cancel');
  assert.equal(component.get('isPanelExpanded'),false,'Panel should not expanded');
  assert.equal(component.get('isEditingInline'),false,'Should not edit inline');
});
test('copyCategory', function(assert) {
  let component = this.subject();
  let categoryCopy = {id:'category-test'};
  component.set('sendAction', function(actionName, category, index) {
    assert.equal(actionName, 'onCopyCategory', 'Action sent should match');
    assert.equal(category,categoryCopy, 'Category should match');
    assert.equal(index,1, 'Index should match');
  });
  component.send('copyCategory', categoryCopy,1);
});
test('saveCategory', function(assert) {
  let component = this.subject({
    category: Category.create({title:'test'}),
    tempCategory: Category.create({title:'copy category'})
  });
  component.send('saveCategory');
  assert.deepEqual(component.get('category'),component.get('tempCategory'),'Incorrect copy');
});


