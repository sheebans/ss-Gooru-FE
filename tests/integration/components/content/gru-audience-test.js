import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/gru-audience', 'Integration | Component | content/gru audience', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('Audience layout, no audiences selected - read only', function (assert) {
  var selectedAudiences = [];
  this.set('selectedAudiences', selectedAudiences);

  this.render(hbs`
    {{content.gru-audience isEditing=false srcSelectedAudiences=selectedAudiences}}
  `);

  const $component = this.$(".content.gru-audience");
  assert.ok($component.length, 'Component found');
  assert.ok($component.find('> span').text(), this.get('i18n').t('common.audience').string, 'Label');
  assert.ok($component.find('> div span').text(), this.get('i18n').t('common.not-specified').string, 'No selected audiences should be visible');
});

test('Audience layout, audiences selected - read only', function (assert) {
  var selectedAudiences = [1, 3];
  this.set('selectedAudiences', selectedAudiences);

  this.render(hbs`
    {{content.gru-audience isEditing=false srcSelectedAudiences=selectedAudiences}}
  `);

  const $component = this.$(".content.gru-audience");
  assert.ok($component.length, 'Component found');
  assert.equal($component.find('.btn-empty').length, 2, 'Audiences selected');
  assert.equal($component.find('.btn-empty:eq(0)').text(), this.get('i18n').t('common.audienceList.all').string, 'First selected audience');
});

test('Audience layout - edit', function (assert) {
  var initialAudiences = [1, 3];
  var selectedAudiences = [1, 3];
  this.set('initialAudiences', initialAudiences);
  this.set('selectedAudiences', selectedAudiences);

  this.render(hbs`
    {{content.gru-audience isEditing=true srcSelectedAudiences=initialAudiences editSelectedAudiences=selectedAudiences}}
  `);

  const $component = this.$(".content.gru-audience");
  assert.ok($component.find('.dropdown').length, 'Drop down container');
  assert.ok(!$component.find('.dropdown').hasClass('open'), 'Drop down not open by default');

  const $dropDown = $component.find('.dropdown > button.dropdown-toggle');
  assert.ok($dropDown.length, 'Drop down button');
  assert.equal($component.find('.dropdown > .btn-audience').length, 2, 'Audiences selected');

  const $audienceBtn = $component.find('.dropdown > .btn-audience');
  assert.ok($audienceBtn.find('.remove-audience').length, 'Selected audience should have a remove button');

  $dropDown.click();
  assert.ok($component.find('.dropdown').hasClass('open'), 'Drop down open after clicking drop down button');
  const $dropDownMenu = $component.find('ul.dropdown-menu');
  assert.equal($dropDownMenu.find('li').length, 6, 'Drop down menu options');
  assert.equal($dropDownMenu.find('li input:checked').length, 2, 'Drop down menu options');

  const $firstOption = $component.find('ul.dropdown-menu li:first-child');
  assert.equal($firstOption.text(), this.get('i18n').t('common.audienceList.all').string, 'First option text');
  assert.ok($firstOption.find('input:checked').length, 'First option should be selected');

  const $thirdOption = $component.find('ul.dropdown-menu li:eq(2)');
  assert.equal($thirdOption.text(), this.get('i18n').t('common.audienceList.above-grade-level').string, 'Third option text');
  assert.ok($thirdOption.find('input:checked').length, 'Third option should be selected');
});

test('Audience edit, remove audience', function (assert) {
  var initialAudiences = [1, 3];
  var selectedAudiences = [1, 3];
  this.set('initialAudiences', initialAudiences);
  this.set('selectedAudiences', selectedAudiences);

  this.render(hbs`
    {{content.gru-audience isEditing=true srcSelectedAudiences=initialAudiences editSelectedAudiences=selectedAudiences}}
  `);

  const $component = this.$(".content.gru-audience");
  assert.equal($component.find('.dropdown > .btn-audience').length, 2, 'Audiences selected');

  const $dropDown = $component.find('.dropdown > button.dropdown-toggle');
  $dropDown.click();

  const $dropDownMenu = $component.find('ul.dropdown-menu');
  assert.equal($dropDownMenu.find('li input:checked').length, 2, 'Checked audience options');

  const $removeFirstAudienceBtn = $component.find('.dropdown > .btn-audience:eq(0)');

  $removeFirstAudienceBtn.click();
  assert.equal($component.find('.dropdown > .btn-audience').length, 1, 'Audiences selected after removal');
  assert.equal($dropDownMenu.find('li input:checked').length, 1, 'Checked audience options after removal');
});

test('Audience edit, add audience -returning to edit mode will discard any changes', function (assert) {
  var initialAudiences = [1, 3];
  var selectedAudiences = [1, 3];
  this.set('initialAudiences', initialAudiences);
  this.set('selectedAudiences', selectedAudiences);
  this.set('isEditing', true);

  this.render(hbs`
    {{content.gru-audience isEditing=isEditing srcSelectedAudiences=initialAudiences editSelectedAudiences=selectedAudiences}}
  `);

  const $component = this.$(".content.gru-audience");
  assert.equal($component.find('.dropdown > .btn-audience').length, 2, 'Audiences selected');

  const $dropDown = $component.find('.dropdown > button.dropdown-toggle');
  $dropDown.click();

  var $dropDownMenu = $component.find('ul.dropdown-menu');
  assert.equal($dropDownMenu.find('li input:checked').length, 2, 'Checked audience options');

  $dropDownMenu.find('li input:eq(1)').click();
  assert.equal($component.find('.dropdown > .btn-audience').length, 3, 'Audiences selected after addition');
  assert.equal($dropDownMenu.find('li input:checked').length, 3, 'Checked audience options after addition');

  Ember.run(() => {
    this.set('isEditing', false);
  });

  assert.equal($component.find('.btn-empty').length, 2, 'Audiences selected -after exiting edit mode');

  Ember.run(() => {
    this.set('isEditing', true);
  });

  $dropDownMenu = $component.find('ul.dropdown-menu');
  assert.equal($component.find('.dropdown > .btn-audience').length, 2, 'Audiences selected -after returning to edit mode');
  assert.equal($dropDownMenu.find('li input:checked').length, 2, 'Checked audience options -after returning to edit mode');
});
