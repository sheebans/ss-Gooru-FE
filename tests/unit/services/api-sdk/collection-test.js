import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/collection', 'Unit | Service | api-sdk/collection', {
  needs: ['serializer:collection/collection', 'model:collection/collection',
    'model:resource/resource', 'adapter:collection/collection']
});

test('findByClassAndCourseAndUnitAndLesson', function (assert) {
  const service = this.subject();
  const response = [
      {
        "collectionType": "assessment",
        "title": "Creating properties assessment",
        "gooruOid": "5028ac7f-82da-4f09-998b-ecf480d4b984",
        "collectionId": 24413362,
        "visibility": false
      },
      {
        "collectionType": "collection",
        "title": "Properties resource collection",
        "gooruOid": "363d3cc2-f2ac-490d-a870-42167f204c97",
        "collectionId": 24413363,
        "visibility": false
      }
    ];
  const routes = function () {
      this.get('/gooruapi/rest/v3/class/123/course/456/unit/789/lesson/abc', function () {
        return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
      }, 0);
    };

  this.pretender.map(routes);

  var done = assert.async();

  const promise = service.findByClassAndCourseAndUnitAndLesson('123','456','789','abc');
  promise.then(function(collections){
    assert.equal(collections.get('length'), 2, 'Missing classes');
    const firstCollection = collections.get('firstObject');
    assert.equal(firstCollection.get('id'), '5028ac7f-82da-4f09-998b-ecf480d4b984', 'Wrong id');
    assert.equal(firstCollection.get('collectionType'), 'assessment', 'Wrong collection type');
    assert.equal(firstCollection.get('title'), 'Creating properties assessment', 'Wrong title');
    assert.equal(firstCollection.get('visibility'), false, 'Wrong visibility');
    const otherCollection = collections.objectAt(1);
    assert.equal(otherCollection.get('id'), '363d3cc2-f2ac-490d-a870-42167f204c97', 'Wrong id');
    assert.equal(otherCollection.get('collectionType'), 'collection', 'Wrong collection type');
    assert.equal(otherCollection.get('title'), 'Properties resource collection', 'Wrong title');
    assert.equal(otherCollection.get('visibility'), false, 'Wrong visibility');
    done();
  });
});

test('findById', function (assert) {
  const service = this.subject();

  const
    response = {
      "summary": {
        "resourceCount": 0,
        "questionCount": 0
      },
      "collectionType": "collection",
      "isCollaborator": false,
      "collectionId": 24413363,
      "settings": {
        "comment": "turn-on"
      },
      "parentGooruOid": "fbd76aed-1b8d-4c2c-a9c6-c7603eef347c",
      "itemSequence": 2,
      "type": "collection",
      "title": "Properties resource collection",
      "sharing": "anyonewithlink",
      "description": "Any description",
      "collectionItems": [],
      "permissions": [],
      "audience": [
        {
          "id": 195,
          "name": "All Students"
        }
      ],
      "collectionItemId": "27c1bca1-3608-4a5e-9558-6642dc74bcb5",
      "lastModified": 1448917633000,
      "languageObjective": "",
      "gooruOid": "363d3cc2-f2ac-490d-a870-42167f204c97",
      "views": 0,
      "user": {
        "username": "perezedify",
        "showProfilePage": true,
        "gooruUId": "ff90e7e2-7788-48fb-9ce2-7b6d7a828840",
        "profileImageUrl": "http://profile-qa.s3.amazonaws.com/ff90e7e2-7788-48fb-9ce2-7b6d7a828840.png"
      }
    },
    routes = function () {
      this.get('/gooruapi/rest/v3/collection/123', function () {
        return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
      }, 0);
    };

  this.pretender.map(routes);

  var done = assert.async();
  Ember.run(function () {
    const promise = service.findById('123');
    promise.then(function (collectionItem) {
      assert.equal(collectionItem.get('id'), '363d3cc2-f2ac-490d-a870-42167f204c97', 'Wrong id');
      assert.equal(collectionItem.get('collectionType'), 'collection', 'Wrong collection type');
      assert.equal(collectionItem.get('title'), 'Properties resource collection', 'Wrong title');
      assert.equal(collectionItem.get('description'), 'Any description', 'Wrong description');
      assert.equal(collectionItem.get('imageUrl'), '', 'wrong imageUrl');
      assert.equal(collectionItem.get('resourceCount'), '0', 'Wrong resource count');
      assert.equal(collectionItem.get('questionCount'), '0', 'Wrong question count');
      done();
    });
  });
});
