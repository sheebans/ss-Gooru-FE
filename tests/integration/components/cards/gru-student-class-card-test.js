import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import ClassModel from 'gooru-web/models/content/resource';
import Course from 'gooru-web/models/content/course';
import Ember from 'ember';

const courseServiceStub = Ember.Service.extend({
  fetchByIdWithOutProfile(courseId) {
    if (courseId) {
      let course = Course.create(Ember.getOwner(this).ownerInjection(), {
        id: 'course-123',
        title: 'Sample Course Name'
      });
      return Ember.RSVP.resolve(course);
    } else {
      return Ember.RSVP.reject('Fetch failed');
    }
  }
});

moduleForComponent(
  'cards/gru-student-class-card',
  'Integration | Component | cards/gru student class card',
  {
    integration: true,
    beforeEach: function() {
      this.container.lookup('service:i18n').set('locale', 'en');
      this.inject.service('i18n');
      this.register('service:api-sdk/course', courseServiceStub);
      this.inject.service('api-sdk/course', { as: 'courseService' });
    }
  }
);

var mockClass = ClassModel.create({
  id: 'class-id',
  creatorId: 'creator-id',
  title: 'My class - 1',
  description: 'This class is intended to make awareness of good habits',
  greeting: 'Hi! Welcome to my class',
  grade: [4, 5],
  classSharing: 'open',
  coverImage: 'cover.png',
  code: 'VZFMEWH',
  minScore: 75,
  endDate: '2016-12-31',
  courseId: 'course-123',
  collaborator: ['collaborator-1', 'collaborator-2'],
  creatorSystem: null,
  contentVisibility: null,
  isArchived: false,
  isTeacher: function() {
    return true;
  },
  performanceSummary: Ember.Object.create({
    classId: 'class-id',
    id: 'class-id',
    score: 90,
    timeSpent: 344680,
    total: 60,
    totalCompleted: 30
  })
});

test('Class Card Layout', function(assert) {
  this.set('class', mockClass);

  this.render(hbs`{{cards/gru-student-class-card class=class}}`);

  var $component = this.$(); //component dom element

  const $classCard = $component.find('.gru-student-class-card');
  const $panel = $classCard.find('.panel');
  const $panelHeading = $panel.find('.panel-heading');
  const $panelBody = $panel.find('.panel-body');

  T.exists(assert, $classCard, 'Missing student class card section');
  T.exists(assert, $panel, 'Missing class card panel');
  T.exists(assert, $panelHeading, 'Missing class card panel heading');
  T.exists(assert, $panelBody, 'Missing class card panel body');
  T.exists(assert, $panelHeading.find('.title'), 'Missing class card title');
  assert.equal(
    T.text($panelHeading.find('> .title')),
    'My class - 1',
    'Wrong class title text'
  );

  T.exists(assert, $panelHeading.find('.code'), 'Missing class card code');
  assert.equal(
    T.text($panelHeading.find('.code .class-code')),
    'VZFMEWH',
    'Wrong class code text'
  );

  T.exists(
    assert,
    $panelBody.find('.information'),
    'Missing class information'
  );

  const $links = $panelBody.find('.links');

  T.exists(assert, $links, 'Missing card links');

  assert.equal($links.find('li a').length, 3, 'Number of card links');
  T.exists(
    assert,
    $links.find('.class-activities'),
    'Missing class activities link'
  );
  T.exists(assert, $links.find('.course-map'), 'Missing content map link');
  T.exists(assert, $links.find('.performance'), 'Missing performance link');

  T.exists(
    assert,
    $panelBody.find('.performance'),
    'Missing class performance'
  );

  assert.equal(
    T.text($panelBody.find('.performance .percentage')),
    '90%',
    'Wrong performance score of the chart'
  );

  T.exists(
    assert,
    $panelBody.find('.completion-chart .gru-x-bar-chart'),
    'Missing completion-chart gru-x-bar-chart component'
  );
  assert.equal(
    T.text($panelBody.find('.completion-chart label')),
    '50% Completed',
    'Wrong completed score of the chart'
  );
});
