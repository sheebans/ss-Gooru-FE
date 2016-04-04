import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Unit from 'gooru-web/models/content/unit';
import Ember from 'ember';

moduleForComponent('content/courses/gru-accordion-unit', 'Integration | Component | content/courses/gru accordion unit', {
  integration: true,

  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('it renders a form for a new unit', function (assert) {

  const unit = Unit.create(Ember.getOwner(this).ownerInjection(), {
    id: 0,
    isEditing: true
  });

  this.set('unit', unit);
  this.set('totalItems', 3);
  this.render(hbs`{{content/courses/gru-accordion-unit model=unit totalItems=3}}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit');
  assert.ok($component.length, 'Component');
  assert.ok($component.hasClass('edit'), 'Edit class');

  assert.ok($component.find('.panel-heading h3').text(), this.get('i18n').t('common.unit').string + " " + this.get('totalItems'), 'Header prefix');
  assert.equal($component.find('.actions button').length, 2, 'Unit header action buttons');
  assert.ok($component.find('.actions button:eq(0)').hasClass('cancel'), 'First button is cancel');
  assert.ok($component.find('.actions button:eq(1)').hasClass('save'), 'Second button is save');

  const $panelBody = $component.find('.panel-body');
  assert.ok($panelBody.find('> .row .col-sm-6 label textarea').length, 2, 'Text areas');
  assert.ok($panelBody.find('> .domain').length, 'Domain');
});

test('it renders a form when editing an existing unit', function (assert) {

  // Unit model
  const unit = Unit.create(Ember.getOwner(this).ownerInjection(), {
    bigIdeas: 'Big ideas text',
    essentialQuestions: 'Essential questions text',
    id: 123,
    isEditing: true,
    title: 'Sample Unit Name',
    sequence: 1
  });

  this.set('unit', unit);
  this.render(hbs`{{content/courses/gru-accordion-unit model=unit }}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit');
  assert.ok($component.length, 'Component');
  assert.ok($component.hasClass('edit'), 'Edit class');

  assert.ok($component.find('.panel-heading h3').text(), this.get('i18n').t('common.unit').string + " " + unit.get('sequence'), 'Header prefix');
  assert.ok($component.find('.panel-heading .gru-input.title').text(), unit.get('title'), 'Unit title');
  assert.equal($component.find('.actions button').length, 2, 'Unit header action buttons');
  assert.ok($component.find('.actions button:eq(0)').hasClass('cancel'), 'First button is cancel');
  assert.ok($component.find('.actions button:eq(1)').hasClass('save'), 'Second button is save');

  const $panelBody = $component.find('.panel-body');
  assert.ok($panelBody.find('> .row .col-sm-6 label textarea').length, 2, 'Text areas');
  assert.equal($panelBody.find('> .row .col-sm-6:eq(0) textarea').val(), unit.get('bigIdeas'), 'First textarea content');
  assert.equal($panelBody.find('> .row .col-sm-6:eq(1) textarea').val(), unit.get('essentialQuestions'), 'Second textarea content');

  assert.ok($panelBody.find('> .domain').length, 'Domain');
});


test('it triggers an external event when clicking cancel on a new unsaved unit', function (assert) {
  assert.expect(1);

  const unit = Unit.create(Ember.getOwner(this).ownerInjection(), {
    id: 0,
    isEditing: true
  });

  this.on('externalAction', function () {
    assert.ok(true);
  });

  this.set('unit', unit);
  this.render(hbs`{{content/courses/gru-accordion-unit model=unit onCancelAddUnit=(action 'externalAction')}}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit');
  $component.find('.actions button.cancel').click();
});

test('it loads lessons and renders them after clicking on the unit name', function (assert) {
  // TODO: Complete this
  assert.expect(0);
});

test('it only loads lessons once after clicking on the unit name', function (assert) {
  // TODO: Complete this
  assert.expect(0);
});
