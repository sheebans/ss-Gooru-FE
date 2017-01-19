import { moduleFor, test } from 'ember-qunit';
import Goal from 'gooru-web/models/goal/goal';

moduleFor('serializer:goal/goal', 'Unit | Serializer | goal/goal');

test('serializeCreateGoal', function (assert) {
  const serializer = this.subject();
  const modelInstance = Goal.create({
    title: 'Goal Title',
    status: 'not_started',
    description: 'the desc',
    reflection: 'the reflection',
    startDate: new Date(1994, 12, 10),
    endDate: new Date(1994, 12, 10)
  });
  const modelObject = serializer.serializeCreateGoal(modelInstance);
  assert.equal(modelObject.title, 'Goal Title', 'Wrong title');
  assert.equal(modelObject.status, 'not_started', 'Wrong status');
  assert.equal(modelObject.description, 'the desc', 'Wrong description');
  assert.equal(modelObject.reflection, 'the reflection', 'Wrong reflection');
  assert.ok(modelObject.start_date, 'Missing startDate');
  assert.ok(modelObject.end_date, 'Missing endDate');
});

test('serializeCreateGoal with no dates', function (assert) {
  const serializer = this.subject();
  const modelInstance = Goal.create({
    title: 'Goal Title',
    status: 'not_started',
    description: 'the desc',
    reflection: 'the reflection'
  });
  const modelObject = serializer.serializeCreateGoal(modelInstance);
  assert.equal(modelObject.title, 'Goal Title', 'Wrong title');
  assert.equal(modelObject.status, 'not_started', 'Wrong status');
  assert.equal(modelObject.description, 'the desc', 'Wrong description');
  assert.equal(modelObject.reflection, 'the reflection', 'Wrong reflection');
  assert.ok(!modelObject.start_date, 'startDate should not be present');
  assert.ok(!modelObject.end_date, 'endDate should not be present');
});
