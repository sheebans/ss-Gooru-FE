import Ember from "ember";
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('player/gru-study-header', 'Unit | Component | player/gru study header', {
  integration: false
});

test('barChartData', function(assert) {
  let component;
  let aClass =
    Ember.Object.create({
      id: 'class-1',
      title: 'MPM-Data Analytics Class'
    });
  let classPerformanceSummary = [
    Ember.Object.create({
      id: 'class-1',
      classId: 'class-1',
      score: 80,
      timeSpent: 3242209,
      total: 10,
      totalCompleted: 5
    })
  ];
  Ember.run(() =>
    component = this.subject({
      classId: 'class-1',
      classService: {
        readClassInfo: (classId) => {
          assert.equal(classId, 'class-1', 'Class id should match');
          return Ember.RSVP.resolve(aClass);
        }
      },
      performanceService: {
        findClassPerformanceSummaryByClassIds: (classId)=> {
          assert.equal(classId[0], 'class-1', 'Class id should match');
          return Ember.RSVP.resolve(classPerformanceSummary);
        }
      }
    })
  );

  assert.equal(component.get('barChartData.firstObject.percentage'), 50 , 'Incorrect performance percentage');
});
