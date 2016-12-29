import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gru-collection-skills', 'Integration | Component | gru collection skills', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('Collection skills Layout', function(assert) {

  this.render(hbs`{{content/modals/gru-collection-skills}}`);

  const $component = this.$(".gru-collection-skills");
  assert.ok($component, 'Missing Component');
  assert.ok($component.find('h4.modal-title'), 'Missing Title');
  assert.equal($component.find('h4.modal-title').text(), this.get('i18n').t('common.add-century-skills').string, 'Incorrect Title');
  assert.ok($component.find('.gru-collection-skills-legend'), 'Missing gru-collection-skills-legend component');
  assert.ok($component.find('actions .cancel'), 'Missing Cancel Button');
  assert.ok($component.find('actions .add'), 'Missing Add Button');

});
