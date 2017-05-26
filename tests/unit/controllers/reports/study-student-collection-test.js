import Ember from "ember";
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:reports/study-student-collection', 'Unit | Controller | reports/study student collection', {
  integration: false
});
test('next without suggestions', function (assert) {
  let done = assert.async();
  let controller = this.subject({
    mapLocation:{
      context:Ember.Object.create({classId:'class-id',courseId:'course-id'})
    },
    transitionToRoute: (transition, classId, courseId) => {
      assert.equal(transition, 'study-player', 'Transition route should match');
      assert.equal(classId,'class-id', 'Class id should match');
      assert.equal(courseId,'course-id', 'Course id should match');
      done();
    }
  });
  controller.send('next');
});

test('playPostTestSuggestion', function (assert) {
  let done = assert.async();
  let suggestionResource = Ember.Object.create({isResource:true,id:'suggestion-id'});
  let actualContext = Ember.Object.create({classId:'class-id',courseId:'course-id'});
  let controller = this.subject({
    mapLocation:{
      context:actualContext,
      postTestSuggestion:suggestionResource
    },
    transitionToRoute: (transition, classId,courseId,id) => {
      assert.equal(transition, 'resource-player', 'Transition route should match');
      assert.equal(classId,'class-id', 'Class id should match');
      assert.equal(courseId,'course-id', 'Course id should match');
      assert.equal(id,'suggestion-id', 'Suggestion id should match');
      done();
    },
    courseMapService: {
      createNewPath: (context, suggestion)=> {
        assert.deepEqual(suggestion, suggestionResource, 'Suggestion should match');
        assert.deepEqual(context, actualContext, 'Context should match');
        return Ember.RSVP.resolve(true);
      }
    }
  });
  controller.send('playPostTestSuggestion');
});

test('playBackFillSuggestion', function (assert) {
  let done = assert.async();
  let suggestionResource = Ember.Object.create({isResource:true,id:'suggestion-id'});
  let actualContext = Ember.Object.create({classId:'class-id',courseId:'course-id'});
  let controller = this.subject({
    mapLocation:{
      context:actualContext,
      backFillSuggestion:suggestionResource
    },
    transitionToRoute: (transition, classId,courseId,id) => {
      assert.equal(transition, 'resource-player', 'Transition route should match');
      assert.equal(classId,'class-id', 'Class id should match');
      assert.equal(courseId,'course-id', 'Course id should match');
      assert.equal(id,'suggestion-id', 'Suggestion id should match');
      done();
    },
    courseMapService: {
      createNewPath: (context, suggestion)=> {
        assert.deepEqual(suggestion, suggestionResource, 'Suggestion should match');
        assert.deepEqual(context, actualContext, 'Context should match');
        return Ember.RSVP.resolve(true);
      }
    }
  });
  controller.send('playBackFillSuggestion');
});
test('playResourceSuggestion', function (assert) {
  let done = assert.async();
  let suggestionResource = Ember.Object.create({isResource:true,id:'suggestion-id'});
  let actualContext = Ember.Object.create({classId:'class-id',courseId:'course-id'});
  let controller = this.subject({
    mapLocation:{
      context:actualContext,
      resourceSuggestion:suggestionResource
    },
    transitionToRoute: (transition, classId,courseId,id) => {
      assert.equal(transition, 'resource-player', 'Transition route should match');
      assert.equal(classId,'class-id', 'Class id should match');
      assert.equal(courseId,'course-id', 'Course id should match');
      assert.equal(id,'suggestion-id', 'Suggestion id should match');
      done();
    },
    courseMapService: {
      createNewPath: (context, suggestion)=> {
        assert.deepEqual(suggestion, suggestionResource, 'Suggestion should match');
        assert.deepEqual(context, actualContext, 'Context should match');
        return Ember.RSVP.resolve(true);
      }
    }
  });
  controller.send('playResourceSuggestion');
});
