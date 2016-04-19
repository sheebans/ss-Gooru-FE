import { moduleFor, test } from 'ember-qunit';
import CollectionModel from 'gooru-web/models/content/collection';

moduleFor('serializer:content/collection', 'Unit | Serializer | content/collection');

test('serializeCreateCollection', function(assert) {
  const serializer = this.subject();
  const collectionObject = CollectionModel.create({
    title: 'collection-title',
    learningObjectives: 'any'
  });
  const expected = {
    title: 'collection-title',
    learning_objective: 'any'
  };
  const response = serializer.serializeCreateCollection(collectionObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('serializeUpdateCollection', function(assert) {
  const serializer = this.subject();
  const collectionObject = CollectionModel.create({
    title: 'collection-title',
    learningObjectives: 'any'
  });
  const expected = {
    title: 'collection-title',
    learning_objective: 'any'
  };
  const response = serializer.serializeUpdateCollection(collectionObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});
