import Ember from "ember";
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('player/gru-viewer', 'Unit | Component | player/gru viewer', {
  integration: false
});

test('resourceComponentSelected for non valid resource type', function (assert) {
  assert.expect(1);

  var component = this.subject({
    resource: Ember.Object.create({
      resourceType: "any-non-valid-value",
    })
  });

  assert.ok(!component.get("resourceComponentSelected"), "It should return false|undefined");
});

test('resourceComponentSelected for image resource type', function (assert) {
  assert.expect(1);

  var component = this.subject({
    resource: Ember.Object.create({
      isImageResource: true,
    })
  });

  assert.equal(component.get("resourceComponentSelected"), "player.resources.gru-image-resource", "Wrong component name");
});

test('resourceComponentSelected for text/pdf resource type', function (assert) {
  assert.expect(1);

  var component = this.subject({
    resource: Ember.Object.create({
      resourceType: "handouts"
    })
  });

  assert.equal(component.get("resourceComponentSelected"), "player.resources.gru-pdf-resource", "Wrong component name");
});

test('resourceComponentSelected for youtube resource type', function (assert) {
  assert.expect(1);

  var component = this.subject({
    resource: Ember.Object.create({
      resourceType: "video/youtube"
    })
  });

  assert.equal(component.get("resourceComponentSelected"), "player.resources.gru-youtube-resource", "Wrong component name");
});

test('resourceComponentSelected for youtube resource type', function (assert) {
  assert.expect(1);

  var component = this.subject({
    resource: Ember.Object.create({
      resourceType: "resource/url"
    })
  });

  assert.equal(component.get("resourceComponentSelected"), "player.resources.gru-url-resource", "Wrong component name");
});
