import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('student/gru-performance-filter-panel', 'Integration | Component | student/gru performance filter panel', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set('locale','en');
  }
});

test('Layout', function(assert) {

  const courseMock = Ember.Object.create({
    id: '0101',
    title: 'Course 1',
    children: [
      Ember.Object.create({
        id: '0102',
        title: 'Unit 1',
        children: [
          Ember.Object.create({
            id: '0103',
            title: 'Lesson 1'
          })
        ]
      })
    ]
  });

  const coursesMock = [
    Ember.Object.create({
      id: '0101',
      title: 'Course 1'
    }),
    Ember.Object.create({
      id: '0201',
      title: 'Course 2'
    }),
    Ember.Object.create({
      id: '0301',
      title: 'Course 3'
    })
  ];

  const filterCriteria = Ember.Object.create({
    collectionType:'assessment',
    courseId:'0101',
    lessonId:'0103',
    unitId:'0102'
  });

  this.set('selectedCourse', courseMock);
  this.set('courses', coursesMock);
  this.set('filterCriteria', filterCriteria);

  this.render(hbs`{{student.gru-performance-filter-panel courses=courses selectedCourse=selectedCourse filterCriteria=filterCriteria}}`);

  var $performanceFilterPanel = this.$(); //component dom element

  const $performanceFilterPanelHeader = $performanceFilterPanel.find('.header');
  T.exists(assert, $performanceFilterPanelHeader, 'Missing filter header');
  T.exists(assert, $performanceFilterPanelHeader.find('.title'), 'Missing filter header title');
  assert.equal(T.text($performanceFilterPanel.find('.title')), 'Filter', "Wrong header title text");

  const $performanceFilterPanelBody = $performanceFilterPanel.find('.body');
  T.exists(assert, $performanceFilterPanelBody, 'Missing filter body');

  T.exists(assert, $performanceFilterPanelBody.find('.filter-buttons'), 'Missing filter buttons');
  T.exists(assert, $performanceFilterPanelBody.find('.filter-buttons .course'), 'Missing course button');

  const $filterType = $performanceFilterPanelBody.find('.filter-type');
  assert.equal($filterType.length, 3, "Incorrect number of filter Types");

  const $contenPanel = $performanceFilterPanelBody.find('.content-panel');
  assert.equal($contenPanel.length, 3, "Incorrect number of content Panels");

  const $courseContentPanel = $performanceFilterPanelBody.find('.content-panel.course');
  assert.ok($courseContentPanel.hasClass("visible"), "Course content panel is visible by default");

  T.exists(assert, $performanceFilterPanelBody.find('.actions'), 'Missing action buttons');
  T.exists(assert, $performanceFilterPanelBody.find('.update-report'), 'Missing update report button');
});

test('Expand/Collapse filter content panel', function(assert) {

  const courseMock = Ember.Object.create({
    id: '0101',
    title: 'Course 1',
    children: [
      Ember.Object.create({
        id: '0102',
        title: 'Unit 1',
        children: [
          Ember.Object.create({
            id: '0103',
            title: 'Lesson 1'
          })
        ]
      })
    ]
  });

  const coursesMock = [
    Ember.Object.create({
      id: '0101',
      title: 'Course 1'
    }),
    Ember.Object.create({
      id: '0201',
      title: 'Course 2'
    }),
    Ember.Object.create({
      id: '0301',
      title: 'Course 3'
    })
  ];

  const filterCriteria = Ember.Object.create({
    collectionType:'assessment',
    courseId:'0101',
    lessonId:null,
    unitId:null
  });

  this.set('selectedCourse', courseMock);
  this.set('courses', coursesMock);
  this.set('filterCriteria', filterCriteria);

  this.render(hbs`{{student.gru-performance-filter-panel courses=courses selectedCourse=selectedCourse filterCriteria=filterCriteria}}`);

  var $performanceFilterPanel = this.$(); //component dom element

  const $courseFilterTypeArrow = $performanceFilterPanel.find('.filter-type.course .arrow');

  const $courseContentPanel = $performanceFilterPanel.find('.content-panel.course');
  assert.ok($courseContentPanel.hasClass("visible"), "Course content panel is visible by default");

  $courseFilterTypeArrow.click();
  return wait().then(function () {
    assert.ok($courseContentPanel.hasClass("hidden"), "Course content panel is hidden");
    $courseFilterTypeArrow.click();
    return wait().then(function () {
      assert.ok($courseContentPanel.hasClass("visible"), "Course content panel is visible");
    });
  });
});
