import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/modals/gru-delete-content', 'Integration | Component | content/modals/gru delete content', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('it renders', function(assert) {
  const model ={
    model:{
      title:"Course Title"
    },
    type: 'Course',
    redirectTo: '',
    callback: null,
  };
  this.set('model',model);

  this.render(hbs`{{content/modals/gru-delete-content model=model}}`);
  const $component = this.$(".gru-delete-content");
  assert.ok($component, 'Missing Component');
  assert.ok($component.find('h4.modal-title'), 'Missing Title');
  assert.equal($component.find('h4.modal-title').text(), this.get('i18n').t('common.delete').string +" "+model.type, 'Incorrect Title');
  assert.ok($component.find('p.legend'), 'Missing Delete Course Legend');
  assert.equal($component.find('p.legend').text(), this.get('i18n').t('content.modals.delete-content.legend').string+ " "+model.model.title, 'Incorrect legend');
  assert.ok($component.find('.delete-info'), 'Missing Delete Information');
  assert.equal($component.find('.delete-info ul li:eq(0) label span').text(), this.get('i18n').t('content.modals.delete-content.delete-instructions.links-inaccessible').string, 'Incorrect links inaccessible check');
  assert.equal($component.find('.delete-info ul li:eq(1) label span').text(), this.get('i18n').t('content.modals.delete-content.delete-instructions.content-inaccessible').string, 'Incorrect content inaccessible check');
  assert.equal($component.find('.delete-info ul li:eq(2) label span').text(), this.get('i18n').t('content.modals.delete-content.delete-instructions.course-deleted').string, 'Incorrect course deleted check');
  assert.ok($component.find('p.confirmation'), 'Missing Delete Confirmation');
  assert.equal($component.find('p.confirmation').text(), this.get('i18n').t('content.modals.delete-content.confirmation').string, 'Incorrect Confirmation Text');
  assert.ok($component.find('.delete-input'), 'Missing Delete Input');
  assert.ok($component.find('actions .cancel'), 'Missing Cancel Button');
  assert.ok($component.find('actions .delete'), 'Missing Delete Button');
});
