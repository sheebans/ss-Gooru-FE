import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
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

test('Layout of the information section', function (assert) {
  this.render(hbs`{{content/resources/gru-resource-edit}}`);

  var $informationSection = this.$("#information");
  assert.ok($informationSection.find('.header h2').length, "Information title missing");
  assert.ok($informationSection.find('.panel-body .title label b').length, "Missing title label");
  assert.ok($informationSection.find('.panel-body .publisher label b').length, "Missing publisher label");
  assert.ok($informationSection.find('.panel-body .type label b').length, "Missing type label");
  assert.ok($informationSection.find('.panel-body .license label b').length, "Missing license label");
  assert.ok($informationSection.find('.panel-body .description label b').length, "Missing description label");
  assert.ok($informationSection.find('.panel-body .standards label b').length, "Missing standards label");
});

test('Layout of the information section on edit mode', function (assert) {
  this.render(hbs`{{content/resources/gru-resource-edit isEditing=true}}`);
  var $informationSection = this.$("#information");
  assert.ok($informationSection.find('.header h2').length, "Information title missing");
  assert.ok($informationSection.find('.panel-body label .gru-input.title').length, "Missing title label");
  assert.ok($informationSection.find('.panel-body .publisher label input[type=text]').length, "Missing publisher label");
  assert.ok($informationSection.find('.panel-body .publisher label input[type=checkbox]').length, "Missing I'm publisher checkbox");
  assert.ok($informationSection.find('.panel-body .type .btn-group .dropdown-toggle').length, "Missing type dropdown");
  assert.ok($informationSection.find('.panel-body .license label select').length, "Missing license select");
  assert.ok($informationSection.find('.panel-body .description label textarea').length, "Missing description textarea");
  assert.ok($informationSection.find('.panel-body .standards label button').length, "Missing standards button");
});

test('Update Resource Information', function (assert) {
  assert.expect(1);
  var newTitle ='Edited resource for testing';
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: 'Resource for testing'
  });
  this.set('resource', resource);
  this.render(hbs`{{content/resources/gru-resource-edit isEditing=true tempResource=resource}}`);

  const $component = this.$('.gru-resource-edit');
  const $titleField = $component.find(".gru-input.title");

  $titleField.find("input").val(newTitle);
  $titleField.find("input").trigger('blur');

  const $save =  $component.find("#information .actions .save");
  $save.click();
  return wait().then(function () {
    assert.equal($component.find(".title label b").text(), newTitle, "The resource title should be updated");
  });
});

test('Validate if the resource title field is left blank', function (assert) {
  assert.expect(3);
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: null
  });
  this.set('resource',resource);
  this.render(hbs`{{content/resources/gru-resource-edit isEditing=true tempResource=resource}}`);

  const $component = this.$('.gru-resource-edit');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message not visible');

  $titleField.find("input").trigger('blur');

  return wait().then(function () {
    assert.ok($titleField.find(".error-messages .error").length, 'Title error should be visible');
    $titleField.find("input").val('Resource Name');

    $titleField.find("input").trigger('blur');

    return wait().then(function () {
      assert.notOk($titleField.find(".error-messages .error").length, 'Title error message was hidden');
    });
  });
});

test('Validate if the Resource Title field has only whitespaces', function (assert) {
  assert.expect(3);
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: null
  });
  this.set('resource', resource);

  this.render(hbs`{{content/resources/gru-resource-edit isEditing=true tempResource=resource}}`);

  const $component = this.$('.gru-resource-edit');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Resource Title error message not visible');

  $titleField.find("input").trigger('blur');

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'Resource Title error should be visible');
    // Fill in the input field
    $titleField.find("input").val(' ');
    $titleField.find("input").trigger('blur');

    return wait().then(function () {
      assert.ok($titleField.find(".error-messages .error").length, 'Resource Title error message should be visible');
    });
  });
});

test('Validate the character limit in the Resource title field', function (assert) {
  assert.expect(1);
  var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {
    title: null
  });
  this.set('resource',resource);

  this.render(hbs`{{content/resources/gru-resource-edit isEditing=true tempResource=resource}}`);

  const $component = this.$('.gru-resource-edit');
  const $titleField = $component.find(".gru-input.title");

  $titleField.find("input").val('123456790123456790123456790123456790123456790extra');
  $titleField.find("input").trigger('blur');

  assert.equal($titleField.find("input").val().length,50, "Incorrect number of incorrect characters");
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
