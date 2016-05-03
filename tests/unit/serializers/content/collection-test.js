import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import CollectionModel from 'gooru-web/models/content/collection';

moduleFor('serializer:content/collection', 'Unit | Serializer | content/collection');

test('serializeCreateCollection', function(assert) {
  const serializer = this.subject();
  const collectionObject = CollectionModel.create({
    title: 'collection-title',
    learningObjectives: 'any',
    isVisibleOnProfile: true,
    imageUrl: 'http://test-bucket01.s3.amazonaws.com/image-id.png'
  });
  const expected = {
    title: 'collection-title',
    learning_objective: 'any',
    visible_on_profile: true,
    thumbnail: 'image-id.png'
  };
  const response = serializer.serializeCreateCollection(collectionObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('serializeUpdateCollection', function(assert) {
  const serializer = this.subject();
  const collectionObject = CollectionModel.create({
    title: 'collection-title',
    learningObjectives: 'any',
    isVisibleOnProfile: false,
    imageUrl: 'http://test-bucket01.s3.amazonaws.com/image-id.png'
  });
  const expected = {
    title: 'collection-title',
    learning_objective: 'any',
    visible_on_profile: false,
    thumbnail: 'image-id.png'
  };
  const response = serializer.serializeUpdateCollection(collectionObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('normalizeReadCollection', function(assert) {
  const serializer = this.subject();
  serializer.set('session', Ember.Object.create({
    'cdnUrls': {
      content: 'http://test-bucket01.s3.amazonaws.com/'
    }
  }));
  const collectionData = {
    id: 'collection-id',
    title: 'collection-title',
    learning_objective: 'learning-objectives',
    visible_on_profile: true,
    thumbnail: 'image-id.png'
  };
  const collection = serializer.normalizeReadCollection(collectionData);
  assert.equal(collection.get('id'), 'collection-id', 'Wrong id');
  assert.equal(collection.get('title'), 'collection-title', 'Wrong title');
  assert.equal(collection.get('imageUrl'), 'http://test-bucket01.s3.amazonaws.com/image-id.png', 'Wrong image');
  assert.equal(collection.get('learningObjectives'), 'learning-objectives', 'Wrong learningObjectives');
  assert.equal(collection.get('isVisibleOnProfile'), true, 'Wrong isVisibleOnProfile');
});
