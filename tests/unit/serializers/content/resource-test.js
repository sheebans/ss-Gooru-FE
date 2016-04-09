import { moduleFor, test } from 'ember-qunit';
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

test('normalizeReadResource', function(assert) {
  const serializer = this.subject();
  const resourceData = {
    id: "abcd",
    title: 'resource-title',
    url: 'any',
    content_subformat: 'video_resource'
  };


  const resource = serializer.normalizeReadResource(resourceData);
  assert.equal('abcd', resource.get("id"), 'Wrong id');
  assert.equal('resource-title', resource.get("title"), 'Wrong title');
  assert.equal('any', resource.get("url"), 'Wrong url');
  assert.equal('video', resource.get("format"), 'Wrong format'); //format is converted at the normalizer
});
