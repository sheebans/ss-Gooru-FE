import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';
import Assessment from 'gooru-web/models/content/assessment';
import Collection from 'gooru-web/models/content/collection';
import ClassActivity from 'gooru-web/models/content/class-activity';
import ActivityPerformanceSummary from 'gooru-web/models/performance/activity-performance-summary';

import tHelper from 'ember-i18n/helper';

moduleForComponent(
  'class/gru-class-activity-panel',
  'Integration | Component | class/gru class activity panel',
  {
    integration: true,
    beforeEach: function() {
      this.i18n = this.container.lookup('service:i18n');
      this.i18n.set('locale', 'en');
      this.registry.register('helper:t', tHelper);
    }
  }
);

test('Layout', function(assert) {
  const collectionMock = Assessment.create(
    Ember.getOwner(this).ownerInjection(),
    {
      id: '3-1',
      format: 'assessment',
      openEndedQuestionCount: 0,
      questionCount: 4,
      resourceCount: 0,
      title: 'The Early Earth',
      members: [],
      visible: true,
      isOnAir: true
    }
  );

  const performance = Ember.Object.create({
    score: 100,
    timeSpent: 5400000,
    isCompleted: true
  });

  const classActivity = ClassActivity.create({
    activationDate: null, //inactive
    collection: collectionMock,
    activityPerformanceSummary: ActivityPerformanceSummary.create({
      collectionPerformanceSummary: performance
    }),
    isActive: true
  });

  this.set('classActivity', classActivity);

  this.render(
    hbs`{{class.gru-class-activity-panel classActivity=classActivity index=0 }}`
  );

  var $component = this.$(); //component dom element
  const $collectionPanel = $component.find('.gru-class-activity-panel.panel');
  T.exists(assert, $collectionPanel, 'Missing class collection panel');

  const $collectionIcon = $collectionPanel.find('.icon-container img');
  assert.ok($collectionIcon.length, 'Collection icon is missing');

  const $collectionTitle = $collectionPanel.find('.title-container');
  assert.ok($collectionTitle.length, 'Title container is missing');

  const $collectionTitleText = $collectionTitle.find('a.title div');
  assert.ok($collectionTitleText.length, 'Title text element is missing');
  assert.equal(
    T.text($collectionTitleText),
    'The Early Earth',
    'Wrong title text'
  );

  const $collectionInfo = $collectionPanel.find('.info');
  assert.ok($collectionInfo.length, 'Collection Info container is missing');

  const $collectionContentCount = $collectionInfo.find('.content-count');
  assert.ok($collectionContentCount.length, 'Content count panel is missing');
  assert.equal(
    T.text($collectionContentCount.find('.question-count')),
    '4',
    'Wrong question count text'
  );

  const $actions = $collectionInfo.find('.actions-container');
  T.exists(assert, $actions, 'Missing actions container');
  T.exists(assert, $actions.find('.item-visible'), 'Missing visibility icon');
  T.exists(assert, $actions.find('.on-air'), 'Missing go live button');
  assert.ok(
    $actions.find('button.remove-item').length,
    'remove-item button is missing'
  );

  const $performance = $collectionInfo.find('.performance');
  T.exists(assert, $performance, 'Missing performance container');
});

test('Layout - collection', function(assert) {
  const collectionMock = Collection.create(
    Ember.getOwner(this).ownerInjection(),
    {
      id: '3-1',
      format: 'collection',
      openEndedQuestionCount: 0,
      questionCount: 2,
      resourceCount: 4,
      title: 'The Early Earth',
      members: [],
      visible: true,
      isOnAir: true,
      performance: Ember.Object.create({
        score: 100,
        completionDone: 44,
        completionTotal: 50,
        timeSpent: 5400000,
        isCompleted: true
      })
    }
  );

  const performance = Ember.Object.create({
    score: 100,
    completionDone: 44,
    completionTotal: 50,
    timeSpent: 5400000,
    isCompleted: true
  });

  const classActivity = ClassActivity.create({
    activationDate: null, //inactive
    collection: collectionMock,
    activityPerformanceSummary: ActivityPerformanceSummary.create({
      collectionPerformanceSummary: performance
    }),
    isActive: false
  });

  this.set('classActivity', classActivity);

  this.render(
    hbs`{{class.gru-class-activity-panel classActivity=classActivity index=0}}`
  );

  var $component = this.$(); //component dom element
  const $collectionPanel = $component.find('.gru-class-activity-panel.panel');

  const $collectionInfo = $collectionPanel.find('.info');
  assert.ok($collectionInfo.length, 'Collection Info element is missing');

  const $actions = $collectionInfo.find('.actions-container');
  T.notExists(
    assert,
    $actions.find('.on-air'),
    'on-air button should not be visible'
  );
  T.exists(
    assert,
    $actions.find('.item-not-visible'),
    'Missing visibility icon'
  );

  const $collectionContentCount = $collectionInfo.find('.content-count');
  assert.ok($collectionContentCount.length, 'Content count panel is missing');

  assert.equal(
    T.text($collectionContentCount.find('.resource-count')),
    '4',
    'Wrong  resource count text'
  );
  assert.equal(
    T.text($collectionContentCount.find('.question-count')),
    '2',
    'Wrong  question count text'
  );
});
