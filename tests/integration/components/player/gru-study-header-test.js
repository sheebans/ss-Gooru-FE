import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Class from 'gooru-web/models/content/class';
import Resource from 'gooru-web/models/content/resource';
import Collection from 'gooru-web/models/collection/collection';
import { NU_COURSE_VERSION } from 'gooru-web/config/config';

const classServiceStub = Ember.Service.extend({
  readClassInfo: function() {
    const aClassInfo = Class.create(Ember.getOwner(this).ownerInjection(), {
      id: 'class-1',
      title: 'MPM-Data Analytics Class',
      code: 'CZHAMO3'
    });

    return new Ember.RSVP.resolve(aClassInfo);
  }
});

const performanceServiceStub = Ember.Service.extend({
  findClassPerformanceSummaryByStudentAndClassIds: function() {
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

const suggestServiceStub = Ember.Service.extend({
  suggestResourcesForCollection: function() {
    const suggestedResources = [
      Resource.create({
        id: 'resource-1',
        title: 'resource1',
        format: 'video'
      }),
      Resource.create({
        id: 'resource-2',
        title: 'resource2',
        format: 'image'
      })
    ];

    return new Ember.RSVP.resolve(suggestedResources);
  }
});

moduleForComponent(
  'player/gru-study-header',
  'Integration | Component | player/gru study header',
  {
    integration: true,
    beforeEach: function() {
      this.i18n = this.container.lookup('service:i18n');
      this.i18n.set('locale', 'en');
      this.register('service:api-sdk/class', classServiceStub);
      this.inject.service('api-sdk/class');
      this.register('service:api-sdk/performance', performanceServiceStub);
      this.inject.service('api-sdk/performance');
      this.register('service:api-sdk/suggest', suggestServiceStub);
      this.inject.service('api-sdk/suggest');
    }
  }
);

test('Layout', function(assert) {
  this.set('session', {
    userId: 'user-id'
  });

  let resourceA = Ember.Object.create({
    id: 1,
    sequence: 1,
    title: 'resource1',
    format: 'image_resource'
  });

  let resourceB = Ember.Object.create({
    id: 2,
    sequence: 2,
    title: 'resource1',
    format: 'video_resource'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: true,
      resources: Ember.A([resourceA, resourceB])
    })
  );

  this.set('breadcrumbs', ['unit 1', 'lesson 1', 'collection 1']);

  this.set('classId', 'class-1');

  this.set('courseTitle', 'Marine Biology');

  this.set('actualResource', resourceA);
  this.set('resourceSequence', resourceA.get('sequence'));

  this.render(
    hbs`{{player/gru-study-header classId=classId collection=collection actualResource=actualResource resourceSequence=resourceSequence session=session courseTitle=courseTitle breadcrumbs=breadcrumbs}}`
  );

  var $component = this.$(); //component dom element
  const $header = $component.find('.gru-study-header');
  T.exists(assert, $header, 'Missing header section');

  const $courseInfo = $header.find('.course-info');
  T.exists(assert, $courseInfo, 'Missing course-info');
  T.exists(assert, $courseInfo.find('.course-title'), 'Missing course title');
  T.exists(
    assert,
    $courseInfo.find('.course-title i'),
    'Missing course title icon'
  );
  assert.equal(
    T.text($courseInfo.find('.course-title .title')),
    'Marine Biology',
    'Wrong course title text'
  );
  T.exists(assert, $courseInfo.find('.breadcrumbs'), 'Missing breadcrumbs');
  assert.equal(
    $courseInfo.find('.breadcrumb-title').length,
    3,
    'Wrong breadcrumb-titles'
  );
  assert.equal(
    T.text($courseInfo.find('.breadcrumb-title:eq(0)')),
    'unit 1',
    'Wrong first breadcrumb title'
  );
  assert.equal(
    T.text($courseInfo.find('.breadcrumb-title:eq(1)')),
    'lesson 1',
    'Wrong second breadcrumb title'
  );
  assert.equal(
    T.text($courseInfo.find('.breadcrumb-title:eq(2)')),
    'collection 1',
    'Wrong third breadcrumb title'
  );

  T.exists(
    assert,
    $courseInfo.find('.actions .course-map'),
    'Missing course map button'
  );

  const $performanceInfo = $header.find('.performance-info');
  T.exists(assert, $performanceInfo, 'Missing performance-info');

  const $scoreChart = $performanceInfo.find(
    '.graphic.performance .gru-bubble-chart'
  );
  T.exists(assert, $scoreChart, 'Missing score chart');
  T.exists(
    assert,
    $performanceInfo.find('.graphic.performance .legend'),
    'Missing performance chart legend'
  );
  assert.equal(
    T.text($scoreChart.find('.bubble-circle span')),
    '80%',
    'Wrong score text'
  );

  T.exists(
    assert,
    $performanceInfo.find('.bar-charts .completion-chart .gru-x-bar-chart'),
    'Missing completion chart'
  );
  T.exists(
    assert,
    $performanceInfo.find('.bar-charts .completion-chart .legend'),
    'Missing completion chart'
  );

  T.exists(
    assert,
    $performanceInfo.find('.resources'),
    'Missing resources section'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .count-resources .counter'),
    'Missing counter of resources'
  );
  assert.equal(
    T.text($performanceInfo.find('.resources .count-resources .counter')),
    '1/2',
    'Wrong counter of resources'
  );

  T.exists(
    assert,
    $performanceInfo.find('.resources .count-resources button'),
    'Missing button of resources'
  );
  assert.equal(
    T.text($performanceInfo.find('.resources .count-resources button')),
    'Resources',
    'Wrong button text'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .navigation'),
    'Missing resources navigation'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .navigation .next'),
    'Missing next label'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .navigation .next-resource'),
    'Missing next resource section'
  );
  T.exists(
    assert,
    $performanceInfo.find(
      '.resources .navigation .next-resource i.video_resource-icon'
    ),
    'Incorrect next resource icon'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .navigation .next-resource .title'),
    'Incorrect next resource title'
  );

  T.exists(
    assert,
    $performanceInfo.find('.suggestions'),
    'Missing suggestions section'
  );
  T.exists(
    assert,
    $performanceInfo.find('.suggestions .description'),
    'Missing suggestions description'
  );
  T.exists(
    assert,
    $performanceInfo.find('.suggestions .suggested-resources'),
    'Missing suggested resources'
  );
  assert.equal(
    $performanceInfo.find('.suggestions .suggested-resources .btn-resource')
      .length,
    2,
    'Wrong suggested resource buttons'
  );
  T.exists(
    assert,
    $performanceInfo.find(
      '.suggestions .suggested-resources .btn-resource:eq(0) .video-icon'
    ),
    'Missing resource video icon'
  );
  T.exists(
    assert,
    $performanceInfo.find(
      '.suggestions .suggested-resources .btn-resource:eq(0) .title'
    ),
    'Missing resource title'
  );
  assert.equal(
    T.text(
      $performanceInfo.find(
        '.suggestions .suggested-resources .btn-resource:eq(0) .title'
      )
    ),
    'resource1',
    'Wrong title text'
  );

  T.exists(
    assert,
    $performanceInfo.find('a.collapse-expand'),
    'Missing collapse-expand link'
  );
});

test('Layout-Resources in Assessment', function(assert) {
  this.set('session', {
    userId: 'user-id'
  });

  let resourceA = Ember.Object.create({
    id: 'resource-1',
    sequence: 1,
    title: 'resource1',
    format: 'image_resource'
  });

  let resourceB = Ember.Object.create({
    id: 'resource-2',
    sequence: 2,
    title: 'resource1',
    format: 'video_resource'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: false,
      resources: Ember.A([resourceA, resourceB])
    })
  );

  this.set('classId', 'class-1');

  this.set('actualResource', resourceA);

  this.render(
    hbs`{{player/gru-study-header classId=classId collection=collection  actualResource=actualResource session=session resourceSequence=1}}`
  );

  var $component = this.$(); //component dom element
  const $header = $component.find('.gru-study-header');

  const $performanceInfo = $header.find('.performance-info');

  T.exists(
    assert,
    $performanceInfo.find('.resources'),
    'Missing resources section'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .count-resources .counter'),
    'Missing counter of resources'
  );
  assert.equal(
    T.text($performanceInfo.find('.resources .count-resources .counter')),
    '1/2',
    'Wrong counter of resources'
  );

  T.exists(
    assert,
    $performanceInfo.find('.resources .count-resources button'),
    'Missing button of resources'
  );
  assert.equal(
    T.text($performanceInfo.find('.resources .count-resources button')),
    'Questions',
    'Wrong button text'
  );
});

test('Layout - Pre Test', function(assert) {
  this.set('session', {
    userId: 'user-id'
  });

  let resourceA = Ember.Object.create({
    id: 'resource-1',
    sequence: 1,
    title: 'resource1',
    format: 'image_resource'
  });

  let resourceB = Ember.Object.create({
    id: 'resource-2',
    sequence: 2,
    title: 'resource1',
    format: 'video_resource'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: true,
      resources: Ember.A([resourceA, resourceB])
    })
  );

  this.set('breadcrumbs', ['unit 1', 'lesson 1', 'collection 1']);

  this.set('classId', 'class-1');

  this.set('courseTitle', 'Marine Biology');

  this.set('actualResource', resourceA);

  this.render(
    hbs`{{player/gru-study-header classId=classId collection=collection  actualResource=actualResource session=session courseTitle=courseTitle breadcrumbs=breadcrumbs isPreTest=true}}`
  );

  var $component = this.$(); //component dom element
  const $header = $component.find('.gru-study-header');
  T.exists(assert, $header, 'Missing header section');

  const $performanceInfo = $header.find('.performance-info');
  T.exists(assert, $performanceInfo, 'Missing performance-info');

  T.exists(
    assert,
    $performanceInfo.find('.resources'),
    'Missing resources section'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .lesson-info'),
    'Missing lesson info'
  );
  assert.equal(
    T.text($performanceInfo.find('.resources .lesson-info')),
    `${this.get('i18n').t('gru-study-header.lesson-legend').string} lesson 1`,
    'Wrong lesson title'
  );

  T.notExists(
    assert,
    $performanceInfo.find('.resources .count-resources'),
    'Counter of resources should not be visible'
  );
  T.notExists(
    assert,
    $performanceInfo.find('.resources .navigation'),
    'Resources navigation should not be visible'
  );
});

