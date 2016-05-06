import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import Course from 'gooru-web/models/content/course';

const courseServiceStub = Ember.Service.extend({

  updateCourse(editedCourse) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (!editedCourse) {
        reject({status: 500});
      } else {
        resolve(editedCourse);
      }
    });
  }

});
moduleForComponent('content/courses/gru-course-edit', 'Integration | Component | content/courses/gru course edit', {
  integration: true,
  beforeEach: function () {
    this.i18n = this.container.lookup('service:i18n');
    this.i18n.set("locale","en");
    this.register('service:api-sdk/course', courseServiceStub);
    this.inject.service('api-sdk/course');
  }
});

test('it has header and main sections', function (assert) {

  var course = Course.create(Ember.getOwner(this).ownerInjection(), {
    title: "Course Title"
  });

  this.set('course', course);
  this.render(hbs`{{content/courses/gru-course-edit course=course}}`);

  var $container = this.$("article.content.courses.gru-course-edit");
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
//test('Update Course Information', function (assert) {
//  assert.expect(1);
//  var newTitle ='Course for testing gooru';
//  var newDescription ='Description for testing gooru';
//  var course = Course.create(Ember.getOwner(this).ownerInjection(), {
//    title: 'Question for testing',
//    description:""
//  });
//  this.set('course',course);
//  this.render(hbs`{{content/courses/gru-course-edit course=course isEditing=true}}`);
//
//  const $component = this.$('.gru-course-edit');
//  const $titleField = $component.find(".gru-input.title");
//
//  $titleField.find("input").val(newTitle);
//  $titleField.find("input").trigger('blur');
//  const $textDescription = $component.find(".gru-textarea.text");
//  $textDescription.find("textarea").val(newDescription);
//  $textDescription.find("textarea").change();
//
//  const $save =  $component.find("#information .actions .save");
//  $save.click();
//  return wait().then(function () {
//    assert.equal($component.find(".title label b").text(),newTitle , "The question title should be updated");
//    const $textDescription = $component.find(".description textarea");
//    $textDescription.blur();
//    assert.equal($textDescription.text(),newDescription , "The question title should be updated");
//  });
//
//});
