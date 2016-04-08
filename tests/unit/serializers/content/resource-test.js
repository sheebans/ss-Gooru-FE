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
    content_subformat: 'video'
  };
  const response = serializer.serializeCreateResource(resourceObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});
