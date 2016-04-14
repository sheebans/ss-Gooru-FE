import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import BuilderItem from 'gooru-web/models/content/builder/item';
import Lesson from 'gooru-web/models/content/lesson';
import Ember from 'ember';

const lessonServiceStub = Ember.Service.extend({

  createLesson(courseId, unitId, lesson) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (courseId === 'course-id-fail' || !unitId || !lesson) {
        reject({status: 500});
      } else {
        lesson.set('id', 'lesson-id-123');
        resolve(lesson);
      }
    });
  }
});

moduleForComponent('content/courses/gru-accordion-lesson', 'Integration | Component | content/courses/gru accordion lesson', {
  integration: true,

  beforeEach: function () {
    this.inject.service('i18n');

    this.register('service:api-sdk/lesson', lessonServiceStub);
    this.inject.service('api-sdk/lesson');
  }
});

test('it renders a form for creating a new lesson', function (assert) {

  const lesson = BuilderItem.create({
    data: Lesson.create(Ember.getOwner(this).ownerInjection(), {
      id: ''
    }),
    isEditing: true
  });

  this.set('lesson', lesson);
  this.set('totalItems', 3);
  this.render(hbs`{{content/courses/gru-accordion-lesson model=lesson totalItems=3}}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-lesson');
  assert.ok($component.length, 'Component');
  assert.ok($component.hasClass('edit'), 'Edit class');

  const $heading = $component.find('.edit .panel-heading');
  assert.ok($heading.find('h3').text(), this.get('i18n').t('common.lesson').string + " " + this.get('totalItems'), 'Header prefix');
  assert.equal($heading.find('.actions button').length, 2, 'Unit header action buttons');
  assert.ok($heading.find('.actions button:eq(0)').hasClass('cancel'), 'First button is cancel');
  assert.ok($heading.find('.actions button:eq(1)').hasClass('save'), 'Second button is save');

  const $panelBody = $component.find('.edit .panel-body');
  assert.equal($panelBody.find('> .data-row').length, 1, 'Standards');
});

test('it can create a new lesson', function (assert) {

  var lesson = BuilderItem.create({
    data: Lesson.create(Ember.getOwner(this).ownerInjection(), {
      id: 0
    }),
    isEditing: true
  });

  this.set('lesson', lesson);
  this.set('unitId', 'unit-id-123');
  this.set('courseId', 'course-id-123');
  this.render(hbs`{{content/courses/gru-accordion-lesson
    courseId=courseId
    unitId=unitId
    model=lesson }}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-lesson');
  assert.ok($component.length, 'Component');

  const $saveButton = $component.find('.edit .panel-heading .actions button:eq(1)');
  $saveButton.click();

  lesson = this.get('lesson');
  assert.equal(lesson.get('data.id'), 'lesson-id-123', 'Lesson ID updated after saving');
  assert.equal(lesson.get('isEditing'), false, 'Lesson is no longer editable');
});

test('it shows an error message if it fails to create a new lesson', function (assert) {
  assert.expect(2);

  const context = this;

  // Mock notifications service
  this.register('service:notifications', Ember.Service.extend({
    error(message) {
      assert.equal(message, context.get('i18n').t('common.errors.lesson-not-created').string, 'Notification displayed');
    }
  }));
  this.inject.service('notifications');

  var lesson = BuilderItem.create({
    data: Lesson.create(Ember.getOwner(this).ownerInjection(), {
      id: ''
    }),
    isEditing: true
  });

  this.set('lesson', lesson);
  this.set('unitId', 'unit-id-123');
  this.set('courseId', 'course-id-fail');
  this.render(hbs`{{content/courses/gru-accordion-lesson
    courseId=courseId
    unitId=unitId
    model=lesson }}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-lesson');
  assert.ok($component.length, 'Component');

  const $saveButton = $component.find('.edit .panel-heading .actions button:eq(1)');
  $saveButton.click();
});

// TODO: Adapt this test to work for editing an existing lesson
//test('it renders a form when editing an existing lesson', function (assert) {
//
//  // Unit model
//  const lesson = BuilderItem.create({
//    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
//      bigIdeas: 'Big ideas text',
//      essentialQuestions: 'Essential questions text',
//      id: 123,
//      title: 'Sample Unit Name',
//      sequence: 1
//    }),
//    isEditing: true
//  });
//
//  this.set('lesson', lesson);
//  this.render(hbs`{{content/courses/gru-accordion-lesson model=lesson }}`);
//
//  const $component = this.$('.content.courses.gru-accordion.gru-accordion-lesson');
//  assert.ok($component.length, 'Component');
//  assert.ok($component.hasClass('edit'), 'Edit class');
//
//  const $heading = $component.find('.edit .panel-heading');
//  assert.ok($heading.find('h3').text(), this.get('i18n').t('common.lesson').string + " " + lesson.get('data.sequence'), 'Header prefix');
//  assert.ok($heading.find('.gru-input.title').text(), lesson.get('data.title'), 'Unit title');
//  assert.equal($heading.find('.actions button').length, 2, 'Unit header action buttons');
//  assert.ok($heading.find('.actions button:eq(0)').hasClass('cancel'), 'First button is cancel');
//  assert.ok($heading.find('.actions button:eq(1)').hasClass('save'), 'Second button is save');
//
//  const $panelBody = $component.find('.edit .panel-body');
//  assert.ok($panelBody.find('> .row .col-sm-6 label textarea').length, 2, 'Text areas');
//  assert.equal($panelBody.find('> .row .col-sm-6:eq(0) textarea').val(), lesson.get('data.bigIdeas'), 'First textarea content');
//  assert.equal($panelBody.find('> .row .col-sm-6:eq(1) textarea').val(), lesson.get('data.essentialQuestions'), 'Second textarea content');
//
//  assert.ok($panelBody.find('> .domain').length, 'Domain');
//});

test('it triggers an external event when clicking cancel on a new unsaved lesson', function (assert) {
  assert.expect(1);

  const lesson = BuilderItem.create({
    data: Lesson.create(Ember.getOwner(this).ownerInjection(), {
      id: ''
    }),
    isEditing: true
  });

  this.on('externalAction', function () {
    assert.ok(true);
  });

  this.set('lesson', lesson);
  this.render(hbs`{{content/courses/gru-accordion-lesson model=lesson onCancelAddLesson=(action 'externalAction')}}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-lesson');
  $component.find('.edit .actions button.cancel').click();
});

test('it renders the lesson correctly, if the lesson has no collections/assessments -view mode', function (assert) {

  const lesson = BuilderItem.create({
    data: Lesson.create(Ember.getOwner(this).ownerInjection(), {
      id: 123,
      title: 'Sample Lesson Name'
    }),
    isEditing: false
  });

  this.set('lesson', lesson);
  this.set('index', 2);
  this.render(hbs`{{content/courses/gru-accordion-lesson model=lesson index=index}}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-lesson');
  assert.ok($component.length, 'Component');
  assert.ok($component.hasClass('view'), 'View class');

  const $heading = $component.find('.view .panel-heading');
  assert.ok($heading.find('h3').text(), this.get('i18n').t('common.lesson').string + " " + this.get('index'), 'Header prefix');
  assert.ok($heading.find('strong').text(), lesson.get('title'), 'Unit title');
  assert.equal($heading.find('.detail > span').text(), this.get('i18n').t('common.add').string, 'Lesson text');
  assert.equal($heading.find('.actions button').length, 6, 'Unit header action buttons');
  assert.ok($heading.find('.actions button:eq(0)').hasClass('add-item'), 'First button is for adding a lesson');
  assert.ok($heading.find('.actions button:eq(1)').hasClass('sort-items'), 'Second button is for reordering the lessons');
  assert.ok($heading.find('.actions button:eq(2)').hasClass('edit-item'), 'Third button is for editing the lesson');
  assert.ok($heading.find('.actions button:eq(3)').hasClass('copy-item'), 'Fourth button is for copying the lesson');
  assert.ok($heading.find('.actions button:eq(4)').hasClass('move-item'), 'Fifth button is for moving the lesson');
  assert.ok($heading.find('.actions button:eq(5)').hasClass('delete-item'), 'Sixth button is for deleting the lesson');

  const $lessonList = $component.find('.view .panel-body ol.accordion-lesson');
  assert.ok($lessonList.length, 'Lesson list');
  //assert.equal($lessonList.find('li.lesson').length, 1, 'Number of lessons by default');
  //assert.ok($lessonList.find('li:eq(0)').hasClass('add-item'), 'Default lesson');
});

//test('it expands/collapses the lesson -view mode', function (assert) {
//
//  const lesson = BuilderItem.create({
//    data: Lesson.create(Ember.getOwner(this).ownerInjection(), {
//      id: 123
//    }),
//    isEditing: false,
//    isExpanded: false
//  });
//
//  this.on('externalAction', function () {
//    assert.ok(true);
//  });
//
//  this.set('lesson', lesson);
//  this.render(hbs`{{content/courses/gru-accordion-lesson model=lesson onExpandUnit=(action 'externalAction') }}`);
//
//  const $container = this.$('.content.courses.gru-accordion.gru-accordion-lesson > .view');
//  assert.ok($container.length, 'Container');
//  assert.ok($container.hasClass('collapsed'), 'Container collapsed');
//
//  $container.find('.panel-heading > h3 > a').click();
//  assert.ok($container.hasClass('expanded'), 'Container expanded after clicking header prefix');
//
//  $container.find('.panel-heading > h3 > a').click();
//  assert.ok($container.hasClass('collapsed'), 'Container collapsed after clicking header prefix');
//
//  $container.find('.panel-heading > strong > a').click();
//  assert.ok($container.hasClass('expanded'), 'Container expanded after clicking header title');
//
//  $container.find('.panel-heading > strong > a').click();
//  assert.ok($container.hasClass('collapsed'), 'Container collapsed after clicking header title');
//
//  $container.find('.panel-heading .actions .add-item').click();
//  assert.ok($container.hasClass('expanded'), 'Container expanded after clicking the add button');
//
//  $container.find('.panel-heading .actions .add-item').click();
//  assert.ok(!$container.hasClass('collapsed'), 'Container should remain expanded after clicking the add button');
//});
//
//test('it loads lessons and renders them after clicking on the unit name', function (assert) {
//  // TODO: Complete this
//  assert.expect(0);
//});
//
//test('it only loads lessons once after clicking on the unit name', function (assert) {
//  // TODO: Complete this
//  assert.expect(0);
//});
