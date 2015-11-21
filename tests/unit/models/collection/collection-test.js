import Ember from "ember";
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('collection/collection', 'Unit | Model | collection/collection', {
  // Specify the other units that are required for this test.
  needs: [
    "model:resource/resource",
    "model:resource/answer",
    "model:search/standard"
  ]
});

test('isAssessment', function (assert) {
  assert.expect(1);
  let model = this.subject({
    collectionType: "assessment",
    resources: Ember.A()
  });

  assert.ok(model.get("isAssessment"), "Should return true");
});

test('hasResources empty', function (assert) {
  assert.expect(1);
  let model = this.subject({

    resources: Ember.A()
  });
  // let store = this.store();
  assert.ok(!model.get("hasResources"), "Should return false");
});

test('hasResources not empty', function (assert) {
  assert.expect(1);

  let store = this.store();

  var resources = Ember.A();
  Ember.run(function () {
    resources.pushObject(store.createRecord("resource/resource", {id: 1}));
  });
  let model = this.subject({
    resources: resources
  });

  assert.ok(model.get("hasResources"), "Should return false");
});


test('lastVisitedResource empty', function (assert) {
  assert.expect(1);
  let model = this.subject({
    resources: Ember.A()
  });

  var lastVisitedResource = model.get("lastVisitedResource");
  assert.ok(!lastVisitedResource, "Resource should not be found");
});

test('lastVisitedResource not empty', function (assert) {
  assert.expect(2);

  let store = this.store();

  var resources = Ember.A();
  Ember.run(function () {
    resources.pushObject(store.createRecord("resource/resource", {id: 1}));
    resources.pushObject(store.createRecord("resource/resource", {id: 2}));
  });
  let model = this.subject({
    resources: resources
  });

  var lastVisitedResource = model.get("lastVisitedResource");
  assert.ok(lastVisitedResource, "Resource not found");
  assert.equal(lastVisitedResource.get("id"), 1, "Wrong resource id");
});

test('nextResource without resources', function (assert) {
  assert.expect(1);
  let store = this.store();

  var resource = null;
  Ember.run(function () {
    resource = store.createRecord("resource/resource", {id: 1});
  });

  let model = this.subject({
    resources: Ember.A()
  });

  var nextResource = model.nextResource(resource);
  assert.ok(!nextResource, "Resource should not be found");
});


test('nextResource', function (assert) {
  assert.expect(3);
  let store = this.store();

  var resources = Ember.A(),
    resourceA = null,
    resourceB = null;

  Ember.run(function () {
    resourceA = store.createRecord("resource/resource", {id: 1});
    resourceB = store.createRecord("resource/resource", {id: 2});

    resources.pushObject(resourceA);
    resources.pushObject(resourceB);
  });
  let model = this.subject({
    resources: resources
  });

  var nextResource = model.nextResource(resourceA);
  assert.ok(nextResource, "Resource should be found");
  assert.equal(nextResource.get("id"), 2, "Wrong resource id");

  nextResource = model.nextResource(resourceB);
  assert.ok(!nextResource, "Resource should not be found");
});

test('getResourceById without resources', function (assert) {
  assert.expect(1);

  let model = this.subject({
    resources: Ember.A()
  });

  var nextResource = model.getResourceById(1);
  assert.ok(!nextResource, "Resource should not be found");
});


test('getResourceById', function (assert) {
  assert.expect(2);
  let store = this.store();

  var resources = Ember.A(),
    resourceA = null,
    resourceB = null;

  Ember.run(function () {
    resourceA = store.createRecord("resource/resource", {id: 1});
    resourceB = store.createRecord("resource/resource", {id: 2});

    resources.pushObject(resourceA);
    resources.pushObject(resourceB);
  });
  let model = this.subject({
    resources: resources
  });

  var resource = model.getResourceById(resourceA.get("id"));
  assert.ok(resource, "Resource should be found");
  assert.equal(resource.get("id"), 1, "Wrong resource id");
});