test('Layout-Collection Resources from Collection Report', function(assert) {
  this.set('session', {
    userId: 'user-id'
  });

  let resourceA = Ember.Object.create({
    id: 'resource-1',
    sequence: 1,
    title: 'resource1',
    format: 'image_resource'
  });

  let resourceB = Ember.Object.create({
    id: 'resource-2',
    sequence: 2,
    title: 'resource1',
    format: 'video_resource'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: true,
      resources: Ember.A([resourceA, resourceB])
    })
  );

  this.set('classId', 'class-1');

  this.set('actualResource', resourceA);

  this.render(
    hbs`{{player/gru-study-header classId=classId collection=collection actualResource=actualResource session=session resourceSequence=1 fromReport=true}}`
  );

  var $component = this.$(); //component dom element
  const $header = $component.find('.gru-study-header');

  const $performanceInfo = $header.find('.performance-info');

  T.exists(
    assert,
    $performanceInfo.find('.resources'),
    'Missing resources section'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .count-resources'),
    'Missing counter of resources'
  );
  assert.equal(
    T.text($performanceInfo.find('.resources .count-resources')),
    this.get('i18n').t('gru-study-header.resources-collection-report').string,
    'Wrong resources collection report text'
  );
});

test('Layout-Assessment Resources from Collection Report', function(assert) {
  this.set('session', {
    userId: 'user-id'
  });

  let resourceA = Ember.Object.create({
    id: 'resource-1',
    sequence: 1,
    title: 'resource1',
    format: 'image_resource'
  });

  let resourceB = Ember.Object.create({
    id: 'resource-2',
    sequence: 2,
    title: 'resource1',
    format: 'video_resource'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: false,
      resources: Ember.A([resourceA, resourceB])
    })
  );

  this.set('classId', 'class-1');

  this.set('actualResource', resourceA);

  this.render(
    hbs`{{player/gru-study-header classId=classId collection=collection actualResource=actualResource session=session resourceSequence=1 fromReport=true}}`
  );

  var $component = this.$(); //component dom element
  const $header = $component.find('.gru-study-header');

  const $performanceInfo = $header.find('.performance-info');

  T.exists(
    assert,
    $performanceInfo.find('.resources'),
    'Missing resources section'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .count-resources'),
    'Missing counter of resources'
  );
  assert.equal(
    T.text($performanceInfo.find('.resources .count-resources')),
    this.get('i18n').t('gru-study-header.resources-assessment-report').string,
    'Wrong resources collection report text'
  );
});

