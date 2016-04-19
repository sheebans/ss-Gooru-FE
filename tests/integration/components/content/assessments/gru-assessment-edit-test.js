import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import Assessment from 'gooru-web/models/content/assessment';

moduleForComponent('content/assessments/gru-assessment-edit', 'Integration | Component | content/assessments/gru assessment edit', {
  integration: true
});

test('it has header and main sections', function (assert) {

  var assessment = Assessment.create(Ember.getOwner(this).ownerInjection(), {
    title: "Collection Title"
  });

  this.set('assessment', assessment);
  this.render(hbs`{{content/assessments/gru-assessment-edit collection=assessment}}`);

  var $container = this.$("article.content.assessments.gru-assessment-edit");
  assert.ok($container.length, "Component");

  const $header = $container.find('> header');
  assert.ok($header.length, "Header");
  assert.ok($header.find('> .actions').length, "Header actions");
  assert.equal($header.find('> .actions > button').length, 5, "Number of header actions");
  assert.ok($header.find('> nav').length, "Header navigation");
  assert.equal($header.find('> nav > a').length, 3, "Number of header navigation links");

  assert.equal($container.find('> section').length, 3, "Number of edit sections");
  assert.ok($container.find('> section#information').length, "Information section");
  assert.ok($container.find('> section#builder').length, "Builder section");
  assert.ok($container.find('> section#settings').length, "Settings section");
});

test('Layout of the settings section', function (assert) {

  var assessment = Assessment.create(Ember.getOwner(this).ownerInjection(), {
    title: "Collection Title"
  });

  this.set('assessment', assessment);
  this.render(hbs`{{content/assessments/gru-assessment-edit collection=assessment}}`);

  var $settingsSection = this.$("#settings");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel-heading h3').length, "Panel subtitle");
  assert.ok($settingsSection.find('.panel-body .setting.publish-to i.visibility').length, "Visibility icon");
  assert.ok($settingsSection.find('.panel-body .setting.publish-to i.visibility + span').length, "Visibility label");
  assert.ok($settingsSection.find('.panel-body .gru-switch .toggle').length, "Profile toggle button");
  assert.ok($settingsSection.find('.panel-body .setting.request-to i.public').length, "Public icon");
  assert.ok($settingsSection.find('.panel-body .setting.request-to i.public + span').length, "Public label");
});