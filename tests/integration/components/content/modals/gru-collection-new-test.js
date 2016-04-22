import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

const classServiceMock = Ember.Service.extend({
  associateCourseToClass: function(courseId, classId) {
    if (courseId && classId) {
      return Ember.RSVP.resolve('');
    } else {
      return Ember.RSVP.reject('Course association to class failed');
    }
  }
});

const courseServiceMock = Ember.Service.extend({
  createCourse: function(courseModel) {
    if (courseModel) {
      return Ember.RSVP.resolve(Ember.Object.create({
        id: 'course-id'
      }));
    } else {
      return Ember.RSVP.reject('Course creation failed');
    }
  }
});

const unitServiceMock = Ember.Service.extend({
  createUnit: function(courseId, unitModel) {
    if(unitModel && courseId) {
      return Ember.RSVP.resolve(Ember.Object.create({
        id: 'unit-id'
      }));
    } else {
      return Ember.RSVP.reject('Unit creation failed');
    }
  }
});

const lessonServiceMock = Ember.Service.extend({
  createLesson: function(courseId, unitId, lessonModel) {
    if(courseId && unitId && lessonModel) {
      return Ember.RSVP.resolve(Ember.Object.create({
        id: 'lesson-id'
      }));
    } else {
      return Ember.RSVP.reject('Lesson creation failed');
    }
  },
  associateAssessmentOrCollectionToLesson: function (courseId, unitId, lessonId, collectionId) {
    if(courseId && unitId && lessonId && collectionId) {
      return Ember.RSVP.resolve('');
    }
    return Ember.RSVP.reject('Collection/assessment association to lesson failed');
  }
});

const collectionServiceMock = Ember.Service.extend({
  createCollection: function(collectionModel) {
    if (collectionModel) {
      return Ember.RSVP.resolve(Ember.Object.create({
        id: 'collection-id'
      }));
    } else {
      return Ember.RSVP.reject('Collection creation failed');
    }
  }
});

moduleForComponent('gru-collection-new', 'Integration | Component | gru collection new', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');

    this.register('service:api-sdk/class', classServiceMock);
    this.register('service:api-sdk/course', courseServiceMock);
    this.register('service:api-sdk/unit', unitServiceMock);
    this.register('service:api-sdk/lesson', lessonServiceMock);
    this.register('service:api-sdk/collection', collectionServiceMock);

    this.inject.service('api-sdk/class');
    this.inject.service('api-sdk/course');
    this.inject.service('api-sdk/unit');
    this.inject.service('api-sdk/lesson');
    this.inject.service('api-sdk/collection');
  }
});

test('New Collection Layout', function(assert) {

  this.render(hbs`{{content/modals/gru-collection-new}}`);

  const $component = this.$(".gru-collection-new");
  assert.ok($component, 'Missing Component');
  assert.ok($component.find('h4.modal-title'), 'Missing Title');
  assert.equal($component.find('h4.modal-title').text(), this.get('i18n').t('common.add-collection').string, 'Incorrect Title');
  assert.ok($component.find('label span.required'), 'Missing Collection Title label');
  assert.equal($component.find('label span.required').text(), this.get('i18n').t('common.collection-title').string, 'Incorrect Collection Title Label');
  assert.ok($component.find('label input'), 'Missing Collection Title Input');
  assert.ok($component.find('actions .cancel'), 'Missing Cancel Button');
  assert.ok($component.find('actions .add'), 'Missing Add Button');

});
test('Validate if the collection title field is left blank', function (assert) {
  assert.expect(3);

  this.render(hbs`{{content/modals/gru-collection-new}}`);

  const $component = this.$('.gru-collection-new');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message not visible');

  // Try submitting without filling in data
  $component.find(".actions button[type='submit']").click();

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'Title error should be visible');
    // Fill in the input field
    $titleField.find("input").val('Collection Name');
    $titleField.find("input").blur();

    return wait().then(function () {
      assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message was hidden');
    });
  });
});
test('Validate if the Collection Title field has only whitespaces', function (assert) {
  assert.expect(3);

  this.render(hbs`{{content/modals/gru-collection-new}}`);

  const $component = this.$('.gru-collection-new');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Collection Title error message not visible');

  // Try submitting without filling in data
  $component.find(".actions button[type='submit']").click();

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'Collection Title error should be visible');
    // Fill in the input field
    $titleField.find("input").val(' ');
    $component.find(".actions button[type='submit']").click();

    return wait().then(function () {
      assert.ok($titleField.find(".error-messages .error").length, 'Collection Title error message should be visible');
    });
  });
});
test('Validate the character limit in the Collection title field', function (assert) {
  assert.expect(1);

  this.render(hbs`{{content/modals/gru-collection-new}}`);

  const $component = this.$('.gru-collection-new');
  const $titleField = $component.find(".gru-input.title");

  $titleField.find("input").val('123456790123456790123456790123456790123456790extra');
  $titleField.find("input").blur();

  assert.equal($titleField.find("input").val().length,50, "Incorrect number of incorrect characters");
});

test('Validate quickstart', function (assert) {
  assert.expect(3);

  var transition;

  // Mock the transitionTo method in the router
  this.set('router', {
    transitionTo(route, collectionId) {
      transition = {
        route: route,
        collection: collectionId
      };
    }
  });

  this.set('class', {
    isQuickstart: true,
    class: Ember.Object.create({
      id: 'class-id',
      title: 'class-title'
    })
  });

  this.on('closeModal', function () {
    assert.ok(true, 'closeModal action triggered');
  });

  this.render(hbs`{{content/modals/gru-collection-new model=class router=router}}`);

  const $component = this.$('.gru-collection-new');
  const $titleField = $component.find(".gru-input.title");

  // Fill in the input field
  $titleField.find("input").val('collection-title');
  $titleField.find("input").blur();

  return wait().then(function () {

    $component.find(".actions button[type='submit']").click();

    return wait().then(function () {
      assert.equal(transition.route, 'content.collections.edit', 'Transition to correct route');
      assert.equal(transition.collection, 'collection-id', 'Correct collection ID');
    });
  });
});


test('Validate associating lesson', function (assert) {
  assert.expect(3);

  var transition;

  // Mock the transitionTo method in the router
  this.set('router', {
    transitionTo(route, collectionId) {
      transition = {
        route: route,
        collection: collectionId
      };
    }
  });

  this.set('class', {
    associateLesson: true,
    lessonId: 'lesson-id',
    unitId: 'unit-id',
    courseId: 'course-id'
  });

  this.on('closeModal', function () {
    assert.ok(true, 'closeModal action triggered');
  });

  this.render(hbs`{{content/modals/gru-collection-new model=class router=router}}`);

  const $component = this.$('.gru-collection-new');
  const $titleField = $component.find(".gru-input.title");

  // Fill in the input field
  $titleField.find("input").val('collection-title');
  $titleField.find("input").blur();

  return wait().then(function () {

    // Try submitting without filling in data
    $component.find(".actions button[type='submit']").click();

    return wait().then(function () {
      assert.equal(transition.route, 'content.collections.edit', 'Transition to correct route');
      assert.equal(transition.collection, 'collection-id', 'Correct collection ID');
    });
  });
});
