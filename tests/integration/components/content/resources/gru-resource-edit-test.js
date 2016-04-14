import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import Resource from 'gooru-web/models/content/resource';

moduleForComponent('gru-resource-edit', 'Integration | Component | content/resources/gru resource edit', {
  integration: true
});

test('it has header and main sections', function (assert) {

  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Resource Title"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-edit resource=resource}}`);

  var $container = this.$("article.content.resources.gru-resource-edit");
  assert.ok($container.length, "Component");

  const $header = $container.find('> header');
  assert.ok($header.length, "Header");
  assert.ok($header.find('> .actions').length, "Header actions");
  assert.equal($header.find('> .actions > button').length, 4, "Number of header actions");
  assert.ok($header.find('> nav').length, "Header navigation");
  assert.equal($header.find('> nav > a').length, 3, "Number of header navigation links");

  assert.equal($container.find('> section').length, 2, "Number of edit sections");
  assert.ok($container.find('> section#resource').length, "Resource section");
  assert.ok($container.find('> section#information').length, "Information section");
});
