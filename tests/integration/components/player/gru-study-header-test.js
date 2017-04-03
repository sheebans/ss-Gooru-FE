import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Class from 'gooru-web/models/content/class';

const classServiceStub = Ember.Service.extend({

  readClassInfo: function(classId) {
    const aClassInfo = Class.create(Ember.getOwner(this).ownerInjection(), {
      id: 'class-1',
      title: 'MPM-Data Analytics Class',
      code: 'CZHAMO3'
    });

    return new Ember.RSVP.resolve(aClassInfo);
  }
});

const performanceServiceStub = Ember.Service.extend({

  findClassPerformanceSummaryByClassIds: function(classId) {
    const aClassPerformance = Class.create({
      id: 'class-1',
      classId: 'class-1',
      score: 80,
      timeSpent: 3242209,
      total: 10,
      totalCompleted: 5
    });

    return new Ember.RSVP.resolve([aClassPerformance]);
  }
});

moduleForComponent('player/gru-study-header', 'Integration | Component | player/gru study header', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
    this.register('service:api-sdk/class', classServiceStub);
    this.inject.service('api-sdk/class');
    this.register('service:api-sdk/performance', performanceServiceStub);
    this.inject.service('api-sdk/performance');
  }
});

test('Layout', function(assert) {

  //var aClass = Ember.Object.create({
  //  id: 'class-1',
  //  title: 'MPM-Data Analytics Class'
  //  performanceSummary: Ember.Object.create({
  //    classId: 'class-1',
  //    id: 'summary-01',
  //    score: 80,
  //    timeSpent: 3242209,
  //    total: 10,
  //    totalCompleted: 5
  //  })
  //});

  const classId= 'class-1';

  this.set('classId', classId);

  this.render(hbs`{{player/gru-study-header classId=classId}}`);

  var $component = this.$(); //component dom element
  const $header = $component.find(".gru-study-header");
  T.exists(assert, $header, "Missing header section");

  const $courseInfo = $header.find(".course-info");
  T.exists(assert, $courseInfo, "Missing course-info");
  T.exists(assert, $courseInfo.find(".course-title"), "Missing course title");
  T.exists(assert, $courseInfo.find(".actions .course-map"), "Missing course map button");

  const $performanceInfo = $header.find(".performance-info");
  T.exists(assert, $performanceInfo, "Missing performance-info");

  const $scoreChart = $performanceInfo.find(".graphic.performance .gru-bubble-chart");
  T.exists(assert, $scoreChart, "Missing score chart");
  T.exists(assert, $performanceInfo.find(".graphic.performance .legend"), "Missing performance chart legend");
  assert.equal(T.text($scoreChart.find(".bubble-circle span")), '80%', 'Wrong score text');

  T.exists(assert, $performanceInfo.find(".bar-charts .completion-chart .gru-x-bar-chart"), "Missing completion chart");
  T.exists(assert, $performanceInfo.find(".bar-charts .completion-chart .legend"), "Missing completion chart");

  T.exists(assert, $performanceInfo.find(".resources"), "Missing resources section");
  T.exists(assert, $performanceInfo.find(".resources .count-resources .counter"), "Missing counter of resources");
  T.exists(assert, $performanceInfo.find(".resources .count-resources button"), "Missing button of resources");
  T.exists(assert, $performanceInfo.find(".resources .navigation"), "Missing resources navigation");

  T.exists(assert, $performanceInfo.find(".resources .collapse-expand"), "Missing collapse-expand link");
});

test('Collapse-expand performance information', function(assert) {

  this.on('parentAction', function(){
    assert.ok(true, 'external Action was called!');
  });

  this.render(hbs`{{player/gru-study-header onToggleHeader='parentAction'}}`);
  var $component = this.$(); //component dom element
  const $header = $component.find(".gru-study-header");
  const $courseInfo = $header.find(".course-info");
  const $performanceInfo = $header.find(".performance-info");
  const $performanceInfoButton = $performanceInfo.find(".resources a.collapse-expand");

  assert.ok($performanceInfo.hasClass('visible'), 'Performance Info container has visible class by default');
  assert.ok($performanceInfoButton, "Missing expand-collapse button");
  $performanceInfoButton.click();
  return wait().then(function () {
    assert.ok($performanceInfo.hasClass('hidden'), 'Performance Info container should be hidden');

    const $courseTitleLink = $courseInfo.find(".course-title");
    $courseTitleLink.click();
    return wait().then(function () {
      assert.ok($performanceInfo.hasClass('visible'), 'Performance Info container is expanded');
    });
  });
});
