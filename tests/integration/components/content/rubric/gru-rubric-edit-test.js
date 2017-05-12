import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RubricModel from 'gooru-web/models/rubric/rubric';
import Category from 'gooru-web/models/rubric/rubric-category';
import Ember from 'ember';
import DS from 'ember-data';
import AudienceModel from 'gooru-web/models/audience';

const lookupServiceStub = Ember.Service.extend({

  readAudiences() {
    var promiseResponse;
    var response = [
      AudienceModel.create({ id: 1, name: 'all students', order: 1 }),
      AudienceModel.create({ id: 4, name: 'none students', order: 2 })
    ];

    promiseResponse = new Ember.RSVP.Promise(function(resolve) {
      Ember.run.next(this, function() {
        resolve(response);
      });
    });

    return DS.PromiseArray.create({
      promise: promiseResponse
    });
  }});

const taxonomyServiceStub = Ember.Service.extend({

  getSubjects(category) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (!category) {
        reject({status: 500});
      } else {
        resolve({
          "subjects": [{
            "id": "GDF.K12.CS",
            "title": "Computer Science",
            "description": null,
            "code": "GDF.K12.CS",
            "standard_framework_id": "GDF"
          }]
        });
      }
    });
  }

});

moduleForComponent('content/rubric/gru-rubric-edit', 'Integration | Component | content/rubric/gru rubric edit', {
  integration: true,
  beforeEach: function () {
    this.register('service:api-sdk/taxonomy', taxonomyServiceStub);
    this.inject.service('api-sdk/taxonomy');
    this.register('service:api-sdk/lookup', lookupServiceStub);
    this.inject.service('api-sdk/lookup');
  }
});

test('it renders', function(assert) {
  let rubric = RubricModel.create( {id:'id-for-test',title: 'Rubric for testing',categories:[
    Category.create({title:'Category testing'})
  ]});
  this.set('rubric',rubric);

  this.render(hbs`{{content/rubric/gru-rubric-edit rubric=rubric}}`);
  const $component = this.$();
  assert.ok($component.find('.gru-rubric-edit').length, 'Missing rubric edit component');
  assert.ok($component.find('.content.gru-header').length, 'Missing rubric header');
  assert.ok($component.find('section#information').length,'Missing information section');
  assert.ok($component.find('section#information .header').length,'Missing information header');
  assert.ok($component.find('section#information .header h2').length,'Missing information header title');
  assert.ok($component.find('section#information .title label .gru-input').length,'Missing assessment title input');
  assert.ok($component.find('section#information .gru-taxonomy-selector').length,'Missing taxonomy selector');
  assert.ok($component.find('section#information .standards').length,'Missing taxonomy selector');
  assert.ok($component.find('section#information .content.gru-audience').length,'Missing audience');
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
  let rubric = RubricModel.create( {id:'id-for-test',title: 'Rubric for testing',categories:[
    Category.create({title:'Category testing'})
  ]});
  this.set('rubric',rubric);
  this.render(hbs`{{content/rubric/gru-rubric-edit rubric=rubric}}`);
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
