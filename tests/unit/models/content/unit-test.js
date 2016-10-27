import Ember from "ember";
import Lesson from 'gooru-web/models/content/lesson';
import { moduleFor, test } from 'ember-qunit';

moduleFor('model:content/unit', 'Unit | Model | content/unit', {
  unit: true
});

test('get a child lesson index', function (assert) {

  var model = this.subject({
    children: Ember.A([
      Lesson.create({
        id: '123',
        title: 'Lesson#1'
      }),
      Lesson.create({
        id: '456',
        title: 'Lesson#2'
      }),
      Lesson.create({
        id: '789',
        title: 'Lesson#3'
      })
    ])
  });

  var lesson = Lesson.create({
    id: '789',
    title: 'Lesson#3'
  });

  assert.equal(model.getChildLessonIndex(lesson), 2, "wrong lesson index");
});
