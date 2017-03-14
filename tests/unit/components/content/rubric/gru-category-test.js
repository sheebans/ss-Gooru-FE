import { moduleForComponent, test } from 'ember-qunit';
import Category from 'gooru-web/models/rubric/rubric-category';


moduleForComponent('content/rubric/gru-category', 'Unit | Component | content/rubric/gru category', {
  unit: true
});

test('setFeedBack', function(assert) {
  let component = this.subject({
    category: Category.create({})
  });
  assert.equal(component.get('category.requiresFeedback'),false,'Feedback is not required');
  component.send('setFeedBack');
  assert.equal(component.get('category.requiresFeedback'),true,'Feedback should be required');
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


