import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';
import RubricModel from 'gooru-web/models/rubric/rubric';
import RubricGradeModel from 'gooru-web/models/rubric/rubric-grade';

moduleForComponent(
  'grading/gru-rubric-panel',
  'Integration | Component | grading/gru rubric panel',
  {
    integration: true
  }
);

test('Show full rubric', function(assert) {
  this.set('showFullRubric', false);
  this.render(hbs`{{grading/gru-rubric-panel showFullRubric=showFullRubric}}`);

  let $component = this.$();
  let $panel = $component.find('.gru-rubric-panel');
  let $icon = $component.find('.rubric-information .header .icon');

  assert.notOk(this.get('showFullRubric'), 'Wrong value of showFullRubric');
  assert.notOk(
    $panel.hasClass('full-rubric'),
    'The component must not have the class full-rubric'
  );
  $icon.click();
  assert.ok(this.get('showFullRubric'), 'Wrong value of showFullRubric');
  assert.ok(
    $panel.hasClass('full-rubric'),
    'The component must have the class full-rubric'
  );
});

test('Change tabs', function(assert) {
  this.set('showFullRubric', false);
  this.set(
    'rubric',
    RubricModel.create(Ember.getOwner(this).ownerInjection(), {
      rubricOn: true,
      categories: Ember.A()
    })
  );
  this.set(
    'grade',
    RubricGradeModel.create(Ember.getOwner(this).ownerInjection(), {
      categories: Ember.A()
    })
  );
  this.render(hbs`{{grading/gru-rubric-panel rubric=rubric grade=grade}}`);

  let $component = this.$();
  let $header = $component.find('.rubric-information .header');
  let $rubricTab = $header.find('.rubric-tab');
  let $gradingTab = $header.find('.grading-tab');
  let $rubric = $component.find('.content .rubric');
  let $grading = $component.find('.content .grading');
  assert.ok(
    $gradingTab.hasClass('active'),
    'Grading tab must be active by default'
  );
  assert.notOk(
    $rubricTab.hasClass('active'),
    'Rubric tab must not be active by default'
  );
  assert.ok($grading.hasClass('active'), 'Grading must be active by default');
  assert.notOk(
    $rubric.hasClass('active'),
    'Rubric must not be active by default'
  );

  $rubricTab.click();
  return wait().then(function() {
    assert.notOk(
      $gradingTab.hasClass('active'),
      'Grading tab must not be active'
    );
    assert.ok($rubricTab.hasClass('active'), 'Rubric must be active');
    assert.notOk($grading.hasClass('active'), 'Grading tab must not be active');
    assert.ok($rubric.hasClass('active'), 'Rubric must be active');

    $gradingTab.click();
    assert.ok($gradingTab.hasClass('active'), 'Grading tab must be active');
    assert.notOk(
      $rubricTab.hasClass('active'),
      'Rubric tab must not be active'
    );
    assert.ok($grading.hasClass('active'), 'Grading must be active');
    assert.notOk($rubric.hasClass('active'), 'Rubric must not be active');
  });
});
