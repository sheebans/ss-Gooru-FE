import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import CollectionModel from 'gooru-web/models/content/collection';
import ResourceModel from 'gooru-web/models/content/resource';
import Ember from 'ember';

moduleForComponent('content/modals/gru-add-to-collection', 'Integration | Component | content/modals/gru add to collection', {
  integration: true
});

test('Layout', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('model', {
    "collections": Ember.A([
      CollectionModel.create(Ember.getOwner(this).ownerInjection(), {
        id: 'some-id',
        title: 'some-title'
      }),
      CollectionModel.create(Ember.getOwner(this).ownerInjection(), {
        id: 'some-id-2',
        title: 'some-title-2'
      })
    ]),
    "content": ResourceModel.create(Ember.getOwner(this).ownerInjection(), {
      id: 'resource-id',
      title: 'resource-title'
    })
  });

  this.render(hbs`{{content/modals/gru-add-to-collection model=model}}`);

  const $component = this.$('.content.modals.gru-add-to');
  assert.ok($component.length, 'Component classes');

  const $header = $component.find('.modal-header');
  assert.ok($header.length, 'Header');
  assert.ok($header.find('.modal-title').length, 'Header title');


  const $body = $component.find('.modal-body');
  assert.ok($body.length, 'Body');
  assert.equal($body.find('>div').length, 2, 'Number of cards');

  const $footer = $component.find('.modal-footer');

  assert.equal($footer.find('.btn-group button').length, 2, 'Number of action buttons');
  assert.ok($footer.find('.btn-group .cancel').length, 'Cancel button');
  assert.ok($footer.find('.btn-group .add-to').length, 'Join class button');

});
