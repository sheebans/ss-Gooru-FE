import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';
import MapContext from 'gooru-web/models/map/map-context';
import MapSuggestion from 'gooru-web/models/map/map-suggestion';

moduleForAdapter('adapter:map/course-map', 'Unit | Adapter | map/course-map', {
  // needs: []
});

test('getLessonInfo', function(assert) {
  const adapter = this.subject();
  const expectedData = 'any-data';
  this.pretender.map(function() {
    this.get('/api/nucleus/v2/course-map/course-id/units/unit-id/lessons/lesson-id',
      () => [ 200, {'Content-Type': 'text/plain'}, expectedData ], false);
  });
  this.pretender.unhandledRequest = (verb, path) => assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  let done = assert.async();
  adapter.getLessonInfo('class-id', 'course-id', 'unit-id', 'lesson-id')
    .then(response => {
      assert.equal(response, expectedData, 'Response should match');
      done();
    });
});

test('createNewPath', function (assert) {
  let adapter = this.subject();
  let expectedResponse = 1;
  this.pretender.map(function () {
    this.post('/api/nucleus/v2/course-map/paths', function(request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal(requestBodyJson['ctx_course_id'], 'course-id', 'Wrong ctx_course_id');
      assert.equal(requestBodyJson['ctx_unit_id'], 'unit-id', 'Wrong ctx_unit_id');
      assert.equal(requestBodyJson['ctx_lesson_id'], 'lesson-id', 'Wrong ctx_lesson_id');
      assert.equal(requestBodyJson['ctx_collection_id'], null, 'Wrong ctx_collection_id');
      assert.equal(requestBodyJson['ctx_class_id'], undefined, 'Wrong ctx_class_id');
      assert.equal(requestBodyJson['path_id'], undefined, 'Wrong path_id');
      assert.equal(requestBodyJson['target_content_type'], 'collection', 'Wrong target_content_type');
      assert.equal(requestBodyJson['target_content_subtype'], 'pre-test', 'Wrong target_content_subtype');
      //assert.equal(requestBodyJson['target_course_id'], 'course-id', 'Wrong target_course_id');
      //assert.equal(requestBodyJson['target_unit_id'], 'unit-id', 'Wrong target_unit_id');
      //assert.equal(requestBodyJson['target_lesson_id'], 'lesson-id', 'Wrong target_lesson_id');
      assert.equal(requestBodyJson['target_collection_id'], 'suggestion-id', 'Wrong target_collection_id');
      return [201, {'Content-Type': 'text/plain', 'Location': expectedResponse}, undefined];
    }, false);
  });
  let done = assert.async();
  let context = MapContext.create({
    courseId: 'course-id',
    unitId: 'unit-id',
    lessonId: 'lesson-id',
    collectionId: null
  });
  let suggestion = MapSuggestion.create({
    id: 'suggestion-id',
    type: 'collection',
    subType: 'pre-test'
  });
  adapter.createNewPath(context, suggestion)
    .then(response => {
      assert.equal(response, expectedResponse, 'Response should match');
      done();
    });
});
