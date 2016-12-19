import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import Course from 'gooru-web/models/content/course';

moduleForComponent('content/courses/gru-course-play-header', 'Integration | Component | content/courses/gru course play header', {
  integration: true
});

test('Layout', function (assert) {

  var course = Course.create(Ember.getOwner(this).ownerInjection(), {
    title: 'Course Title'
  });

  this.set('course', course);

  this.render(hbs`{{content/courses/gru-course-play-header course=course}}`);

  var $container = this.$(".gru-course-play-header");

  assert.ok($container.find('h1').text(), 'Course Title', "Title");

  const $actions = $container.find('> .actions');
  assert.ok($actions.length, "Header actions");
  assert.equal($actions.find(' > button').length, 1, "Number of header actions");
  assert.ok($actions.find('> button.performance').length, "Performance");

});
