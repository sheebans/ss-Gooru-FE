import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Question from 'gooru-web/models/content/question';
import Ember from 'ember';

moduleForComponent('content/questions/gru-questions-edit', 'Integration | Component | content/questions/gru questions edit', {
  integration: true,
  beforeEach: function () {
    this.i18n = this.container.lookup('service:i18n');
    this.i18n.set("locale","en");
  }
});

test('it has header and main sections', function (assert) {

  this.render(hbs`{{content/questions/gru-questions-edit}}`);

  var $container = this.$("article.content.questions.gru-questions-edit");
  assert.ok($container.length, "Component");

  const $header = $container.find('> header');
  assert.ok($header.length, "Header");
  assert.ok($header.find('> .actions').length, "Header actions");
  assert.equal($header.find('> .actions > button').length, 4, "Number of header actions");
  assert.ok($container.find('.actions button.delete').length, "Missing Delete Button");
  assert.ok($container.find('.actions button.share').length, "Missing Share Button");
  assert.ok($container.find('.actions button.add').length, "Missing Add Button");
  assert.ok($container.find('.actions button.preview').length, "Missing Add Button");

  assert.ok($header.find('> nav').length, "Header navigation");
  assert.equal($header.find('> nav > a').length, 3, "Number of header navigation links");

  assert.equal($container.find('> section').length, 3, "Number of edit sections");
  assert.ok($container.find('> section#information').length, "Information section");
  assert.ok($container.find('> section#builder').length, "Builder section");
  assert.ok($container.find('> section#settings').length, "Settings section");
});

test('Update Question', function (assert) {
  assert.expect(1);
  var newTitle ='Question for testing gooru';
  var question = Question.create(Ember.getOwner(this).ownerInjection(), {
    title: 'Question for testing'
  });
  this.set('question',question);

  this.render(hbs`{{content/questions/gru-questions-edit isEditing=true tempQuestion=question}}`);

  const $component = this.$('.gru-questions-edit');
  const $titleField = $component.find(".gru-input.title");

  $titleField.find("input").val(newTitle);
  $titleField.find("input").trigger('blur');

  const $save =  $component.find("#information .actions .save");
  $save.click();
  return wait().then(function () {
    assert.equal($component.find(".title label b").text(),newTitle , "The question title should be updated");
  });

});

test('Layout of the information section', function (assert) {
  this.render(hbs`{{content/questions/gru-questions-edit}}`);

  var $settingsSection = this.$("#information");
  assert.ok($settingsSection.find('.header h2').length, "Information title missing");
  assert.ok($settingsSection.find('.panel-body .title label b').length, "Missing title label");
  assert.ok($settingsSection.find('.panel-body .question-types').length, "Missing question types");
  assert.ok($settingsSection.find('.panel-body .standards label').length, "Missing standards");
});

test('Layout of the information section editing mode', function (assert) {
  this.render(hbs`{{content/questions/gru-questions-edit isEditing=true}}`);

  var $settingsSection = this.$("#information");
  assert.ok($settingsSection.find('.header h2').length, "Information title missing");
  assert.ok($settingsSection.find('.panel-body .title label .gru-input').length, "Missing title input");
  assert.ok($settingsSection.find('.panel-body .question-types .btn-group .dropdown-toggle').length, "Missing question types dropdown");
  assert.ok($settingsSection.find('.panel-body .standards button.add-prefix').length, "Missing add standards button");
});

test('Validate if the question title field is left blank', function (assert) {
  assert.expect(3);
  var question = Question.create(Ember.getOwner(this).ownerInjection(), {
    title: null
  });
  this.set('question',question);
  this.render(hbs`{{content/questions/gru-questions-edit isEditing=true tempQuestion=question}}`);

  const $component = this.$('.gru-questions-edit');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message not visible');

  $titleField.find("input").trigger('blur');

  return wait().then(function () {
    assert.ok($titleField.find(".error-messages .error").length, 'Title error should be visible');
    $titleField.find("input").val('Question Name');

    $titleField.find("input").trigger('blur');


    return wait().then(function () {
      assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message was hidden');
    });
  });
});

