import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

// Stub performance service

moduleForComponent('class/analytics/performance/student/gru-lesson-performance', 'Integration | Component | class/analytics/performance/student/gru lesson performance', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Test for lesson performance', function(assert) {
  const lesson = Ember.Object.create(
    {
      id:'333-555-777',
      title: "Quiz :: Indian History",
      type: "performance/performance",
      score:75,
      completionDone: 0,
      completionTotal: 1,
      timeSpent: 4852359,
      ratingScore: 0,
      isCompleted: false
    });
  const classModel = Ember.Object.create({
    id:'111-333-555',
    course:'222-444-666'
  });

  this.set('userId', "any-user-id");
  this.set('classModel', classModel);
  this.set('lesson', lesson);
  this.set('index',0);
  this.render(hbs`{{class.analytics.performance.student.gru-lesson-performance
    lesson=lesson
    index=index
  }}`);
  const $component = this.$();

  //const $unitContainer = $component.find();

  T.exists(assert, $component, 'Missing Lesson Container');

  const $titleSpan = $component.find(".lesson-performance-title span");

  assert.equal(T.text($titleSpan), "L1: Quiz :: Indian History", "Wrong title");


});
