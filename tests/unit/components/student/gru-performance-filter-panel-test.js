import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('student/gru-performance-filter-panel', 'Unit | Component | student/gru performance filter panel', {
  unit: true
});


test('selectActivity', function(assert) {
  let component = this.subject();
  component.send('selectActivity', 'activity-test');
  assert.equal(component.get('activityFilter'), 'activity-test' , 'Incorrect activity filter');
});

test('showActivitySubcategory', function(assert) {
  let component = this.subject();
  assert.equal(component.get('showActivitySubcategory'), true , 'Should show the activity subCategory');
  component.set('isActivityFiltersExpanded',true);
  assert.equal(component.get('showActivitySubcategory'), false , 'Should not show the activity subCategory');
});

test('expandPanel', function(assert) {
  let component = this.subject();
  component.send('expandPanel', 'subject');
  assert.equal(component.get('isSubjectFiltersExpanded'), true , 'Incorrect value of isSubjectFiltersExpanded');
  component.send('expandPanel', 'subject');
  assert.equal(component.get('isSubjectFiltersExpanded'), false , 'Incorrect value of isSubjectFiltersExpanded');

  component.send('expandPanel', 'course');
  assert.equal(component.get('isCourseFiltersExpanded'), false , 'Incorrect value of isCourseFiltersExpanded');
  component.send('expandPanel', 'course');
  assert.equal(component.get('isCourseFiltersExpanded'), true , 'Incorrect value of isCourseFiltersExpanded');

  component.send('expandPanel', 'unit');
  assert.equal(component.get('isUnitFiltersExpanded'), true , 'Incorrect value of isUnitFiltersExpanded');
  component.send('expandPanel', 'unit');
  assert.equal(component.get('isUnitFiltersExpanded'), false , 'Incorrect value of isUnitFiltersExpanded');

  component.send('expandPanel', 'lesson');
  assert.equal(component.get('isLessonFiltersExpanded'), true , 'Incorrect value of isLessonFiltersExpanded');
  component.send('expandPanel', 'lesson');
  assert.equal(component.get('isLessonFiltersExpanded'), false , 'Incorrect value of isLessonFiltersExpanded');

  component.send('expandPanel', 'activity');
  assert.equal(component.get('isActivityFiltersExpanded'), true , 'Incorrect value of isActivityFiltersExpanded');
  component.send('expandPanel', 'activity');
  assert.equal(component.get('isActivityFiltersExpanded'), false , 'Incorrect value of isActivityFiltersExpanded');

  component.send('expandPanel', 'time-period');
  assert.equal(component.get('isTimePeriodFiltersExpanded'), true , 'Incorrect value of isTimePeriodFiltersExpanded');
  component.send('expandPanel', 'time-period');
  assert.equal(component.get('isTimePeriodFiltersExpanded'), false , 'Incorrect value of isTimePeriodFiltersExpanded');
});

test('unit', function(assert) {
  let component = this.subject();
  const selectedCourse = Ember.Object.create({
    id: '0101',
    title: 'Course 1',
    children: [
      Ember.Object.create({
        id: '0102',
        title: 'Unit 1',
        children: [
          Ember.Object.create({
            id: '0103',
            title: 'Lesson 1'
          })
        ]
      }),
      Ember.Object.create({
        id: '0202',
        title: 'Unit 2',
        children: [
          Ember.Object.create({
            id: '0203',
            title: 'Lesson 1'
          })
        ]
      })
    ]
  });

  component.set('selectedCourse', selectedCourse);
  component.set('unitId', '0102');
  assert.equal(component.get('unit.id'), '0102' , 'Incorrect unit');
});

test('lesson', function(assert) {
  let component = this.subject();
  const selectedUnit = Ember.Object.create({
      id: '0102',
      title: 'Unit 1',
      children: [
        Ember.Object.create({
          id: '0103',
          title: 'Lesson 1'
        })
      ]
  });

  component.set('unit', selectedUnit);
  component.set('lessonId', '0103');
  assert.equal(component.get('lesson.id'), '0103' , 'Incorrect lesson');
});

test('units', function(assert) {
  let component = this.subject();
  const selectedUnit = Ember.Object.create({
    id: '0102',
    title: 'Unit 1',
    children: [
      Ember.Object.create({
        id: '0103',
        title: 'Lesson 1'
      })
    ]
  });

  component.set('unit', selectedUnit);
  component.set('lessonId', '0103');
  assert.equal(component.get('lesson.id'), '0103' , 'Incorrect lesson');
});

test('units', function(assert) {
  let component = this.subject();

  const selectedCourse = Ember.Object.create({
    id: '0101',
    title: 'Course 1',
    children: [
      Ember.Object.create({
        id: '0102',
        title: 'Unit 1',
        children: [
          Ember.Object.create({
            id: '0103',
            title: 'Lesson 1'
          })
        ]
      }),
      Ember.Object.create({
        id: '0202',
        title: 'Unit 2',
        children: [
          Ember.Object.create({
            id: '0203',
            title: 'Lesson 1'
          })
        ]
      })
    ]
  });

  component.set('selectedCourse', selectedCourse);

  assert.equal(component.get('units').length, 2 , 'Incorrect number of units');
});

test('lessons', function(assert) {
  let component = this.subject();
  const selectedUnit = Ember.Object.create({
    id: '0102',
    title: 'Unit 1',
    children: [
      Ember.Object.create({
        id: '0103',
        title: 'Lesson 1'
      })
    ]
  });

  component.set('unit', selectedUnit);
  assert.equal(component.get('lessons').length, 1 , 'Incorrect number of lessons');
});
