import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import Course from 'gooru-web/models/content/course';

moduleForComponent('content/courses/gru-course-play', 'Integration | Component | content/courses/gru course play', {
  integration: true
});

test('it has correct header when user is course owner', function (assert) {

  var course = Course.create(Ember.getOwner(this).ownerInjection(), {
    title: 'Course Title'
  });

  this.set('course', course);
  this.set('isOwner', true);
  this.render(hbs`{{content/courses/gru-course-play course=course isOwner=isOwner}}`);

  var $container = this.$("article.content.courses.gru-course-play");
  assert.ok($container.length, "Component");

  const $header = $container.find('> header');
  assert.ok($header.length, "Header");
  assert.ok($header.find('h1').text(), 'Course Title', "Title");

  const $actions = $header.find('> .actions');
  assert.ok($actions.length, "Header actions");
  assert.equal($actions.find(' > button').length, 4, "Number of header actions");
  assert.ok($actions.find('> button.share').length, "Share button");
  assert.ok($actions.find('> button.remix').length, "Remix button");
  assert.ok($actions.find('> button.edit').length, "Edit button");
  assert.ok($actions.find('> button.play').length, "Play button");

  assert.ok($header.find('> nav').length, "Header navigation");
  assert.ok($header.find('> nav').hasClass('hidden-md'), 'Navigation not visible for medium resolutions');
  assert.ok($header.find('> nav').hasClass('hidden-lg'), 'Navigation not visible for large resolutions');
  assert.equal($header.find('> nav > a').length, 2, "Number of header navigation links");

  assert.equal($container.find('> section').length, 2, "Number of sections");
  assert.ok($container.find('> section#information').length, "Information section");
  assert.ok($container.find('> section#content').length, "Content section");
});

test('it has correct header buttons when user is not course owner', function (assert) {

  var course = Course.create(Ember.getOwner(this).ownerInjection(), {
    title: 'Course Title'
  });

  this.set('course', course);
  this.render(hbs`{{content/courses/gru-course-play course=course}}`);

  var $container = this.$("article.content.courses.gru-course-play");

  const $actions = $container.find('> header > .actions');
  assert.ok($actions.length, "Header actions");
  assert.equal($actions.find(' > button').length, 3, "Number of header actions");
  assert.ok($actions.find('> button.share').length, "Share button");
  assert.ok($actions.find('> button.remix').length, "Remix button");
  assert.ok($actions.find('> button.play').length, "Play button");
});
