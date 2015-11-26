import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';

const RESPONSES = {
  'isStudent': {
    'searchResult': [{
      'classUid': '90d82226-5d0d-4673-a85d-f93aa0cbddf2',
      'visibility': true,
      'name': 'Class A1',
      'classCode': '2WZ8IJA',
      'grades': 'K',
      'user': {
        'username': 'JeffreyTeacher01',
        'gooruUId': '88638002-deb6-4f8d-b319-4a7ae18d0efe',
        'profileImageUrl': 'http://profile-qa.s3.amazonaws.com/88638002-deb6-4f8d-b319-4a7ae18d0efe.png'
      },
      'memberCount': 1
    }], 'totalHitCount': 1
  },
  'isTeacher': {
    'searchResult': [{
      'classUid': '67a96ec1-7383-4164-8068-5415621b7a34',
      'visibility': true,
      'name': 'Class A2',
      'classCode': 'JR48FMF',
      'courseGooruOid': '75366215-f9d5-424c-8a90-2cabdfeb3ffa',
      'grades': 'K,6,7,8',
      'user': {
        'username': 'JeffreyTeacher01',
        'gooruUId': '88638002-deb6-4f8d-b319-4a7ae18d0efe',
        'profileImageUrl': 'http://profile-qa.s3.amazonaws.com/88638002-deb6-4f8d-b319-4a7ae18d0efe.png'
      },
      'memberCount': 0
    }, {
      'classUid': '90d82226-5d0d-4673-a85d-f93aa0cbddf2',
      'visibility': true,
      'name': 'Class A1',
      'classCode': '2WZ8IJA',
      'grades': 'K',
      'user': {
        'username': 'JeffreyTeacher01',
        'gooruUId': '88638002-deb6-4f8d-b319-4a7ae18d0efe',
        'profileImageUrl': 'http://profile-qa.s3.amazonaws.com/88638002-deb6-4f8d-b319-4a7ae18d0efe.png'
      },
      'memberCount': 1
    }], 'totalHitCount': 2
  }
};
var server;

moduleForModel('class/class', 'Unit | Serializer | class/class', {
  needs: ['serializer:class/class'],

  beforeEach() {
    server = new Pretender(function() {
      this.get('/class/classes', function(request) {
        var response = RESPONSES[(request.queryParams.isStudent === 'true' ? 'isStudent' : 'isTeacher')];
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
      });
    });
  },

  afterEach() {
    server.shutdown();
  }
});

test('it normalizes queryRecord response for student', function(assert) {
  return this.store().queryRecord('class/class', {
    isStudent: true,
    limit: 10,
    offset: 0
  }).then((classes) => {
    assert.ok(classes);
    assert.equal(classes.get('length'), 1);
    var classItem = classes.objectAt(0);
    assert.equal(classItem.get('id'), '90d82226-5d0d-4673-a85d-f93aa0cbddf2');
    assert.equal(classItem.get('name'), 'Class A1');
    assert.equal(classItem.get('code'), '2WZ8IJA');
    assert.equal(classItem.get('grades'), 'K');
    assert.equal(classItem.get('greetings'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    assert.equal(classItem.get('teachers')[0].username, 'JeffreyTeacher01');
  });
});

test('it normalizes queryRecord response for teacher', function(assert) {
  return this.store().queryRecord('class/class', {
    isStudent: false,
    limit: 10,
    offset: 0
  }).then((classes) => {
    assert.ok(classes);
    assert.equal(classes.get('length'), 2);
    var classItem = classes.objectAt(0);
    assert.equal(classItem.get('id'), '67a96ec1-7383-4164-8068-5415621b7a34');
    assert.equal(classItem.get('name'), 'Class A2');
    assert.equal(classItem.get('code'), 'JR48FMF');
    assert.equal(classItem.get('grades'), 'K,6,7,8');
    assert.equal(classItem.get('greetings'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    assert.equal(classItem.get('teachers')[0].username, 'JeffreyTeacher01');
  });
});