test('Collapse-expand performance information', function(assert) {
  let resourceA = Ember.Object.create({
    id: 'resource-1',
    sequence: 1,
    title: 'resource1',
    format: 'image_resource'
  });

  let resourceB = Ember.Object.create({
    id: 'resource-2',
    sequence: 2,
    title: 'resource1',
    format: 'video_resource'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: true,
      resources: Ember.A([resourceA, resourceB])
    })
  );

  this.on('parentAction', function() {
    assert.ok(true, 'external Action was called!');
  });

  this.render(
    hbs`{{player/gru-study-header onToggleHeader='parentAction' collection=collection actualResource=actualResource}}`
  );
  var $component = this.$(); //component dom element
  const $header = $component.find('.gru-study-header');
  const $courseInfo = $header.find('.course-info');
  const $performanceInfo = $header.find('.performance-info');
  const $performanceInfoButton = $performanceInfo.find('a.collapse-expand');

  assert.ok(
    $performanceInfo.hasClass('visible'),
    'Performance Info container has visible class by default'
  );
  assert.ok($performanceInfoButton, 'Missing expand-collapse button');
  $performanceInfoButton.click();
  return wait().then(function() {
    assert.ok(
      $performanceInfo.hasClass('hidden'),
      'Performance Info container should be hidden'
    );

    const $courseTitleLink = $courseInfo.find('.course-title');
    $courseTitleLink.click();
    return wait().then(function() {
      assert.ok(
        $performanceInfo.hasClass('visible'),
        'Performance Info container is expanded'
      );
    });
  });
});

