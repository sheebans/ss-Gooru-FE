import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

// Stub performance service

moduleForComponent('class/analytics/performance/student/gru-lesson-performance', 'Integration | Component | class/analytics/performance/student/gru lesson performance', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Test for started lesson performance', function(assert) {
  const lesson = Ember.Object.create(
    {
      id:'333-555-777',
      title: "Quiz :: Indian History",
      type: "lesson",
      score:75,
      completionDone: 0,
      completionTotal: 1,
      timeSpent: 4852359,
      ratingScore: 0,
      isCompleted: true,
      hasStarted: true,
      collections:Ember.A([
        Ember.Object.create({
          id:'first-collection-id',
          title: "Indian History Collection",
          type: "collection",
          score:75,
          completionDone: 0,
          completionTotal: 1,
          timeSpent: 4852359,
          ratingScore: 0,
          isCompleted: true,
          isCollection: true,
          hasStarted:true
        }),
        Ember.Object.create({
          id:'second-collection-id',
          title: "Indian History Assessment",
          type: "assessment",
          score:75,
          completionDone: 0,
          completionTotal: 1,
          timeSpent: 442359,
          ratingScore: 0,
          isCompleted: false,
          isAssessment: true
        })
      ])
    });
  this.set('lesson', lesson);
  this.set('index',0);
  this.set('selectedLessonId', 'not-my-id');
  this.set('onSelectLesson', function(){
    assert.ok(true, "This should be called 1 time");
  });
  assert.expect(12);
  this.render(hbs`{{class.analytics.performance.student.gru-lesson-performance
    lesson=lesson
    localIndex=index
    index=index
    onSelectLesson=onSelectLesson
    selectedLessonId=selectedLessonId
  }}`);
  const $component = this.$();

  T.exists(assert, $component, 'Missing Lesson Container');//1

  const $lessonTitle = $component.find(".lesson-performance-title span");

  assert.equal(T.text($lessonTitle), "L1: Quiz :: Indian History", "Wrong title");//2

  const $clickableAnchor= $component.find(".gru-lesson-performance-container a"); //component dom element
  T.exists(assert, $clickableAnchor, 'Missing Clickable Anchor');//3

  Ember.run(() => {
    $clickableAnchor.click();//4
  });

  return wait().then(function() {
    const $collectionsContainer = $component.find(".collections-container");
    assert.equal($collectionsContainer.hasClass('in'), true, "Collections container did not open");//5

    const $firstCollection = $component.find("div.collections-container div.collection-performance:first-child");
    T.exists(assert, $firstCollection, 'Missing First collection');//6

    const $collectionTitle = $component.find(".collections-container div:first-child .collection-performance-title span");
    T.exists(assert, $collectionTitle, 'Missing collection Title');//7
    assert.equal(T.text($collectionTitle), "C1: Indian History Collection", "Wrong title");//8

    const $collectionRedoButton = $component.find(".collections-container div:first-child .collection-performance-title div button");
    T.exists(assert, $collectionRedoButton, 'Missing collection redo button');//9
    assert.equal($collectionRedoButton.hasClass('collection-redo-button'), true, "Redo class from button missing");//10

    const $collectionViewReportButton = $component.find(".collections-container div:first-child .collection-performance-title div button:nth-child(2)");
    T.exists(assert, $collectionViewReportButton, 'Missing collection view report button');//11
    assert.equal($collectionViewReportButton.hasClass('collection-view-report-button'), true, "View report class from second button missing");//12

  });
});

