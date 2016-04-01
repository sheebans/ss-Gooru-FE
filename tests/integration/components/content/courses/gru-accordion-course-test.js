import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/courses/gru-accordion-course', 'Integration | Component | content/courses/gru accordion course', {
  integration: true,

  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('it renders correctly when there are no units', function (assert) {

  this.set('units', []);
  this.render(hbs`{{content/courses/gru-accordion-course items=units}}`);

  const $component = this.$('.content.courses.gru-accordion-course.gru-accordion');
  assert.ok($component.length, 'Component');

  const $header = $component.find('> .header');
  const $listContainer = $component.find('> .accordion-course');

  assert.ok($header.length, 'Component header');
  assert.ok($header.find('h2'), 'Header title');
  assert.equal($header.find('h2').text(), this.get('i18n').t('common.builder').string, 'Header title text');
  assert.ok($header.find('.detail'), 'Header detail');
  assert.equal($header.find('.detail > span').text(), this.get('i18n').t('common.add-units').string, 'Header detail text');
  assert.ok($header.find('.detail .actions button.add-unit').length, 'Header, add unit button');

  assert.ok($listContainer.length, 'List container');
  assert.equal($listContainer.find('li').length, 1, 'Default unit');
  assert.ok($listContainer.find('li:eq(0)').hasClass('add-item'), 'Default unit class');
  assert.ok($listContainer.find('li:eq(0)').text(), this.get('i18n').t('common.add-new-unit').string, 'Default unit text');
});

test('it allows creating a new unit by clicking on the add button in the header', function (assert) {

  this.set('units', []);
  this.render(hbs`{{content/courses/gru-accordion-course items=units}}`);

  const $component = this.$('.content.courses.gru-accordion-course.gru-accordion');
  const $listContainer = $component.find('> .accordion-course');
  assert.equal($listContainer.find('> li').length, 1, 'Default unit');

  $component.find('> .header .detail .actions button.add-unit').click();
  assert.equal($listContainer.find('> li').length, 2, 'Add unit');
});

test('it allows creating a new unit by clicking on the add section at the bottom of the list', function (assert) {

  this.set('units', []);
  this.render(hbs`{{content/courses/gru-accordion-course items=units}}`);

  const $component = this.$('.content.courses.gru-accordion-course.gru-accordion');
  const $listContainer = $component.find('> .accordion-course');
  assert.equal($listContainer.find('> li').length, 1, 'Default unit');

  $listContainer.find('> li:eq(0) a').click();
  assert.equal($listContainer.find('> li').length, 2, 'Add unit');
});

test('it removes a unit that has not yet been saved', function (assert) {

  this.set('units', []);
  this.render(hbs`{{content/courses/gru-accordion-course items=units}}`);

  const $component = this.$('.content.courses.gru-accordion-course.gru-accordion');
  const $listContainer = $component.find('> .accordion-course');

  $listContainer.find('> li:eq(0) a').click();
  assert.equal($listContainer.find('> li').length, 2, 'Unit added');

  const $newUnit = $listContainer.find('> li.gru-accordion-unit.edit');
  $newUnit.find('.panel-heading .actions button.cancel').click();
  assert.equal($listContainer.find('> li').length, 1, 'Unit removed');
});