test('Next when is the last question of an assessment', function(assert) {
  let resourceA = Ember.Object.create({
    id: 'question-1',
    sequence: 1,
    title: 'question 1',
    format: 'question'
  });

  let resourceB = Ember.Object.create({
    id: 'question-2',
    sequence: 2,
    title: 'question 2',
    format: 'question'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: false,
      resources: Ember.A([resourceA, resourceB])
    })
  );

  this.set('actualResource', resourceB);

  this.render(
    hbs`{{player/gru-study-header collection=collection actualResource=actualResource}}`
  );
  var $component = this.$(); //component dom element
  const $performanceInfo = $component.find('.performance-info');
  T.notExists(
    assert,
    $performanceInfo.find('.resources .navigation .next-resource .title'),
    'Next resource title should not appear'
  );
  T.notExists(
    assert,
    $performanceInfo.find(
      '.resources .navigation .next-resource .usage-report'
    ),
    'Usage report label should not appear'
  );
  T.exists(
    assert,
    $performanceInfo.find(
      '.resources .navigation .next-resource .summary-report'
    ),
    'Summary report label should appear'
  );
  assert.equal(
    T.text(
      $performanceInfo.find(
        '.resources .navigation .next-resource .summary-report'
      )
    ),
    'Check your summary report',
    'Wrong summary report message'
  );
});

test('Next when is the last resource of a collection', function(assert) {
  let resourceA = Ember.Object.create({
    id: 'resource-1',
    sequence: 1,
    title: 'resource 1',
    format: 'video_resource'
  });

  let resourceB = Ember.Object.create({
    id: 'resource-2',
    sequence: 2,
    title: 'resource 2',
    format: 'image_resource'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: true,
      resources: Ember.A([resourceA, resourceB])
    })
  );

  this.set('actualResource', resourceB);

  this.render(
    hbs`{{player/gru-study-header collection=collection actualResource=actualResource}}`
  );
  var $component = this.$(); //component dom element
  const $performanceInfo = $component.find('.performance-info');
  T.notExists(
    assert,
    $performanceInfo.find('.resources .navigation .next-resource .title'),
    'Next resource title should not appear'
  );
  T.exists(
    assert,
    $performanceInfo.find(
      '.resources .navigation .next-resource .usage-report'
    ),
    'Usage report label should appear'
  );
  T.notExists(
    assert,
    $performanceInfo.find(
      '.resources .navigation .next-resource .summary-report'
    ),
    'Summary report label should not appear'
  );
  assert.equal(
    T.text(
      $performanceInfo.find(
        '.resources .navigation .next-resource .usage-report'
      )
    ),
    'Check your usage report',
    'Wrong usage report message'
  );
});

test('Next for the summary report and the usage report', function(assert) {
  let resourceA = Ember.Object.create({
    id: 'resource-1',
    sequence: 1,
    title: 'resource 1',
    format: 'video_resource'
  });

  let resourceB = Ember.Object.create({
    id: 'resource-2',
    sequence: 2,
    title: 'resource 2',
    format: 'image_resource'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: true,
      resources: Ember.A([resourceA, resourceB])
    })
  );

  this.set('fromReport', true);

  this.render(
    hbs`{{player/gru-study-header collection=collection fromReport=fromReport}}`
  );
  var $component = this.$(); //component dom element
  const $performanceInfo = $component.find('.performance-info');
  T.notExists(
    assert,
    $performanceInfo.find('.resources .navigation .next-resource .title'),
    'Next resource title should not appear'
  );
  T.notExists(
    assert,
    $performanceInfo.find(
      '.resources .navigation .next-resource .usage-report'
    ),
    'Usage report label should not appear'
  );
  T.notExists(
    assert,
    $performanceInfo.find(
      '.resources .navigation .next-resource .summary-report'
    ),
    'Summary report label should not appear'
  );
});

