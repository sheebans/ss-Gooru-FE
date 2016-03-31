import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gru-collection-new', 'Integration | Component | gru collection new', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('New Course Layout', function(assert) {

  this.render(hbs`{{content/modals/gru-collection-new}}`);

  const $component = this.$(".gru-collection-new");
  assert.ok($component, 'Missing Component');
  assert.ok($component.find('h4.modal-title'), 'Missing Title');
  assert.equal($component.find('h4.modal-title').text(), this.get('i18n').t('common.add-collection').string, 'Incorrect Title');
  assert.ok($component.find('label span.required'), 'Missing Collection Title label');
  assert.equal($component.find('label span.required').text(), this.get('i18n').t('common.collection-title').string, 'Incorrect Collection Title Label');
  assert.ok($component.find('label input'), 'Missing Collection Title Input');
  assert.ok($component.find('actions .cancel'), 'Missing Cancel Button');
  assert.ok($component.find('actions .add'), 'Missing Add Button');

});