test('Validate if the Question Title field has only whitespaces', function (assert) {
  assert.expect(3);
  var question = Question.create(Ember.getOwner(this).ownerInjection(), {
    title: null
  });
  this.set('question',question);

  this.render(hbs`{{content/questions/gru-questions-edit isEditing=true tempQuestion=question}}`);

  const $component = this.$('.gru-questions-edit');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Question Title error message not visible');

  $titleField.find("input").trigger('blur');

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'Question Title error should be visible');
    // Fill in the input field
    $titleField.find("input").val(' ');
    $titleField.find("input").trigger('blur');

    return wait().then(function () {
      assert.ok($titleField.find(".error-messages .error").length, 'Question Title error message should be visible');
    });
  });
});

test('Validate the character limit in the Question title field', function (assert) {
  assert.expect(1);
  var question = Question.create(Ember.getOwner(this).ownerInjection(), {
    title: null
  });
  this.set('question',question);

  this.render(hbs`{{content/questions/gru-questions-edit isEditing=true tempQuestion=question}}`);

  const $component = this.$('.gru-questions-edit');
  const $titleField = $component.find(".gru-input.title");

  $titleField.find("input").val('123456790123456790123456790123456790123456790extra');
  $titleField.find("input").trigger('blur');

  assert.equal($titleField.find("input").val().length,50, "Incorrect number of incorrect characters");
});

test('Layout of the builder section', function (assert) {
  this.render(hbs`{{content/questions/gru-questions-edit}}`);

  var $builderSection = this.$("#builder");
  assert.ok($builderSection.find('.header h2').length, "Builder title missing");
  assert.ok($builderSection.find('.panel-heading h3').length, "Missing Question label");
  assert.ok($builderSection.find('.panel-heading .instructions').length, "Missing Instructions");
  assert.ok($builderSection.find('.panel-body .text-empty').length, "Missing text empty message");
});
test('Builder Edit', function (assert) {
  assert.expect(8);
  var question = Question.create(Ember.getOwner(this).ownerInjection(), {
    title: null,
    type:'MC'
  });
  this.set('question',question);

  this.render(hbs`{{content/questions/gru-questions-edit isBuilderEditing=true question=question}}`);

  var $builderSection = this.$("#builder");
  assert.ok($builderSection.find('.actions .save').length, "Save button missing");
  assert.ok($builderSection.find('.actions .cancel').length, "Cancel button missing");
  assert.ok($builderSection.find('.header h2').length, "Builder title missing");
  assert.ok($builderSection.find('.panel-heading h3').length, "Missing Question label");
  assert.equal($builderSection.find('.header h2').text(),"Builder - "+ this.i18n.t('common.question-type.'+question.type).toString(), "Missing Question label");
  assert.ok($builderSection.find('.panel-heading .instructions').length, "Missing Instructions");
  assert.ok($builderSection.find('.panel-body textarea').length, "Missing text area");
  assert.ok($builderSection.find('.panel-body .add-image').length, "Missing add image button");
});

test('Layout of the settings section', function (assert) {
  this.render(hbs`{{content/questions/gru-questions-edit}}`);

  var $settingsSection = this.$("#settings");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel-heading h3').length, "Panel subtitle");
  assert.ok($settingsSection.find('.panel-body .setting.publish-to i.visibility').length, "Visibility icon");
  assert.ok($settingsSection.find('.panel-body .setting.publish-to i.visibility + span').length, "Visibility label");
  assert.ok($settingsSection.find('.panel-body .gru-switch .toggle').length, "Profile toggle button");
  assert.ok($settingsSection.find('.panel-body .setting.request-to i.public').length, "Public icon");
  assert.ok($settingsSection.find('.panel-body .setting.request-to i.public + span').length, "Public label");
});
