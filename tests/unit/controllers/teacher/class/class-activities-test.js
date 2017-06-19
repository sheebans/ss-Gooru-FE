import { moduleFor, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import Class from 'gooru-web/models/content/class';
import Ember from 'ember';

moduleFor('controller:teacher/class/class-activities', 'Unit | Controller | teacher/class/class-activities', {
  integration: true
});

test('viewMore', function(assert) {
  let activities = [
    Ember.Object.create({id: 10}),
    Ember.Object.create({id: 20})
  ];

  let controller = this.subject({
    activities,
    classController: Ember.Object.create({
      class: Class.create({id: 1})
    }),
    classActivities: [],
    year: 2020,
    month: 10,
    classActivityService: {
      findClassActivities: (classId, contentType, startDate, endDate) => {
        return Ember.RSVP.resolve(activities);
      }
    }
  });

  controller.send('viewMore');
  return wait().then(function () {
    assert.equal(controller.get('classActivities').length, 1, 'Should have one daily activity');
    assert.equal(controller.get('month'), 9, 'Incorrect month');
  });

  controller.set('month', 0);
  controller.send('viewMore');
  return wait().then(function () {
    assert.equal(controller.get('month'), 11, 'Incorrect month');
    assert.equal(controller.get('year'), 2019, 'Incorrect year');
  });
});
