import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

// Stub performance service
const performanceServiceStub = Ember.Service.extend({

  findLessonPerformanceByClassAndCourseAndUnit(userId, classId, courseId, unitId) {
    var response;
    var promiseResponse;

    if (userId === 'any-user-id' && classId === '111-333-555' && courseId === '222-444-666' && unitId === '333-555-777') {
      response = [
        Ember.A([
          Ember.Object.create({
          id: "lesson-1",
          title: "lesson-title"
          })
        ])
      ];
    } else {
      response = [];
    }

    promiseResponse = new Ember.RSVP.Promise(function(resolve) {
      Ember.run.next(this, function() {
        resolve(response);
      });
    });

    return DS.PromiseArray.create({
      promise: promiseResponse
    });
  }
});

moduleForComponent('class/analytics/performance/student/gru-unit-performance', 'Integration | Component | class/analytics/performance/student/gru unit performance', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
    this.register('service:api-sdk/performance', performanceServiceStub);
    this.inject.service('api-sdk/performance', { as: 'performanceService' });
  }
});

test('Test for unit performance', function(assert) {
  const performance = Ember.Object.create(
    {
      id:'333-555-777',
      title: "Quiz :: Indian History",
      type: "performance/student-performance",
      score:75,
      completionDone: 0,
      completionTotal: 1,
      timeSpent: 4852359,
      ratingScore: 0,
      attempts: 2,
      isNotCompleted: true,
      displayableTimeSpent: "1.35h"
    });
  const classModel = Ember.Object.create({
    id:'111-333-555',
    course:'222-444-666'
  });
  const setUnitBreadcrumb = function(){
    return 'a';
  };

  this.set('setUnitBreadcrumb',setUnitBreadcrumb);
  this.set('userId', "any-user-id");
  this.set('classModel', classModel);
  this.set('performance', performance);
  this.set('index',0);
  this.render(hbs`{{class.analytics.performance.student.gru-unit-performance
    performance=performance
    classModel=classModel
    setUnitBreadcrumb=setUnitBreadcrumb
    userId=userId
    index=index
  }}`);
  const $component = this.$();
  const $clickableDiv= $component.find(".gru-unit-performance-container div:first-child"); //component dom element

  //const $unitContainer = $component.find();

  T.exists(assert, $component, 'Missing Unit Container');

  const $titleSpan = $component.find(".performance-unit-title span");

  assert.equal(T.text($titleSpan), "U1: Quiz :: Indian History", "Wrong title");


  Ember.run(() => {
    $clickableDiv.click();
  });

  return wait().then(function() {
    const $lessonTitleSpan = $component.find(".lessons-container");
    T.exists(assert, $lessonTitleSpan, 'Missing Lesson Container');
    assert.equal(T.text($lessonTitleSpan), "L1: Buddisum", "Wrong title");
  });


});
