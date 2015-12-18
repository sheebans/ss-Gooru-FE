import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';
import DS from 'ember-data';

// Stub unit service
const lessonServiceStub = Ember.Service.extend({

  findByClassAndCourseAndUnit(classId, courseId, unitId) {
    var response;
    var promiseResponse;

    if (classId === '111-333-555' &&
          courseId === '222-444-666' &&
            unitId === '777-999') {
      response = [
        Ember.Object.create({
          id: "lesson-1",
          title: "Lesson 1",
          visibility: true
        }),
        Ember.Object.create({
          id: "lesson-2",
          title: "Lesson 2",
          visibility: false
        }),
        Ember.Object.create({
          id: "lesson-3",
          title: "Lesson 3",
          visibility: true
        })
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

const courseLocationStub = Ember.Service.extend({

  findByCourseAndUnit(courseId, unitId) {
    var response;
    const users = [
      Ember.Object.create({
        isActive: false,
        user: Ember.Object.create({
          id: 1,
          firstName: "John",
          lastName: "Fitzgerald",
          fullName: "Fitzgerald, John"
        })
      })
    ];

    if (courseId === '222-444-666' && unitId === '777-999') {
      response = [
        Ember.Object.create({
          unit: '777-999',
          lesson: 'lesson-1',
          locationUsers: DS.PromiseArray.create({
            promise: new Ember.RSVP.resolve(users)
          })
        })
      ];
    } else {
      response = Ember.A();
    }

    return DS.PromiseArray.create({
      promise: new Ember.RSVP.resolve(response)
    });
  }
});

moduleForComponent('class/overview/gru-accordion-unit', 'Integration | Component | class/overview/gru accordion unit', {
  integration: true,

  beforeEach: function() {
    this.register('service:api-sdk/lesson', lessonServiceStub);
    this.inject.service('api-sdk/lesson', { as: 'lessonService' });

    this.register('service:api-sdk/course-location', courseLocationStub);
    this.inject.service('api-sdk/course-location', { as: 'courseLocationService' });

    this.inject.service('i18n');
  }
});

test('it renders', function(assert) {
  const context = this;

  // Class with no lessons per stub
  const currentClass = Ember.Object.create({
    id: "111-111-111",
    course: "999-999-999"
  });

  // Unit model
  const unit = Ember.Object.create({
    id: "777-999",
    title: 'Unit Title'
  });

  this.set('currentClass', currentClass);
  this.set('unit', unit);
  this.set('index', 0);

  this.render(hbs`{{class/overview/gru-accordion-unit
                    currentClass=currentClass
                    model=unit
                    index=index }}`);

  const $component = this.$('.gru-accordion-unit');
  assert.ok($component.length, 'Component does not have the component class');
  assert.ok($component.hasClass('panel'), 'Component should have the class "panel"');
  assert.ok($component.hasClass('panel-default'), 'Component should have the class "panel-default"');

  const $unitHeading = $component.find('> .panel-heading');
  assert.ok($unitHeading.length, 'Panel heading element is missing');

  const $unitTitle = $unitHeading.find('> .panel-title');
  assert.ok($unitTitle.length, 'Panel title element is missing');

  const $unitTitleAnchor = $unitTitle.find('> a');
  assert.ok($unitTitleAnchor.length, 'Title anchor element is missing');
  assert.ok($unitTitleAnchor.hasClass('collapsed'), 'Panel should be collapsed by default');
  assert.equal($unitTitleAnchor.text().trim(), 'U1: Unit Title', 'Wrong title text');

  const $collapsePanel = $component.find('> .panel-collapse');
  assert.ok($collapsePanel.length, 'Panel element is missing');
  assert.ok($collapsePanel.hasClass('collapse'), 'Panel is missing class "collapse"');
  assert.ok(!$collapsePanel.hasClass('in'), 'Panel should not be visible by default');
  assert.equal('#' + $collapsePanel.attr('id'), $unitTitleAnchor.attr('href'), 'Panel element should be tied to the title anchor element');

  const $panelBody = $collapsePanel.find('> .panel-body');
  assert.ok($panelBody.length, 'Panel body element is missing');

  const $panelGroup = $panelBody.find('> .panel-group');
  assert.ok($panelGroup.length, 'Panel group element for lessons is missing');

  // Content for lessons is not available because the call to get data has not been made yet
  assert.equal($panelGroup.text().trim(), context.get('i18n').t('common.contentUnavailable').string, 'Content for lessons should not be available');
});

test('it renders correctly when there are no lessons to load after clicking on the unit name', function(assert) {
  assert.expect(7);

  const context = this;

  // Class with no lessons per stub
  const currentClass = Ember.Object.create({
    id: "111-111-111",
    course: "999-999-999"
  });

  // Unit model
  const unit = Ember.Object.create({
    id: "777-999",
    title: 'Unit Title'
  });

  this.on('externalAction', function () {
  });

  this.set('currentClass', currentClass);
  this.set('unit', unit);
  this.set('index', 0);

  this.render(hbs`{{class/overview/gru-accordion-unit
                    currentClass=currentClass
                    model=unit
                    index=index
                    onLocationUpdate=(action 'externalAction') }}`);

  const $component = this.$('.gru-accordion-unit');
  const $unitTitleAnchor = $component.find('> .panel-heading a');

  const $collapsePanel = $component.find('> .panel-collapse');
  assert.ok(!$collapsePanel.hasClass('in'), 'Panel should not be visible');

  const $panelGroup = $collapsePanel.find('.panel-group');

  // Content for lessons is not available because the call to get data has not been made yet
  assert.equal($panelGroup.text().trim(), context.get('i18n').t('common.contentUnavailable').string, 'Content for lessons should not be available');

  // Click on the unit name
  Ember.run(() => {
    $unitTitleAnchor.click();
  });

  assert.ok($collapsePanel.hasClass('in'), 'Panel should be visible');

  var $loadingSpinner = $panelGroup.find('.three-bounce-spinner');
  assert.ok($loadingSpinner.length, 'Loading spinner should be displayed');

  return wait().then(function() {
    $loadingSpinner = $panelGroup.find('.three-bounce-spinner');
    assert.ok(!$loadingSpinner.length, 'Loading spinner should have been hidden');

    const $items = $panelGroup.find('.gru-accordion-lesson');
    assert.equal($items.length, 0, 'Incorrect number of lessons listed');
    assert.equal($panelGroup.text().trim(), context.get('i18n').t('common.contentUnavailable').string, 'Incorrect message when there are no lessons to load');
  });
});

test('it loads lessons and renders them correctly after clicking on the unit name', function(assert) {
  assert.expect(12);

  const context = this;

  // Class with lessons per stub
  var currentClass = Ember.Object.create({
    id: "111-333-555",
    course: "222-444-666"
  });

  // Unit model
  const unit = Ember.Object.create({
    id: "777-999",
    title: 'Unit Title'
  });

  this.on('externalAction', function () {
  });

  this.set('currentClass', currentClass);
  this.set('unit', unit);
  this.set('index', 0);

  this.render(hbs`{{class/overview/gru-accordion-unit
                    currentClass=currentClass
                    model=unit
                    index=index
                    onLocationUpdate=(action 'externalAction') }}`);

  const $component = this.$('.gru-accordion-unit');
  const $unitTitleAnchor = $component.find('> .panel-heading a');

  const $collapsePanel = $component.find('> .panel-collapse');
  assert.ok(!$collapsePanel.hasClass('in'), 'Panel should not be visible');

  const $panelGroup = $collapsePanel.find('.panel-group');

  // Content for lessons is not available because the call to get data has not been made yet
  assert.equal($panelGroup.text().trim(), context.get('i18n').t('common.contentUnavailable').string, 'Content for lessons should not be available');

  // Click on the unit name
  Ember.run(() => {
    $unitTitleAnchor.click();
  });

  assert.ok($collapsePanel.hasClass('in'), 'Panel should be visible');

  var $loadingSpinner = $panelGroup.find('.three-bounce-spinner');
  assert.ok($loadingSpinner.length, 'Loading spinner should be displayed');

  return wait().then(function() {
    $loadingSpinner = $panelGroup.find('.three-bounce-spinner');
    assert.ok(!$loadingSpinner.length, 'Loading spinner should have been hidden');

    const $items = $panelGroup.find('.gru-accordion-lesson');
    assert.equal($items.length, 2, 'Incorrect number of lessons listed');
    assert.equal($items.first().find('.panel-title').text().trim(), 'L1: Lesson 1', 'Incorrect first lesson title');
    assert.equal($items.last().find('.panel-title').text().trim(), 'L2: Lesson 3', 'Incorrect last lesson title');

    assert.equal($items.first().find('.panel-heading .gru-user-icons.visible-xs .first-view li').length, 1, 'Wrong number of user icons showing for the first lesson for mobile');
    assert.equal($items.last().find('.panel-heading .gru-user-icons.visible-xs .first-view li').length, 0, 'Wrong number of user icons showing for the last lesson for mobile');

    assert.equal($items.first().find('.panel-heading .gru-user-icons.hidden-xs .first-view li').length, 1, 'Wrong number of user icons showing for the first lesson');
    assert.equal($items.last().find('.panel-heading .gru-user-icons.hidden-xs .first-view li').length, 0, 'Wrong number of user icons showing for the last lesson');
  });
});

test('it only loads lessons once after clicking on the unit name', function(assert) {
  assert.expect(5);

  const context = this;

  // Class with lessons per stub
  var currentClass = Ember.Object.create({
    id: "111-333-555",
    course: "222-444-666"
  });

  // Unit model
  const unit = Ember.Object.create({
    id: "777-999",
    title: 'Unit Title'
  });

  this.on('externalAction', function () {
  });

  this.set('currentClass', currentClass);
  this.set('unit', unit);
  this.set('index', 0);

  this.render(hbs`{{class/overview/gru-accordion-unit
                    currentClass=currentClass
                    model=unit
                    index=index
                    onLocationUpdate=(action 'externalAction') }}`);

  const $component = this.$('.gru-accordion-unit');
  const $unitTitleAnchor = $component.find('> .panel-heading a');

  const $collapsePanel = $component.find('> .panel-collapse');

  // Click on the unit name
  Ember.run(() => {
    $unitTitleAnchor.click();
  });

  return wait().then(function() {

    // Assert that the data has been loaded
    const $items = $collapsePanel.find('.gru-accordion-lesson');
    assert.equal($items.length, 2, 'Incorrect number of lessons listed');

    // Click on the unit name to close the panel with the lessons
    $unitTitleAnchor.click();
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
    $unitTitleAnchor.click();
    assert.ok($collapsePanel.hasClass('in'), 'Panel should be visible');

    return wait().then(function() {

      const $items = $collapsePanel.find('.gru-accordion-lesson');
      assert.equal($items.length, 2, 'Number of lessons listed should not have changed');
      assert.equal($unitTitleAnchor.text().trim(), 'U3: Unit Title', 'Index in the title text should have changed');
    });
  });
});

test('it triggers an event when the unit name is clicked on', function (assert) {
  assert.expect(1);

  // Class with lessons per stub
  var currentClass = Ember.Object.create({
    id: "111-333-555",
    course: "222-444-666"
  });

  // Unit model
  const unit = Ember.Object.create({
    id: "777-999",
    title: 'Unit Title'
  });

  this.on('externalAction', function (newLocation) {
    assert.equal('777-999', newLocation);
  });

  this.set('currentClass', currentClass);
  this.set('unit', unit);

  this.render(hbs`{{class/overview/gru-accordion-unit
                    currentClass=currentClass
                    model=unit
                    onLocationUpdate=(action 'externalAction') }}`);

  const $component = this.$('.gru-accordion-unit');
  const $unitTitleAnchor = $component.find('> .panel-heading a');

  // Click on the unit name
  Ember.run(() => {
    $unitTitleAnchor.click();
  });

});

test('it can start expanded (via "parsedLocation") and be collapsed manually', function (assert) {
  assert.expect(2);

  // Class with lessons per stub
  var currentClass = Ember.Object.create({
    id: "111-333-555",
    course: "222-444-666"
  });

  // Unit model
  const unit = Ember.Object.create({
    id: "777-999",
    title: 'Unit Title'
  });

  this.on('externalAction', function () {
  });

  this.set('currentClass', currentClass);
  this.set('unit', unit);

  // Sample string made up of unit id, lesson id and resource id
  this.set('locationArray', ['777-999', '111-111', '222-222']);

  this.render(hbs`{{class/overview/gru-accordion-unit
                    currentClass=currentClass
                    model=unit
                    onLocationUpdate=(action 'externalAction')
                    parsedLocation=locationArray }}`);

  const $component = this.$('.gru-accordion-unit');
  const $unitTitleAnchor = $component.find('> .panel-heading a');
  const $collapsePanel = $component.find('> .panel-collapse');

  assert.ok($collapsePanel.hasClass('in'), 'Panel should be visible');

  // Click on the unit name
  Ember.run(() => {
    $unitTitleAnchor.click();
  });

  return wait().then(function () {
    assert.ok(!$collapsePanel.hasClass('in'), 'Panel should have been hidden');
  });
});

test('it can be expanded manually and collapsed by changing the "parsedLocation" value', function (assert) {
  assert.expect(3);

  const context = this;

  // Class with lessons per stub
  var currentClass = Ember.Object.create({
    id: "111-333-555",
    course: "222-444-666"
  });

  // Unit model
  const unit = Ember.Object.create({
    id: "777-999",
    title: 'Unit Title'
  });

  this.on('externalAction', function () {
  });

  this.set('currentClass', currentClass);
  this.set('unit', unit);
  this.set('locationArray', []);

  this.render(hbs`{{class/overview/gru-accordion-unit
                    currentClass=currentClass
                    model=unit
                    onLocationUpdate=(action 'externalAction')
                    parsedLocation=locationArray }}`);

  const $component = this.$('.gru-accordion-unit');
  const $unitTitleAnchor = $component.find('> .panel-heading a');
  const $collapsePanel = $component.find('> .panel-collapse');

  assert.ok(!$collapsePanel.hasClass('in'), 'Panel should not be visible');

  // Click on the unit name
  Ember.run(() => {
    $unitTitleAnchor.click();
  });

  return wait().then(function () {
    assert.ok($collapsePanel.hasClass('in'), 'Panel should be visible');

    context.set('locationArray', ['000-000']);
    assert.ok(!$collapsePanel.hasClass('in'), 'Panel should have been hidden');
  });
});
