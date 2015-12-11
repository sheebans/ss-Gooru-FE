import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';
import DS from 'ember-data';

// Stub unit service
const collectionServiceStub = Ember.Service.extend({

  findByClassAndCourseAndUnitAndLesson(classId, courseId, unitId, lessonId) {
    var response;
    var promiseResponse;

    if (classId === '111-333-555' &&
          courseId === '222-444-666' &&
            unitId === '777-999' && lessonId === '888-000') {
      response = [
        {
          "title": "Collection 1",
          "visibility": true
        },
        {
          "title": "Collection 2",
          "visibility": false
        },
        {
          "title": "Collection 3",
          "visibility": true
        }
      ];
    } else {
      response = [];
    }

    promiseResponse = new Ember.RSVP.Promise(function(resolve) {
      Ember.run.next(this, function() {
        resolve(response);
      });
    });

    // Simulate async data returned by the service
    return DS.PromiseArray.create({
      promise: promiseResponse
    });
  }

});

moduleForComponent('class/overview/gru-accordion-lesson', 'Integration | Component | class/overview/gru accordion lesson', {
  integration: true,

  beforeEach: function() {
    this.register('service:api-sdk/collection', collectionServiceStub);
    this.inject.service('api-sdk/collection', { as: 'collectionService' });
    this.inject.service('i18n');
  }
});

test('it renders', function(assert) {
  const context = this;

  // Class with no collections per stub
  const currentClass = Ember.Object.create({
    id: "111-111-111",
    course: "999-999-999"
  });

  // Lesson model
  const lesson = Ember.Object.create({
    id: "888-000",
    title: 'Lesson Title'
  });

  this.set('currentClass', currentClass);
  this.set('unitId', '777-999');
  this.set('lesson', lesson);
  this.set('index', 0);

  this.render(hbs`{{class/overview/gru-accordion-lesson
                    currentClass=currentClass
                    unitId=unitId
                    model=lesson
                    index=index }}`);

  const $component = this.$('.gru-accordion-lesson');
  assert.ok($component.length, 'Component does not have the component class');
  assert.ok($component.hasClass('panel'), 'Component should have the class "panel"');
  assert.ok($component.hasClass('panel-default'), 'Component should have the class "panel-default"');

  const $lessonHeading = $component.find('> .panel-heading');
  assert.ok($lessonHeading.length, 'Panel heading element is missing');

  const $lessonImage = $lessonHeading.find('> .img-circle');
  assert.ok($lessonImage.length, 'Image element is missing');

  const $lessonTitle = $lessonHeading.find('> .panel-title');
  assert.ok($lessonTitle.length, 'Panel title element is missing');

  const $lessonTitleAnchor = $lessonTitle.find('> a');
  assert.ok($lessonTitleAnchor.length, 'Title anchor element is missing');
  assert.ok($lessonTitleAnchor.hasClass('collapsed'), 'Panel should be collapsed by default');
  assert.equal($lessonTitleAnchor.text().trim(), 'L1: Lesson Title', 'Wrong title text');

  const $collapsePanel = $component.find('> .panel-collapse');
  assert.ok($collapsePanel.length, 'Panel element is missing');
  assert.ok($collapsePanel.hasClass('collapse'), 'Panel is missing class "collapse"');
  assert.ok(!$collapsePanel.hasClass('in'), 'Panel should not be visible by default');
  assert.equal('#' + $collapsePanel.attr('id'), $lessonTitleAnchor.attr('href'), 'Panel element should be tied to the title anchor element');

  const $panelBody = $collapsePanel.find('> .panel-body');
  assert.ok($panelBody.length, 'Panel body element is missing');

  const $collectionsContainer = $panelBody.find('> .collections');
  assert.ok($collectionsContainer.length, 'Container for collections and assessments is missing');

  // Content for collections/assessments is not available because the call to get data has not been made yet
  assert.equal($collectionsContainer.text().trim(), context.get('i18n').t('common.contentUnavailable').string, 'Content for collections/assessments should not be available');
});

test('it renders correctly when there are no collections/assessments to load after clicking on the lesson name', function(assert) {
  assert.expect(7);

  const context = this;

  // Class with no lessons per stub
  const currentClass = Ember.Object.create({
    id: "111-111-111",
    course: "999-999-999"
  });

  // Lesson model
  const lesson = Ember.Object.create({
    id: "888-000",
    title: 'Lesson Title'
  });

  this.set('currentClass', currentClass);
  this.set('unitId', '777-999');
  this.set('lesson', lesson);
  this.set('index', 0);

  this.render(hbs`{{class/overview/gru-accordion-lesson
                    currentClass=currentClass
                    unitId=unitId
                    model=lesson
                    index=index }}`);

  const $component = this.$('.gru-accordion-lesson');
  const $lessonTitleAnchor = $component.find('> .panel-heading a');

  const $collapsePanel = $component.find('> .panel-collapse');
  assert.ok(!$collapsePanel.hasClass('in'), 'Panel should not be visible');

  const $collectionsContainer = $collapsePanel.find('.collections');

  // Content for lessons is not available because the call to get data has not been made yet
  assert.equal($collectionsContainer.text().trim(), context.get('i18n').t('common.contentUnavailable').string, 'Content for collections/assessments should not be available');

  // Click on the lesson name
  $lessonTitleAnchor.click();
  assert.ok($collapsePanel.hasClass('in'), 'Panel should be visible');

  var $loadingSpinner = $collapsePanel.find('.three-bounce-spinner');
  assert.ok($loadingSpinner.length, 'Loading spinner should be displayed');

  return wait().then(function() {
    $loadingSpinner = $collapsePanel.find('.three-bounce-spinner');
    assert.ok(!$loadingSpinner.length, 'Loading spinner should have been hidden');

    const $items = $collapsePanel.find('.collections .panel');
    assert.equal($items.length, 0, 'Incorrect number of collections listed');
    assert.equal($collectionsContainer.text().trim(), context.get('i18n').t('common.contentUnavailable').string, 'Incorrect message when there are no collections to load');
  });
});

