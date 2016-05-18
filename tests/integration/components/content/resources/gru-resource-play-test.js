import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Resource from 'gooru-web/models/content/resource';
import Ember from 'ember';

moduleForComponent('content/resources/gru-resource-play', 'Integration | Component | content/resources/gru resource play', {
  integration: true
});

test('Layout', function(assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: 'Resource Title'
  });

  this.set('resource', resource);

  this.render(hbs`{{content/resources/gru-resource-play resource=resource}}`);

  var $container = this.$("article.content.resources.gru-resource-play");
  assert.ok($container.length, "Component");

  const $header = $container.find('> header');
  const $section = $container.find('> section');
  assert.ok($header.length, "Header");
  assert.ok($header.find('h1').text(), 'Resource Title', "Missing title");
  assert.ok($header.find('.details .format').length, "Missing format");
  assert.ok($header.find('.details .tags').length, "Missing tags");
  assert.ok($header.find('.publisher').length, "Missing publisher");
  assert.ok($section.length, "Missing content section");
});

test('Layout for youtube video', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Youtube Video",
    format: "video",
    url: "https://www.youtube.com/watch?v=hFAOXdXZ5TM"
  });
  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-play resource=resource}}`);

  var $container = this.$("article.content.resources.gru-resource-play");
  assert.ok($container.length, "Component");

  const $section = $container.find('> section');
  assert.ok($section.length, "Missing content section");

  assert.ok($section.find('.gru-youtube-resource').length, "YouTube component");
  assert.ok($section.find('.gru-youtube-resource iframe').length, "YouTube iframe");

});

test('Layout of preview section for vimeo video', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Vimeo Video",
    format: "video",
    url: "https://vimeo.com/channels/staffpicks/107094723"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-play resource=resource}}`);

  var $container = this.$("article.content.resources.gru-resource-play");
  assert.ok($container.length, "Component");

  const $section = $container.find('> section');
  assert.ok($section.length, "Missing content section");

  assert.ok($section.find('.gru-vimeo-resource').length, "Vimeo component");
  assert.ok($section.find('.gru-vimeo-resource iframe').length, "Vimeo iframe");
});

test('Layout for image', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Image",
    format: "image",
    url: "http://example.com/image.png"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-play resource=resource}}`);

  var $container = this.$("article.content.resources.gru-resource-play");
  assert.ok($container.length, "Component");

  const $section = $container.find('> section');
  assert.ok($section.length, "Missing content section");

  assert.ok($section.find('.gru-image-resource').length, "Image component");
  assert.ok($section.find('.gru-image-resource img').length, "Image tag");
});

test('Layout of preview section for audio resource', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Audio",
    format: "audio",
    url: "http://example.com/test.mp3"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-play resource=resource}}`);

  var $container = this.$("article.content.resources.gru-resource-play");
  assert.ok($container.length, "Component");

  const $section = $container.find('> section');
  assert.ok($section.length, "Missing content section");

  assert.ok($section.find('.gru-url-resource').length, "URL resource component");
  assert.ok($section.find('.gru-url-resource iframe').length, "URL resource iframe");
});

test('Layout of preview section for webpage', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Webpage",
    format: "webpage",
    url: "http://example.com/sample.html"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-play resource=resource}}`);

  var $container = this.$("article.content.resources.gru-resource-play");
  assert.ok($container.length, "Component");

  const $section = $container.find('> section');
  assert.ok($section.length, "Missing content section");

  assert.ok($section.find('.gru-url-resource').length, "URL resource component");
  assert.ok($section.find('.gru-url-resource iframe').length, "URL resource iframe");
});

test('Layout of preview section for interactive', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Interactive",
    format: "interactive",
    url: "http://example.com/sample.swf"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-play resource=resource}}`);

  var $container = this.$("article.content.resources.gru-resource-play");
  assert.ok($container.length, "Component");

  const $section = $container.find('> section');
  assert.ok($section.length, "Missing content section");

  assert.ok($section.find('.gru-url-resource').length, "URL resource component");
  assert.ok($section.find('.gru-url-resource iframe').length, "URL resource iframe");
});

test('Layout of preview section for text', function (assert) {
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: "Text resource",
    format: "text",
    url: "http://example.com/sample.pdf"
  });

  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-play resource=resource}}`);

  var $container = this.$("article.content.resources.gru-resource-play");
  assert.ok($container.length, "Component");

  const $section = $container.find('> section');
  assert.ok($section.length, "Missing content section");

  assert.ok($section.find('.gru-pdf-resource').length, "PDF resource component");
  assert.ok($section.find('.gru-pdf-resource iframe').length, "PDF resource iframe");
});