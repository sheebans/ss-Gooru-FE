import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import LessonItem from 'gooru-web/models/content/lessonItem';
import Ember from 'ember';

moduleForComponent('content/courses/gru-accordion-lesson-item', 'Integration | Component | content/courses/gru accordion lesson item', {
  integration: true,

  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('it renders a lesson item correctly -collection', function (assert) {

  const lessonItem = LessonItem.create(Ember.getOwner(this).ownerInjection(), {
    id: '123',
    image: null,
    format: 'collection',
    questionCount: 0,
    resourceCount: 0,
    title: 'Sample Lesson Item Name'
  });

  this.set('lessonItem', lessonItem);
  this.set('index', 3);
  this.render(hbs`
    {{content/courses/gru-accordion-lesson-item
      model=lessonItem
      index=index}}
    `);

  const $component = this.$('.content.courses.gru-accordion-lesson-item.view');
  assert.ok($component.length, 'Component');

  const $heading = $component.find('.view .panel-heading');
  assert.ok($heading.find('h3').text(), this.get('index'), 'Header prefix');

  const $titleContainer = $heading.find('> a.title');
  assert.ok($titleContainer.length, 'Title link');

  // Without image
  assert.ok($titleContainer.find('> span.image-placeholder').length, 'Image placeholder');

  // With image
  Ember.run(() => {
    lessonItem.set('image', 'path/to/image');
  });

  assert.ok($titleContainer.find('> img').length, 'Thumbnail element');
  assert.equal($titleContainer.find('> img').prop('src'), window.location.origin + '/' + lessonItem.get('image'), 'Thumbnail image');
  assert.equal($titleContainer.find('> div > strong').text(), lessonItem.get('title'), 'Title text');
  assert.equal($titleContainer.find('> div > span').text(), lessonItem.get('format'), 'Type');

  const $detailContainer = $heading.find('> .detail');
  assert.equal($detailContainer.find('> div:first-child > span').length, 1, 'Detail text sections');
  assert.equal($detailContainer.find('> div:first-child > span').text(), '0 ' + this.get('i18n').t('common.resource-pl', { count: 0}).string, 'Detail text');

  // Several questions
  Ember.run(() => {
    lessonItem.set('questionCount', 5);
  });

  assert.equal($detailContainer.find('> div:first-child > span').length, 2, 'Detail text sections');
  assert.equal($detailContainer.find('> div:first-child > span').text(),
    '0 ' + this.get('i18n').t('common.resource-pl', { count: 0}).string +
    '5 ' + this.get('i18n').t('common.question-pl', { count: 5}).string, 'Detail text');

  assert.equal($heading.find('.actions button').length, 4, 'Header action buttons');
  assert.ok($heading.find('.actions button:eq(0)').hasClass('edit-item'), 'First button is for editing');
  assert.ok($heading.find('.actions button:eq(1)').hasClass('copy-item'), 'Second button is for copying');
  assert.ok($heading.find('.actions button:eq(2)').hasClass('move-item'), 'Third button is for moving');
  assert.ok($heading.find('.actions button:eq(3)').hasClass('delete-item'), 'Fourth button is for deleting');
});

test('it renders an assessment detail correctly', function (assert) {

  const lessonItem = LessonItem.create(Ember.getOwner(this).ownerInjection(), {
    id: '123',
    format: 'assessment',
    questionCount: 0,
    resourceCount: 0
  });

  this.set('lessonItem', lessonItem);
  this.set('index', 3);
  this.render(hbs`
    {{content/courses/gru-accordion-lesson-item
      model=lessonItem
      index=index}}
    `);

  const $component = this.$('.content.courses.gru-accordion-lesson-item.view');
  assert.ok($component.length, 'Component');

  const $detailContainer = $component.find('.view .panel-heading > .detail');
  assert.equal($detailContainer.find('> div:first-child > span').length, 1, 'Detail text sections');
  assert.equal($detailContainer.find('> div:first-child > span').text(), '0 ' + this.get('i18n').t('common.question-pl', { count: 0}).string, 'Detail text');

  // Several resources
  Ember.run(() => {
    lessonItem.set('resourceCount', 5);
  });

  assert.equal($detailContainer.find('> div:first-child > span').length, 1, 'Detail text sections -resources not listed');
  assert.equal($detailContainer.find('> div:first-child > span').text(), '0 ' + this.get('i18n').t('common.question-pl', { count: 0}).string, 'Detail text -resources not listed');
});

