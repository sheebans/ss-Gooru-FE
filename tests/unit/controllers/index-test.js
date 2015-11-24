import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';

moduleFor('controller:index', 'Unit | Controller | index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('onSubjectChange: on subject change', function (assert) {
  assert.expect(1);
  let controller = this.subject();

  controller.send("onSubjectChange", "fake");

  assert.equal(controller.get("selectedSubjects"), "fake", "selectedSubjects has wrong value");
});

test('onGradeSelected: on grades change', function (assert) {
  assert.expect(1);
  let controller = this.subject();

  controller.send("onGradeSelected", "fake");

  assert.equal(controller.get("selectedGrades"), "fake", "selectedGrades has wrong value");
});

test('onStandardSelected: on standard change', function (assert) {
  assert.expect(1);
  let controller = this.subject();

  controller.send("onStandardSelected", "fake");

  assert.equal(controller.get("selectedStandard"), "fake", "selectedStandard has wrong value");
});

test('onBrowseContentClick: no grades selected', function (assert) {
  assert.expect(2);
  let controller = this.subject({
    selectedGrades: Ember.A(),
    i18n: T.i18nServiceMock
  });

  controller.send("onBrowseContentClick");

  assert.ok(controller.get("isEmptyGrades"), "isEmptyGrades should return true");
  assert.ok(controller.get("errorMessage"), "index.browseContent.grades_missing_message", "Wrong error message");
});

test('onBrowseContentClick: no subject selected', function (assert) {
  assert.expect(3);
  var grade = Ember.Object.create({id: 1});

  let controller = this.subject({
    selectedGrades: Ember.A([grade]),
    selectedSubjects: Ember.A(),
    i18n: T.i18nServiceMock
  });

  controller.send("onBrowseContentClick");

  assert.ok(!controller.get("isEmptyGrades"), "isEmptyGrades should return false");
  assert.ok(controller.get("isEmptySubjects"), "isEmptySubjects should return true");
  assert.ok(controller.get("errorMessage"), "index.browseContent.subjects_missing_message", "Wrong error message");
});

test('onBrowseContentClick: transition to route', function (assert) {
  assert.expect(4);
  var grade = Ember.Object.create({id: 1});
  var subject = Ember.Object.create({id: 2});

  let controller = this.subject({
    selectedGrades: Ember.A([grade]),
    selectedSubjects: Ember.A([subject]),
    i18n: T.i18nServiceMock
  });

  controller.transitionToRoute = function(route){
    assert.equal(route, "/search/collections?gradeIds=1&subjectIds=2", "Wrong route");
  };

  controller.send("onBrowseContentClick");

  assert.ok(!controller.get("isEmptyGrades"), "isEmptyGrades should return false");
  assert.ok(!controller.get("isEmptySubjects"), "isEmptySubjects should return false");
  assert.equal(controller.get("errorMessage"), null, "Wrong error message");
});
