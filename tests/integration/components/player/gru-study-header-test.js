import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';
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

  let unitBreadCrumb = Ember.Object.create({
    shortTitle: 'U1',
    actualTitle: 'unit 1'
  });
  let lessonBreadCrumb = Ember.Object.create({
    shortTitle: 'L1',
    actualTitle: 'lesson 1'
  });
  let collectionBreadCrumb = Ember.Object.create({
    shortTitle: 'C1',
    actualTitle: 'collection 1'
  });
  this.set('breadcrumbs', [
    unitBreadCrumb,
    lessonBreadCrumb,
    collectionBreadCrumb
  ]);

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
  T.exists(assert, $courseInfo.find('.title'), 'Missing course title');
  assert.equal(
    T.text($courseInfo.find('.title')),
    'Marine Biology',
    'Wrong course title text'
  );
  T.exists(assert, $courseInfo.find('.breadcrumbs'), 'Missing breadcrumbs');
  assert.equal($courseInfo.find('span').length, 3, 'Wrong breadcrumb-titles');
  assert.equal(
    T.text($courseInfo.find('span:eq(0)')),
    'U1',
    'Wrong first breadcrumb title'
  );
  assert.equal(
    T.text($courseInfo.find('span:eq(1)')),
    'L1',
    'Wrong second breadcrumb title'
  );
  assert.equal(
    T.text($courseInfo.find('span:eq(2)')),
    'C1',
    'Wrong third breadcrumb title'
  );

  const $performanceInfo = $header.find('.performance-info');
  T.exists(assert, $performanceInfo, 'Missing performance-info');

  T.exists(
    assert,
    $header.find('.suggest-resources'),
    'Missing resources section'
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

  const $performanceInfo = $header.find('.suggest-player');

  T.exists(
    assert,
    $performanceInfo.find('.suggest-resources'),
    'Missing suggest resources section'
  );
  T.exists(
    assert,
    $performanceInfo.find('.suggest-resources .title'),
    'Missing resource title'
  );
  T.exists(
    assert,
    $performanceInfo.find('.suggest-resources i'),
    'Missing resource icon'
  );
  assert.equal(
    T.text($performanceInfo.find('.suggest-resources  .title')),
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
  this.render(
    hbs`{{player/gru-study-header  courseVersion=courseVersion class=class}}`
  );
  var $component = this.$(); //component dom element
  assert.equal(
    T.text($component.find('.performance-info .performance div')).replace(
      /\s/g,
      ''
    ),
    'Completion2/5',
    'Wrong completion count!!'
  );
});

test('Study player | Non NU Course : Completion metrics', function(assert) {
  let classObj = Ember.Object.create({
    performanceSummary: Ember.Object.create({
      totalCompleted: 4,
      total: 5
    })
  });
  this.set('class', classObj);
  this.render(hbs`{{player/gru-study-header  class=class}}`);
  var $component = this.$(); //component dom element
  assert.equal(
    T.text($component.find('.performance-info .performance div')).replace(
      /\s/g,
      ''
    ),
    'Completion4/5',
    'Wrong completion count!!'
  );
});
