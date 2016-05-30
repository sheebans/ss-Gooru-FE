import {sortFeaturedCourses, getSubjects} from 'gooru-web/utils/sort-featured-courses';
import Ember from 'ember';
import { module, test } from 'qunit';

module('Unit | Utility | sort featured courses');

// Replace this with your real tests.
test('getSubjects and sort Courses', function (assert) {
  let courses = Ember.A([
    Ember.Object.create({
      id: 'choice-1',
      subject: 'K-12.Math',
      subjectSequence: 2,
      sequence: 2,
    }),
    Ember.Object.create({
      id: 'choice-2',
      subject: 'K-12.Science',
      subjectSequence: 1,
      sequence: 1,
    }),
    Ember.Object.create({
      id: 'choice-3',
      subject: 'K-12.English Language',
      subjectSequence: 3,
      sequence: 1,
    }),
    Ember.Object.create({
      id: 'choice-4',
      subject: 'K-12.Math',
      subjectSequence: 2,
      sequence: 3,
    }),
    Ember.Object.create({
      id: 'choice-5',
      subject: 'K-12.English Language',
      subjectSequence: 3,
      sequence: 2,
    }),
    Ember.Object.create({
      id: 'choice-6',
      subject: 'K-12.Math',
      subjectSequence: 2,
      sequence: 1,
    }),
    Ember.Object.create({
      id: 'choice-7',
      subject: 'K-12.Science',
      subjectSequence: 1,
      sequence: 2,
    }),
  ]);

  let orderedSubjects = getSubjects(courses);
  let orderedCourses = sortFeaturedCourses(courses);

  assert.equal(orderedSubjects.get("length"), 3, "Wrong ammount of subjects");
  assert.equal(orderedSubjects[0].subject, 'K-12.Science', "Wrong subject order");
  assert.equal(orderedSubjects[1].subject, 'K-12.Math', "Wrong subject order");
  assert.equal(orderedSubjects[2].subject, 'K-12.English Language', "Wrong subject order");

  assert.equal(orderedCourses.get("length"), 3, "Wrong ammount of courses");
  assert.equal(orderedCourses[0].get("length"), 2, "Wrong ammount of courses");
  assert.equal(orderedCourses[1].get("length"), 3, "Wrong ammount of courses");
  assert.equal(orderedCourses[2].get("length"), 2, "Wrong ammount of courses");

  assert.equal(orderedCourses[0][0].sequence, '1', "Wrong subject order 1:1");
  assert.equal(orderedCourses[0][1].sequence, '2', "Wrong subject order 1:2");
  assert.equal(orderedCourses[1][0].sequence, '1', "Wrong subject order 2:1");
  assert.equal(orderedCourses[1][1].sequence, '2', "Wrong subject order 2:2");
  assert.equal(orderedCourses[1][2].sequence, '3', "Wrong subject order 2:3");
  assert.equal(orderedCourses[2][0].sequence, '1', "Wrong subject order 3:1");
  assert.equal(orderedCourses[2][1].sequence, '2', "Wrong subject order 3:2");

});
