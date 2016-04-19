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

  assert.equal($container.find('> section').length, 3, "Number of edit sections");
  assert.ok($container.find('> section#resource').length, "Resource section");
  assert.ok($container.find('> section#information').length, "Information section");
  assert.ok($container.find('> section#settings').length, "Information section");
});

test('Layout of the settings section', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Resource Title"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-edit resource=resource}}`);

  var $settingsSection = this.$("#settings");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel-heading h3').length, "Panel subtitle");
  assert.ok($settingsSection.find('.panel-body .setting.publish-to i.visibility').length, "Visibility icon");
  assert.ok($settingsSection.find('.panel-body .setting.publish-to i.visibility + span').length, "Visibility label");
  assert.ok($settingsSection.find('.panel-body .gru-switch .toggle').length, "Profile toggle button");
  assert.ok($settingsSection.find('.panel-body .setting.request-to i.public').length, "Public icon");
  assert.ok($settingsSection.find('.panel-body .setting.request-to i.public + span').length, "Public label");
});

test('Layout of preview section for youtube video', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Youtube Video",
    format: "video",
    url: "https://www.youtube.com/watch?v=hFAOXdXZ5TM"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-edit resource=resource}}`);

  var $settingsSection = this.$("#resource");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel.preview').length, "Preview panel");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-youtube-resource').length, "YouTube component");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-youtube-resource iframe').length, "YouTube iframe");
});

test('Layout of preview section for vimeo video', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Vimeo Video",
    format: "video",
    url: "https://vimeo.com/channels/staffpicks/107094723"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-edit resource=resource}}`);

  var $settingsSection = this.$("#resource");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel.preview').length, "Preview panel");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-vimeo-resource').length, "Vimeo component");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-vimeo-resource iframe').length, "Vimeo iframe");
});

test('Layout of preview section for image', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Image",
    format: "image",
    url: "http://example.com/image.png"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-edit resource=resource}}`);

  var $settingsSection = this.$("#resource");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel.preview').length, "Preview panel");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-image-resource').length, "Image component");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-image-resource img').length, "Image tag");
});

test('Layout of preview section for audio resource', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Audio",
    format: "audio",
    url: "http://example.com/test.mp3"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-edit resource=resource}}`);

  var $settingsSection = this.$("#resource");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel.preview').length, "Preview panel");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-url-resource').length, "URL resource component");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-url-resource iframe').length, "URL resource iframe");
});

test('Layout of preview section for webpage', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Webpage",
    format: "webpage",
    url: "http://example.com/sample.html"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-edit resource=resource}}`);

  var $settingsSection = this.$("#resource");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel.preview').length, "Preview panel");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-url-resource').length, "URL resource component");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-url-resource iframe').length, "URL resource iframe");
});

test('Layout of preview section for interactive', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Interactive",
    format: "interactive",
    url: "http://example.com/sample.swf"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-edit resource=resource}}`);

  var $settingsSection = this.$("#resource");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel.preview').length, "Preview panel");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-url-resource').length, "URL resource component");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-url-resource iframe').length, "URL resource iframe");
});

test('Layout of preview section for text', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Text resource",
    format: "text",
    url: "http://example.com/sample.pdf"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-edit resource=resource}}`);

  var $settingsSection = this.$("#resource");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel.preview').length, "Preview panel");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-pdf-resource').length, "PDF resource component");
  assert.ok($settingsSection.find('.panel.preview .panel-body .gru-pdf-resource iframe').length, "PDF resource iframe");
});
