import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RubricModel from 'gooru-web/models/rubric/rubric';
import Category from 'gooru-web/models/rubric/rubric-category';

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
  var $rubricTab = $component.find('.header.content.gru-header nav a.rubric');
  $rubricTab.click();
  return wait().then(function () {
    assert.ok($component.find('section#rubric .panel.rubric-creation').length,'Missing rubric creation panel');
    assert.ok($component.find('section#rubric .panel.rubric-creation .panel-heading h3').length,'Missing rubric creation title');
    assert.ok($component.find('section#rubric .panel.rubric-creation .gru-rubric-creation').length,'Missing rubric creation component');
    assert.ok($component.find('.overall-score').length,'Missing overall score panel');
    assert.ok($component.find('.overall-score .panel-heading h3').length,'Missing overall score title');
    assert.ok($component.find('.overall-score .panel-body .feedback label span').length,'Missing Feedback guidance label');
    assert.ok($component.find('.overall-score .panel-body .feedback label .gru-textarea').length,'Missing Feedback guidance textarea');
    assert.ok($component.find('.overall-score .panel-body .required-feedback span').length,'Missing required feedback checkbox');
  });
});

test('Add Category', function(assert) {
  this.render(hbs`{{content/rubric/gru-rubric-edit}}`);
  const $component = this.$();
  var $rubricTab = $component.find('.header.content.gru-header nav a.rubric');
  $rubricTab.click();
  return wait().then(function () {
    var $addCategory = $component.find('.category-panel a.add-category');
    $addCategory.click();
    return wait().then(function () {
      assert.ok($component.find('.category-panel .content.rubric.gru-category').length, 'Should add a category');
      assert.ok($component.find('.category-panel .content.rubric.gru-category .panel.expanded').length, 'The category should be expanded');
    });
  });
});

test('Copy Category', function(assert) {
  let rubric = RubricModel.create( {id:'id-for-test',title: 'Rubric for testing',categories:[
    Category.create({title:'Category testing'})
  ]});
  this.set('rubric',rubric);

  this.render(hbs`{{content/rubric/gru-rubric-edit rubric=rubric}}`);
  const $component = this.$();
  var $rubricTab = $component.find('.header.content.gru-header nav a.rubric');
  $rubricTab.click();
  return wait().then(function () {
    assert.equal($component.find('.category-panel .content.rubric.gru-category').length,1, 'Should have 1 category');
    var $copyCategory = $component.find('.category-panel .gru-category button.copy');
    $copyCategory.click();
    return wait().then(function () {
      assert.equal($component.find('.category-panel .content.rubric.gru-category').length,2, 'Should have 2 category');
    });
  });
});
test('Delete Category', function(assert) {
  let rubric = RubricModel.create( {id:'id-for-test',title: 'Rubric for testing',categories:[
    Category.create({title:'Category testing'})
  ]});
  this.set('rubric',rubric);

  this.render(hbs`{{content/rubric/gru-rubric-edit rubric=rubric}}`);
  const $component = this.$();
  var $rubricTab = $component.find('.header.content.gru-header nav a.rubric');
  $rubricTab.click();
  return wait().then(function () {
    assert.equal($component.find('.category-panel .content.rubric.gru-category').length,1, 'Should have 1 category');
    var $copyCategory = $component.find('.category-panel .gru-category button.delete');
    $copyCategory.click();
    return wait().then(function () {
      assert.equal($component.find('.category-panel .content.rubric.gru-category').length,0, 'Should not have categories');
    });
  });
});
