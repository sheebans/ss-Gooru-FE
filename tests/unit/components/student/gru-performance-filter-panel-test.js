import { moduleForComponent, test } from 'ember-qunit';
import Category from 'gooru-web/models/rubric/rubric-category';


moduleForComponent('student/gru-performance-filter-panel', 'Unit | Component | student/gru performance filter panel', {
  unit: true
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
