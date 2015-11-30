import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/lesson', 'Unit | Service | api-sdk/lesson', {
  needs: ['serializer:lesson/lesson', 'model:lesson/lesson', 'adapter:lesson/lesson']
});

test('findByClassCourseAndUnit', function (assert) {
  const service = this.subject();

  const response = [
      {
        "title": "Property name conventions",
        "gooruOid": "7",
        "collectionId": 12,
        "visibility": false
      },
      {
        "title": "Method naming convention",
        "gooruOid": "17",
        "collectionId": 13,
        "visibility": false
      },
      {
        "title": "Class naming conventions",
        "gooruOid": "27",
        "collectionId": 14,
        "visibility": false
      }
    ],
    routes = function () {
      this.get('/gooruapi/rest/v3/class/10/course/11/unit/12/lesson', function () {
        return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
      }, 0);
    };

  this.pretender.map(routes);

  var done = assert.async();
  const promise = service.findByClassCourseAndUnit("10", "11","12");
  promise.then(function(lessons){
    assert.equal(lessons.get("length"), 3, "Missing units");
    const lesson = lessons.get("firstObject");
    assert.equal(lesson.get("id"), "7", "Wrong id");
    assert.equal(lesson.get("title"), "Property name conventions", "Wrong title");
    assert.equal(lesson.get("visibility"), false, "Wrong visibility");
    assert.equal(lesson.get("collection"), 12, "Wrong collection");
    done();
  });
});
