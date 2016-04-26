import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import BuilderItem from 'gooru-web/models/content/builder/item';
import Lesson from 'gooru-web/models/content/lesson';
import Unit from 'gooru-web/models/content/unit';
import Ember from 'ember';

const unitServiceStub = Ember.Service.extend({

  createUnit(courseId, unit) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (courseId === 'course-id-fail' || !unit) {
        reject({status: 500});
      } else {
        unit.set('id', 'unit-id-123');
        resolve(unit);
      }
    });
  },

  fetchById(courseId, unitId) {
    if (courseId && unitId) {
      let unit = Unit.create(Ember.getOwner(this).ownerInjection(), {
        bigIdeas: 'Big ideas text',
        essentialQuestions: 'Essential questions text',
        id: '123',
        title: 'Sample Unit Name',
        children: [
          Lesson.create(Ember.getOwner(this).ownerInjection(), {
            id: 'lesson-123',
            sequence: 1,
            title: 'Lesson Title A'
          }),
          Lesson.create(Ember.getOwner(this).ownerInjection(), {
            id: 'lesson-456',
            sequence: 2,
            title: 'Lesson Title B'
          })
        ]
      });
      return Ember.RSVP.resolve(unit);
    } else {
      return Ember.RSVP.reject('Fetch failed');
    }
  },

  updateUnit(courseId, unit) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (courseId === 'course-id-fail' || !unit) {
        reject({status: 500});
      } else {
        resolve(unit);
      }
    });
  }

});

moduleForComponent('content/courses/gru-accordion-unit', 'Integration | Component | content/courses/gru accordion unit', {
  integration: true,

  beforeEach: function () {
    this.inject.service('i18n');

    this.register('service:api-sdk/unit', unitServiceStub);
    this.inject.service('api-sdk/unit');
  }
});

test('it renders a form for a new unit', function (assert) {

  const unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: ''
    }),
    isEditing: true
  });

  this.set('unit', unit);
  this.set('totalItems', 3);
  this.render(hbs`{{content/courses/gru-accordion-unit model=unit totalItems=3}}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit');
  assert.ok($component.length, 'Component');
  assert.ok($component.hasClass('edit'), 'Edit class');

  const $heading = $component.find('.edit .panel-heading');
  assert.ok($heading.find('h3').text(), this.get('i18n').t('common.unit').string + " " + this.get('totalItems'), 'Header prefix');
  assert.ok($heading.find('.title').text(), '', 'Empty title');
  assert.equal($heading.find('.actions button').length, 2, 'Unit header action buttons');
  assert.ok($heading.find('.actions button:eq(0)').hasClass('cancel'), 'First button is cancel');
  assert.ok($heading.find('.actions button:eq(1)').hasClass('save'), 'Second button is save');

  const $panelBody = $component.find('.edit .panel-body');
  assert.ok($panelBody.find('> .row .col-sm-6 label textarea').length, 2, 'Text areas');
  assert.ok($panelBody.find('> .data-row.domain').length, 'Domain');
});

test('it can create a new unit', function (assert) {

  const title = 'New Unit';

  var unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: ''
    }),
    isEditing: false
  });

  this.set('unit', unit);
  this.set('courseId', 'course-id-123');
  this.render(hbs`{{content/courses/gru-accordion-unit
    courseId=courseId
    model=unit }}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit');
  assert.ok($component.length, 'Component');
  assert.ok($component.hasClass('view'), 'View mode');

  const $editButton = $component.find('.view .detail .item-actions .btn.edit-item');

  Ember.run(() => {
    $editButton.click();
  });

  assert.ok($component.hasClass('edit'), 'Edit mode');

  // Form has current unit values
  const $panelBody = $component.find('.edit .panel-body');

  assert.equal($component.find('.edit .panel-heading .title input').val(), '', 'Unit title');
  assert.equal($panelBody.find('.big-ideas label textarea').val(), '', 'Big ideas text');
  assert.equal($panelBody.find('.essential-questions label textarea').val(), '', 'Essential questions text');

  $component.find('.edit .panel-heading .title input').val(title);
  $component.find('.edit .panel-heading .title input').blur();

  const $saveButton = $component.find('.edit .panel-heading .actions button:eq(1)');

  Ember.run(() => {
    $saveButton.click();
  });

  const $heading = $component.find('.view .panel-heading');
  assert.equal($heading.find('strong').text(), title, 'Unit title updated');

  unit = this.get('unit');
  assert.equal(unit.get('data.id'), 'unit-id-123', 'Unit ID updated after saving');
  assert.equal(unit.get('isEditing'), false, 'Unit is no longer editable');
});

