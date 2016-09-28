import { moduleForModel, test } from 'ember-qunit';

moduleFor('model:content/collection', 'Unit | Model | content/class', {
  unit: true
});

test("isAllContentVisible", function(assert) {
  let model = this.subject({
    contentVisibility: "visible_all"
  });

  assert.ok(model.get("isAllContentVisible"), "Should return true, all content is visible");

  model.set("contentVisibility", "visible_none");
  assert.ok(!model.get("isAllContentVisible"), "Should return false, all content is not visible");

  model.set("contentVisibility", null);
  assert.ok(!model.get("isAllContentVisible"), "Should return false, all content is not visible");

});

test("areCollectionsVisible", function(assert) {
  let model = this.subject({
    contentVisibility: "visible_all"
  });

  assert.ok(model.get("areCollectionsVisible"), "Should return true, collections are visible");

  model.set("contentVisibility", "visible_collections");
  assert.ok(model.get("areCollectionsVisible"), "Should return true, collections are visible");

  model.set("contentVisibility", "visible_none");
  assert.ok(model.get("areCollectionsVisible"), "Should return true, collections are visible");

  model.set("contentVisibility", null);
  assert.ok(!model.get("areCollectionsVisible"), "Should return false, collections are not visible");

});
