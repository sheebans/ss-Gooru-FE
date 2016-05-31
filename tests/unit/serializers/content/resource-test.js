import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import ResourceModel from 'gooru-web/models/content/resource';

moduleFor('serializer:content/resource', 'Unit | Serializer | content/resource');

test('serializeCreateResource', function(assert) {
  const serializer = this.subject();
  const resourceObject = ResourceModel.create({
    title: 'resource-title',
    url: 'any',
    format: 'video'
  });
  const expected = {
    title: 'resource-title',
    url: 'any',
    content_subformat: 'video_resource' //subformat is converted at the serializer
  };
  const response = serializer.serializeCreateResource(resourceObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('serializeUpdateResource', function(assert) {
  const serializer = this.subject();
  const resourceObject = ResourceModel.create({
    title: 'resource-title',
    description: 'A description',
    format: 'video'
  });
  const expected = {
    'title': 'resource-title',
    'description': 'A description',
    'narration': undefined,
    'content_subformat': 'video_resource',
    'taxonomy': null,
    'metadata': {
      'am_i_the_publisher': false,
      'publisher': null
    },
    'visible_on_profile': undefined
  };
  const response = serializer.serializeUpdateResource(resourceObject);
  assert.deepEqual(response, expected, 'Wrong serialized response');
});

test('normalizeReadResource', function(assert) {
  const serializer = this.subject();
  const resourceData = {
    id: "abcd",
    title: 'resource-title',
    url: 'http://any',
    content_subformat: 'video_resource',
    description: 'any desc',
    publish_status: 'published',
    taxonomy: [],
    visible_on_profile: true,
    sequence_id: 3,
    creator_id: 'anyID'
  };

  const resource = serializer.normalizeReadResource(resourceData);
  assert.equal(resource.get("id"), "abcd", 'Wrong id');
  assert.equal(resource.get("title"), "resource-title", 'Wrong title');
  assert.equal(resource.get("url"), "http://any", 'Wrong url');
  assert.equal(resource.get("format"), "video", 'Wrong format');
  assert.equal(resource.get("description"), "any desc", 'Wrong description');
  assert.equal(resource.get("publishStatus"), "published", 'Wrong publishStatus');
  assert.equal(resource.get("standards.length"), 0, 'Wrong standards');
  assert.equal(resource.get("owner"), "anyID", 'Wrong owner');
  assert.equal(resource.get("metadata.amIThePublisher"), false, 'Wrong amIThePublisher');
  assert.equal(resource.get("metadata.publisher"), null, 'Wrong publisher');
  assert.equal(resource.get("isVisibleOnProfile"), true, 'Wrong isVisibleOnProfile');
  assert.equal(resource.get("order"), 3, 'Wrong order');

});

test('normalizeReadResource for image resource with relative path', function(assert) {
  const serializer = this.subject();
  serializer.set('session', Ember.Object.create({
    'cdnUrls': {
      content: 'http://test-bucket01.s3.amazonaws.com/'
    }
  }));

  const resourceData = {
    url: 'any',
    content_subformat: 'image_resource'
  };

  const resource = serializer.normalizeReadResource(resourceData);
  assert.equal(resource.get("url"), "http://test-bucket01.s3.amazonaws.com/any", 'Wrong url');
});

test('normalizeReadResource for url resource with no full path', function(assert) {
  const serializer = this.subject();
  const resourceData = {
    url: 'any',
    content_subformat: 'webpage'
  };

  const resource = serializer.normalizeReadResource(resourceData);
  assert.equal(resource.get("url"), "http://any", 'Wrong url');

});
