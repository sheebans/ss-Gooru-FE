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
    url: 'any',
    content_subformat: 'video_resource',
    description: 'any desc',
    publish_status: 'published',
    taxonomy: [],
    visible_on_profile: true,
    creator_id: 'anyID',
  };
  const expected = ResourceModel.create(Ember.getOwner(this).ownerInjection(), {
    id: "abcd",
    title: 'resource-title',
    url: 'any',
    format: 'video',
    description: 'any desc',
    publishStatus: 'published',
    standards: [],
    owner: 'anyID',
    metadata: {
      'amIThePublisher': false,
      'publisher': null
    },
    isVisibleOnProfile: true
  });

  const resource = serializer.normalizeReadResource(resourceData);
  assert.deepEqual(resource, expected, 'Wrong normalized response');
});
