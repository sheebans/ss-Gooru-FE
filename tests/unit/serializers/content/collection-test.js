import { moduleFor, test } from 'ember-qunit';
import CollectionModel from 'gooru-web/models/content/collection';

moduleFor('serializer:content/collection', 'Unit | Serializer | content/collection');

test('serializeCreateCollection', function(assert) {
  const serializer = this.subject();
  const collectionObject = CollectionModel.create({
    title: 'collection-title',
    learningObjectives: 'any',
    isVisibleOnProfile: true
  });
  const expected = {
    title: 'collection-title',
    'learning_objective': 'any',
    'visible_on_profile': true
  };
  const response = serializer.serializeCreateCollection(collectionObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('serializeUpdateCollection', function(assert) {
  const serializer = this.subject();
  const collectionObject = CollectionModel.create({
    title: 'collection-title',
    learningObjectives: 'any',
    isVisibleOnProfile: false
  });
  const expected = {
    title: 'collection-title',
    'learning_objective': 'any',
    'visible_on_profile': false
  };
  const response = serializer.serializeUpdateCollection(collectionObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('normalizeReadCollection', function(assert) {
  const serializer = this.subject();
  const collectionData = {
    id: 'collection-id',
    title: 'collection-title',
    'learning_objective': 'learning-objectives',
    'visible_on_profile': true
  };
  const collection = serializer.normalizeReadCollection(collectionData);
  assert.equal(collection.get('id'), 'collection-id', 'Wrong id');
  assert.equal(collection.get('title'), 'collection-title', 'Wrong title');
  assert.equal(collection.get('learningObjectives'), 'learning-objectives', 'Wrong learningObjectives');
  assert.equal(collection.get('isVisibleOnProfile'), true, 'Wrong isVisibleOnProfile');
});