test('it can edit an existing unit', function (assert) {

  const title = 'Unit Title Updated';

  var unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: 'unit-123',
      title: 'Unit Title',
      bigIdeas: 'Big ideas text',
      essentialQuestions: 'Essential questions text'
    }),
    isEditing: false
  });

  this.set('unit', unit);
  this.set('courseId', 'course-id-123');
  this.render(hbs`{{content/courses/gru-accordion-unit
    courseId=courseId
    model=unit }}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit');
  assert.ok($component.length, 'Component');
  assert.ok($component.hasClass('view'), 'View mode');

  const $editButton = $component.find('.view .detail .item-actions .btn.edit-item');

  Ember.run(() => {
    $editButton.click();
  });

  assert.ok($component.hasClass('edit'), 'Edit mode');

  // Form has current unit values
  const $panelBody = $component.find('.edit .panel-body');

  assert.equal($component.find('.edit .panel-heading .title input').val(), unit.get('data.title'), 'Unit title');
  assert.equal($panelBody.find('.big-ideas label textarea').val(), unit.get('data.bigIdeas'), 'Big ideas text');
  assert.equal($panelBody.find('.essential-questions label textarea').val(), unit.get('data.essentialQuestions'), 'Essential questions text');

  $component.find('.edit .panel-heading .title input').val(title);
  $component.find('.edit .panel-heading .title input').blur();

  const $saveButton = $component.find('.edit .panel-heading .actions button:eq(1)');

  Ember.run(() => {
    $saveButton.click();
  });

  const $heading = $component.find('.view .panel-heading');
  assert.equal($heading.find('strong').text(), title, 'Unit title updated');
  assert.equal(unit.get('isEditing'), false, 'Unit is no longer editable');

});

test('it shows an error message if it fails to create a new unit', function (assert) {
  assert.expect(2);

  const context = this;

  // Mock notifications service
  this.register('service:notifications', Ember.Service.extend({
    error(message) {
      assert.equal(message, context.get('i18n').t('common.errors.unit-not-created').string, 'Notification displayed');
    }
  }));
  this.inject.service('notifications');

  const unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: ''
    }),
    isEditing: true
  });

  this.set('unit', unit);
  this.set('courseId', 'course-id-fail');
  this.render(hbs`{{content/courses/gru-accordion-unit
    courseId=courseId
    model=unit }}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit');
  assert.ok($component.length, 'Component');

  const $saveButton = $component.find('.edit .panel-heading .actions button:eq(1)');
  $saveButton.click();
});

test('it renders a form when editing an existing unit', function (assert) {
  const unitData = {
    bigIdeas: 'Big ideas text',
    essentialQuestions: 'Essential questions text',
    id: '123',
    title: 'Sample Unit Name'
  };

  // Unit model
  const unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), unitData),
    isEditing: true
  });

  const tempUnit = Unit.create(Ember.getOwner(this).ownerInjection(), unitData);

  this.set('unit', unit);
  this.set('tempUnit', tempUnit);
  this.set('index', 2);
  this.render(hbs`{{content/courses/gru-accordion-unit model=unit tempUnit=tempUnit index=index}}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit');
  assert.ok($component.length, 'Component');
  assert.ok($component.hasClass('edit'), 'Edit class');

  const $heading = $component.find('.edit .panel-heading');
  assert.ok($heading.find('h3').text(), this.get('i18n').t('common.unit').string + " " + this.get('index'), 'Header prefix');
  assert.ok($heading.find('.gru-input.title').text(), unit.get('data.title'), 'Unit title');
  assert.equal($heading.find('.actions button').length, 2, 'Unit header action buttons');
  assert.ok($heading.find('.actions button:eq(0)').hasClass('cancel'), 'First button is cancel');
  assert.ok($heading.find('.actions button:eq(1)').hasClass('save'), 'Second button is save');

  const $panelBody = $component.find('.edit .panel-body');
  assert.ok($panelBody.find('> .row .col-sm-6 label textarea').length, 2, 'Text areas');
  assert.equal($panelBody.find('.big-ideas textarea').val(), tempUnit.get('bigIdeas'), 'First textarea content');
  assert.equal($panelBody.find('.essential-questions textarea').val(), tempUnit.get('essentialQuestions'), 'Second textarea content');

  assert.ok($panelBody.find('> .data-row.domain').length, 'Domain');
});

test('it triggers an external event when clicking cancel on a new unsaved unit', function (assert) {
  assert.expect(1);

  const unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: ''
    }),
    isEditing: true
  });

  this.on('externalAction', function () {
    assert.ok(true);
  });

  this.set('unit', unit);
  this.render(hbs`{{content/courses/gru-accordion-unit model=unit onCancelAddUnit=(action 'externalAction')}}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit');
  $component.find('.edit .actions button.cancel').click();
});