test('Layout-Resource from resource player', function(assert) {
  this.set('session', {
    userId: 'user-id'
  });

  let resource = Ember.Object.create({
    id: 'resource-1',
    sequence: 1,
    title: 'resource1',
    type: 'image_resource'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: false,
      resources: Ember.A([resource])
    })
  );

  this.set('classId', 'class-1');

  this.set('courseId', 'course-1');

  this.set('resource', resource);

  this.render(
    hbs`{{player/gru-study-header classId=classId courseId=courseId collection=collection session=session resource=resource}}`
  );

  var $component = this.$(); //component dom element
  const $header = $component.find('.gru-study-header');

  const $performanceInfo = $header.find('.performance-info');

  T.exists(
    assert,
    $performanceInfo.find('.resources'),
    'Missing resources section'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .resource-title'),
    'Missing resource title'
  );
  T.exists(
    assert,
    $performanceInfo.find('.resources .resource-title .image_resource-icon'),
    'Missing resource icon'
  );
  assert.equal(
    T.text($performanceInfo.find('.resources .resource-title .title')),
    'resource1',
    'Wrong resource title text'
  );
});

test('Layout - External Assessment', function(assert) {
  this.set('session', {
    userId: 'user-id'
  });

  let resourceA = Ember.Object.create({
    id: 'resource-1',
    sequence: 1,
    title: 'resource1',
    format: 'image_resource'
  });

  let resourceB = Ember.Object.create({
    id: 'resource-2',
    sequence: 2,
    title: 'resource1',
    format: 'video_resource'
  });

  this.set(
    'collection',
    Collection.create({
      id: 'collection-id',
      isCollection: true,
      resources: Ember.A([resourceA, resourceB])
    })
  );

  this.set('breadcrumbs', ['unit 1', 'lesson 1', 'collection 1']);

  this.set('classId', 'class-1');

  this.set('courseTitle', 'Marine Biology');

  this.set('actualResource', resourceA);

  this.render(
    hbs`{{player/gru-study-header classId=classId collection=collection  actualResource=actualResource session=session courseTitle=courseTitle breadcrumbs=breadcrumbs isExternalAssessment=true}}`
  );

  var $component = this.$(); //component dom element
  const $header = $component.find('.gru-study-header');
  T.exists(assert, $header, 'Missing header section');

  const $performanceInfo = $header.find('.performance-info');
  T.exists(assert, $performanceInfo, 'Missing performance-info');

  T.notExists(
    assert,
    $performanceInfo.find('.resources'),
    'Missing resources section'
  );
  T.notExists(
    assert,
    $performanceInfo.find('.resources .lesson-info'),
    'Missing lesson info'
  );

  T.notExists(
    assert,
    $performanceInfo.find('.resources .count-resources'),
    'Counter of resources should not be visible'
  );
  T.notExists(
    assert,
    $performanceInfo.find('.resources .navigation'),
    'Resources navigation should not be visible'
  );
});

test('Study player | NU Course : Completion metrics', function(assert) {
  let classObj = Ember.Object.create({
    courseCompetencyCompletion: Ember.Object.create({
      completedCount: 2,
      totalCount: 5
    })
  });
  this.set('courseVersion', NU_COURSE_VERSION);
  this.set('class', classObj);
  this.render(hbs `{{player/gru-study-header  courseVersion=courseVersion class=class}}`);
  var $component = this.$(); //component dom element
  assert.equal(T.text($component.find('.performance-info .completion-chart .legend')).replace(/\s/g, ''), '2/5Completion', 'Wrong completion count!!');
});

test('Study player | Non NU Course : Completion metrics', function(assert) {
  let classObj = Ember.Object.create({
    performanceSummary: Ember.Object.create({
      totalCompleted: 4,
      total: 5
    })
  });
  this.set('class', classObj);
  this.render(hbs `{{player/gru-study-header  class=class}}`);
  var $component = this.$(); //component dom element
  assert.equal(T.text($component.find('.performance-info .completion-chart .legend')).replace(/\s/g, ''), '4/5Completion', 'Wrong completion count!!');
});