test('it loads collections/assessments and renders them correctly after clicking on the lesson name', function(assert) {
  assert.expect(11);

  const context = this;

  // Class with lessons per stub
  var currentClass = Ember.Object.create({
    id: "111-333-555",
    course: "222-444-666"
  });

  // Lesson model
  const lesson = Ember.Object.create({
    id: "888-000",
    title: 'Lesson Title'
  });

  this.set('currentClass', currentClass);
  this.set('unitId', '777-999');
  this.set('lesson', lesson);
  this.set('index', 0);

  this.render(hbs`{{class/overview/gru-accordion-lesson
                    currentClass=currentClass
                    unitId=unitId
                    model=lesson
                    index=index }}`);

  const $component = this.$('.gru-accordion-lesson');
  const $lessonTitleAnchor = $component.find('> .panel-heading a');

  const $collapsePanel = $component.find('> .panel-collapse');
  assert.ok(!$collapsePanel.hasClass('in'), 'Panel should not be visible');

  const $collectionsContainer = $collapsePanel.find('.collections');

  // Content for lessons is not available because the call to get data has not been made yet
  assert.equal($collectionsContainer.text().trim(), context.get('i18n').t('common.contentUnavailable').string, 'Content for collections/assessments should not be available');

  // Click on the unit name
  $lessonTitleAnchor.click();
  assert.ok($collapsePanel.hasClass('in'), 'Panel should be visible');

  var $loadingSpinner = $collectionsContainer.find('.three-bounce-spinner');
  assert.ok($loadingSpinner.length, 'Loading spinner should be displayed');

  return wait().then(function() {
    $loadingSpinner = $collectionsContainer.find('.three-bounce-spinner');
    assert.ok(!$loadingSpinner.length, 'Loading spinner should have been hidden');

    const $items = $collapsePanel.find('.collections .panel');
    assert.equal($items.length, 2, 'Incorrect number of collections listed');

    const $firstCollection = $items.first();
    const $collectionHeading = $firstCollection.find('> .panel-heading');
    assert.ok($collectionHeading.length, 'Collection is missing the panel heading element');

    const $collectionImage = $collectionHeading.find('> img');
    assert.ok($collectionImage.length, 'Collection is missing the image element');

    const $collectionName = $collectionHeading.find('> .panel-title');
    assert.ok($collectionName.length, 'Element for the collection name is missing');

    assert.equal($items.first().find('.panel-title').text().trim(), 'C1: Collection 1', 'Incorrect first lesson title');
    assert.equal($items.last().find('.panel-title').text().trim(), 'C2: Collection 3', 'Incorrect last lesson title');
  });
});


test('it only loads collections/assessments once after clicking on the unit name', function(assert) {
  assert.expect(5);

  const context = this;

  // Class with lessons per stub
  var currentClass = Ember.Object.create({
    id: "111-333-555",
    course: "222-444-666"
  });

  // Lesson model
  const lesson = Ember.Object.create({
    id: "888-000",
    title: 'Lesson Title'
  });

  this.set('currentClass', currentClass);
  this.set('unitId', '777-999');
  this.set('lesson', lesson);
  this.set('index', 0);

  this.render(hbs`{{class/overview/gru-accordion-lesson
                    currentClass=currentClass
                    unitId=unitId
                    model=lesson
                    index=index }}`);

  const $component = this.$('.gru-accordion-lesson');
  const $lessonTitleAnchor = $component.find('> .panel-heading a');

  const $collapsePanel = $component.find('> .panel-collapse');

  // Click on the unit name
  $lessonTitleAnchor.click();

  return wait().then(function() {

    // Assert that the data has been loaded
    const $items = $collapsePanel.find('.collections .panel');
    assert.equal($items.length, 2, 'Incorrect number of collections listed');

    // Click on the unit name to close the panel with the collections
    $lessonTitleAnchor.click();
    assert.ok(!$collapsePanel.hasClass('in'), 'Panel should have been hidden');

    // To test that the data will not be reloaded after clicking on the unit name
    // the class information will be changed to a class that does not have any lessons (per the stub)
    // Then, after clicking on the unit name again, assert that the lessons data has not changed.
    var currentClass = Ember.Object.create({
      id: "111-111-111",
      course: "999-999-999"
    });

    context.set('currentClass', currentClass);

    // Another piece of data is also changed to assert that the component does update with this change
    context.set('index', 2);

    // Click on the unit name to show the panel again
    $lessonTitleAnchor.click();
    assert.ok($collapsePanel.hasClass('in'), 'Panel should be visible');

    return wait().then(function() {

      const $items = $collapsePanel.find('.collections .panel');
      assert.equal($items.length, 2, 'Number of lessons listed should not have changed');
      assert.equal($lessonTitleAnchor.text().trim(), 'L3: Lesson Title', 'Index in the title text should have changed');
    });
  });
});