test('it renders the unit correctly, if the unit has no lessons -view mode', function (assert) {

  const unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: '123',
      title: 'Sample Unit Name',
      sequence: 1
    }),
    isEditing: false
  });

  this.set('unit', unit);
  this.render(hbs`{{content/courses/gru-accordion-unit model=unit }}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit');
  assert.ok($component.length, 'Component');
  assert.ok($component.hasClass('view'), 'View class');

  const $heading = $component.find('.view .panel-heading');
  assert.ok($heading.find('h3').text(), this.get('i18n').t('common.unit').string + " " + unit.get('sequence'), 'Header prefix');
  assert.ok($heading.find('strong').text(), unit.get('title'), 'Unit title');
  assert.equal($heading.find('.detail > span').text(), this.get('i18n').t('common.add-lessons').string, 'Lesson text');
  assert.equal($heading.find('.actions button').length, 6, 'Unit header action buttons');
  assert.ok($heading.find('.actions button:eq(0)').hasClass('add-item'), 'First button is for adding a lesson');
  assert.ok($heading.find('.actions button:eq(1)').hasClass('sort-items'), 'Second button is for reordering the lessons');
  assert.ok($heading.find('.actions button:eq(2)').hasClass('edit-item'), 'Third button is for editing the unit');
  assert.ok($heading.find('.actions button:eq(3)').hasClass('copy-item'), 'Fourth button is for copying the unit');
  assert.ok($heading.find('.actions button:eq(4)').hasClass('move-item'), 'Fifth button is for moving the unit');
  assert.ok($heading.find('.actions button:eq(5)').hasClass('delete-item'), 'Sixth button is for deleting the unit');

  const $lessonList = $component.find('.view .panel-body ol.accordion-unit');
  assert.ok($lessonList.length, 'Lesson list');
  assert.equal($lessonList.find('li.lesson').length, 1, 'Number of lessons by default');
  assert.ok($lessonList.find('li:eq(0)').hasClass('add-item'), 'Default lesson');
});

test('it expands/collapses the unit -view mode', function (assert) {

  const unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: '123'
    }),
    isEditing: false,
    isExpanded: false
  });

  this.on('externalAction', function () {
    assert.ok(true);
  });

  this.set('courseId', 'course-id-123');
  this.set('unit', unit);
  this.render(hbs`
    {{content/courses/gru-accordion-unit
      courseId=courseId
      model=unit
      onExpandUnit=(action 'externalAction') }}
    `);

  const $container = this.$('.content.courses.gru-accordion.gru-accordion-unit > .view');
  assert.ok($container.length, 'Container');
  assert.ok($container.hasClass('collapsed'), 'Container collapsed');


  $container.find('> .panel-heading > h3 > a').click();
  assert.ok($container.hasClass('expanded'), 'Container expanded after clicking header prefix');


  $container.find('> .panel-heading > h3 > a').click();
  assert.ok($container.hasClass('collapsed'), 'Container collapsed after clicking header prefix');


  $container.find('> .panel-heading > strong > a').click();
  assert.ok($container.hasClass('expanded'), 'Container expanded after clicking header title');


  $container.find('> .panel-heading > strong > a').click();
  assert.ok($container.hasClass('collapsed'), 'Container collapsed after clicking header title');


  $container.find('> .panel-heading .actions .add-item').click();
  assert.ok($container.hasClass('expanded'), 'Container expanded after clicking the add button');


  $container.find('> .panel-heading .actions .add-item').click();
  assert.ok(!$container.hasClass('collapsed'), 'Container should remain expanded after clicking the add button');
});

test('it loads lessons and renders them after clicking on the unit name', function (assert) {
  const unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: '123',
      lessonCount: 2
    }),
    isEditing: false,
    isExpanded: false
  });

  //onExpandUnit action must be defined
  this.on('externalAction', function () {});

  this.set('courseId', 'course-id-123');
  this.set('unit', unit);
  this.set('isLoaded', false);  // Binding to check on the state
  this.render(hbs`
    {{content/courses/gru-accordion-unit
      courseId=courseId
      model=unit
      isLoaded=isLoaded
      onExpandUnit=(action 'externalAction') }}
    `);

  const $container = this.$('.content.courses.gru-accordion.gru-accordion-unit > .view');
  assert.ok($container.hasClass('collapsed'), 'Container collapsed');
  assert.ok(!this.get('isLoaded'), 'Data not loaded');

  $container.find('> .panel-heading > strong > a').click();
  assert.ok($container.hasClass('expanded'), 'Container expanded');
  assert.equal($container.find('.accordion-unit > li.gru-accordion-lesson').length, 2, 'Number of lessons loaded');
  assert.ok(this.get('isLoaded'), 'Data was loaded');
});