test('Test for not started lesson performance', function(assert) {
  const lesson = Ember.Object.create(
    {
      id:'333-555-777',
      title: "Quiz :: Indian History",
      type: "lesson",
      score:75,
      completionDone: 0,
      completionTotal: 1,
      timeSpent: 4852359,
      ratingScore: 0,
      hasStarted: false,
      collections:Ember.A([
        Ember.Object.create({
          id:'first-collection-id',
          title: "Indian History Collection",
          type: "collection",
          score:75,
          completionDone: 0,
          completionTotal: 1,
          timeSpent: 4852359,
          ratingScore: 0,
          isCompleted: false,
          isCollection: true,
          hasStarted:true
        }),
        Ember.Object.create({
          id:'second-collection-id',
          title: "Indian History Assessment",
          type: "assessment",
          score:75,
          completionDone: 5,
          completionTotal: 5,
          timeSpent: 442359,
          ratingScore: 0,
          isCompleted: true,
          hasStarted:false,
          isAssessment: true
        }),
        Ember.Object.create({
          id:'third-collection-id',
          title: "Indian History Assessment",
          type: "assessment",
          score:75,
          completionDone: 0,
          completionTotal: 1,
          timeSpent: 0,
          ratingScore: 0,
          isCompleted: true,
          hasStarted:false,
          isAssessment: true
        })
      ])
    });

  this.set('lesson', lesson);
  this.set('index',0);
  this.set('selectedLessonId', 'not-my-id');
  this.set('onSelectLesson', function(){
    assert.ok(true, "This should be called 1 time");
  });

  assert.expect(11);

  this.render(hbs`{{class.analytics.performance.student.gru-lesson-performance
    lesson=lesson
    localIndex=index
    index=index
    selectedLessonId=selectedLessonId
    onSelectLesson=onSelectLesson
  }}`);
  const $component = this.$();

  T.exists(assert, $component, 'Missing Lesson Container'); //1

  const $lessonTitle = $component.find(".lesson-performance-title span");

  assert.equal(T.text($lessonTitle), "L1: Quiz :: Indian History", "Wrong title"); //2

  const $clickableAnchor= $component.find(".gru-lesson-performance-container a"); //component dom element
  T.exists(assert, $clickableAnchor, 'Missing Clickable Anchor'); //3

  const $chevronIcon = $component.find(".lesson-performance-title span i.fa");
  assert.ok($chevronIcon.hasClass("fa-chevron-down"), "Missing downwards chevron"); //4

  Ember.run(() => {
    $clickableAnchor.click();//5
  });

  assert.ok($chevronIcon.hasClass("fa-chevron-up"), "Missing upwards chevron"); //6

  return wait().then(function() {

    const $firstCollection = $component.find("div.collections-container div.collection-performance:nth-child(2)");
    T.exists(assert, $firstCollection, 'Missing Second collection'); //7

    const $collectionTitle = $component.find(".collections-container div:nth-child(2) .collection-performance-title span");
    T.exists(assert, $collectionTitle, 'Missing collection Title'); //8

    assert.equal(T.text($collectionTitle), "A2: Indian History Assessment", "Wrong title"); //9

    const $collectionStudyButton = $component.find(".collections-container div:first-child .collection-performance-title div button:first-child");

    T.exists(assert, $collectionStudyButton, 'Missing collection study button');//10


    assert.equal($collectionStudyButton.hasClass('collection-study-button'), true, "Study class from first button missing"); //11



  });


});
test('Test lesson performance with no collections', function(assert) {
  const lesson = Ember.Object.create(
    {
      id:'333-555-777',
      title: "Quiz :: Indian History",
      type: "lesson",
      score:75,
      completionDone: 0,
      completionTotal: 1,
      timeSpent: 4852359,
      ratingScore: 0,
      hasStarted: false,
      collections:Ember.A()
    });

  this.set('lesson', lesson);
  this.set('index',0);
  this.set('selectedLessonId', 'not-my-id');
  this.set('onSelectLesson', function(){
    assert.ok(true, "This should be called 1 time each click");
  });

  assert.expect(6);
  this.render(hbs`{{class.analytics.performance.student.gru-lesson-performance
    lesson=lesson
    localIndex=index
    index=index
    selectedLessonId=selectedLessonId
    onSelectLesson=onSelectLesson
  }}`);
  const $component = this.$();

  T.exists(assert, $component, 'Missing Lesson Container'); //1

  const $clickableAnchor= $component.find(".gru-lesson-performance-container a"); //component dom element
  T.exists(assert, $clickableAnchor, 'Missing Clickable Anchor'); //2


  Ember.run(() => {
    $clickableAnchor.click();//3
  });

  return wait().then(function() {
    const $collectionsContainer = $component.find(".collections-container");
    assert.equal($collectionsContainer.hasClass('in'), true, "Collections container did not open");//4

    const $collectionNoContentSpan = $component.find(".collections-container span");

    T.exists(assert, $collectionNoContentSpan, 'Missing no content message span');//5
    assert.equal(T.text($collectionNoContentSpan), "No content available", "Wrong no content message");//6
  });



});
