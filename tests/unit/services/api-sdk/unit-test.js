import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/unit', 'Unit | Service | api-sdk/unit', {
  needs: ['serializer:unit/unit', 'model:unit/unit', 'adapter:unit/unit']
});

test('findByClassAndCourse', function (assert) {
  const service = this.subject();

  const response = [
      {
        "title": "Code conventions",
        "gooruOid": "21",
        "collectionId": 12,
        "visibility": false
      },
      {
        "title": "Unit testing",
        "gooruOid": "22",
        "collectionId": 13,
        "visibility": false
      }
    ],
    routes = function () {
      this.get('/gooruapi/rest/v3/class/10/course/11/unit', function () {
        return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
      }, 0);
    };

  this.pretender.map(routes);

  var done = assert.async();
  const promise = service.findByClassAndCourse("10", "11");
  promise.then(function(units){
    assert.equal(units.get("length"), 2, "Missing units");
    const unit = units.get("firstObject");
    assert.equal(unit.get("id"), "21", "Wrong id");
    assert.equal(unit.get("title"), "Code conventions", "Wrong title");
    assert.equal(unit.get("visibility"), false, "Wrong visibility");
    assert.equal(unit.get("collection"), 12, "Wrong collection");
    done();
  });
});
