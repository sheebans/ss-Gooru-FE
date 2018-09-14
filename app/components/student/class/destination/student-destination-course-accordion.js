import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['student-destination-course-accordion'],

  session: Ember.inject.service('session'),

  unitService: Ember.inject.service('api-sdk/unit'),

  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * Rescope Service to perform rescope data operations
   */
  rescopeService: Ember.inject.service('api-sdk/rescope'),

  didInsertElement() {
    let component = this;
    if (component.get('isRoute0')) {
      component.getSkippedContents();
    }
  },

  didRender() {
    let component = this;
    if (component.get('isRoute0')) {
      component.processSkippedContents();
    }
  },

  actions: {
    onSelectUnit(selectedUnit) {
      let component = this;
      let isUnitHasChildren = selectedUnit.get('children').length > 0;
      if (!isUnitHasChildren) {
        component.loadUnitData(selectedUnit);
      }
      component.toggleAccordion('u', selectedUnit.id);
    },

    onSelectLesson(selectedUnit, selectedLesson) {
      let component = this;
      let isLessonHasChildren = selectedLesson.get('children').length > 0;
      if (!isLessonHasChildren) {
        component.loadLessonData(selectedUnit, selectedLesson);
      }
      component.toggleAccordion('l', selectedLesson.id);
    }
  },

  units: Ember.computed('courseData', function() {
    let component = this;
    let courseData = component.get('courseData');
    let units = courseData.get('children');
    return units;
  }),

  skippedContents: null,

  rescopeObserver: Ember.observer('skippedContents', function() {
    let component = this;
    component.processSkippedContents();
  }),

  isRoute0: false,

  loadUnitData(unit) {
    let component = this;
    let unitId = unit.get('id');
    let unitService = component.get('unitService');
    let courseId = component.get('courseId');
    return Ember.RSVP.hash({
      unitData: Ember.RSVP.resolve(unitService.fetchById(courseId, unitId))
    })
      .then( ({unitData}) => {
        unit.set('children', unitData.get('children'));
      });
  },

  loadLessonData(unit, lesson) {
    let component = this;
    let lessonId = lesson.get('id');
    let courseId = component.get('courseId');
    let unitId = unit.get('id');
    let lessons = unit.get('children');
    let lessonService = component.get('lessonService');
    return Ember.RSVP.hash({
      lessonData: Ember.RSVP.resolve(lessonService.fetchById(courseId, unitId, lessonId))
    })
      .then( ({lessonData}) => {
        let lessonSeq = lesson.get('sequence');
        lesson.set('children', lessonData.get('children'));
        lessons[lessonSeq - 1] = lesson;
        unit.set('children', lessons);
      });
  },

  toggleAccordion(type, id) {
    let component = this;
    if (component.$(`#${type}-${id}`).hasClass('collapsed')) {
      component.$(`.${type}-container`).removeClass('expanded').addClass('collapsed');
      component.$(`#${type}-${id}`).addClass('expanded').removeClass('collapsed');
    } else {
      component.$(`#${type}-${id}`).toggleClass('expanded').addClass('collapsed');
    }
  },

  processSkippedContents() {
    let component = this;
    let skippedContents = component.get('skippedContents');
    let isSkippedContentAvailable = skippedContents
      ? component.isSkippedContentsEmpty(skippedContents)
      : false;
    if (isSkippedContentAvailable) {
      component.toggleSkippedContents(skippedContents);
    }
  },

  /**
   * @function getSkippedContents
   * Method to get skipped contents
   */
  getSkippedContents() {
    let component = this;
    let filters = {
      classId: component.get('classId'),
      courseId: component.get('courseId')
    };
    let skippedContentsPromise = Ember.RSVP.resolve(
      component.get('rescopeService').getSkippedContents(filters)
    );
    return Ember.RSVP.hash({
      skippedContents: skippedContentsPromise
    })
      .then(function(hash) {
        // component.set('skippedContents', hash.skippedContents);
        let content = {
          'units':['f83b395b-9d17-4da6-9542-cea235dadc70', '8020c16c-992b-4a88-b428-f737ee89db34'],
          'lessons':['ff529e45-0974-466b-b68c-ef36d9cc73ff'],
          'assessments':[],
          'collections':[],
          'assessmentsExternal':[],
          'collectionsExternal':[]
        };
        component.set('skippedContents', content);
        return hash.skippedContents;
      })
      .catch(function() {
        component.set('skippedContents', null);
      });
  },

  /**
   * @function isSkippedContentsEmpty
   * Method to toggle rescoped content visibility
   */
  isSkippedContentsEmpty(skippedContents) {
    let keys = Object.keys(skippedContents);
    let isContentAvailable = false;
    keys.some(key => {
      isContentAvailable = skippedContents[`${key}`].length > 0;
      return isContentAvailable;
    });
    return isContentAvailable;
  },

  /**
   * @function toggleSkippedContents
   * Method to toggle skippedContents
   */
  toggleSkippedContents(skippedContents) {
    let component = this;
    let contentTypes = Object.keys(skippedContents);
    let formattedContents = component.getFormattedContentsByType(
      skippedContents,
      contentTypes
    );
    component.toggleContentVisibility(formattedContents);
  },

  /**
   * @function toggleContentVisibility
   * Method to toggle content visibility
   */
  toggleContentVisibility(contentClassnames) {
    let component = this;
    let isChecked = component.get('isChecked');
    const $contentComponent = Ember.$(contentClassnames.join());
    if (isChecked) {
      $contentComponent.show().addClass('rescoped-content');
    } else {
      $contentComponent.hide();
    }
  },

  /**
   * @function getFormattedContentsByType
   * Method to get formatted content type
   */
  getFormattedContentsByType(contents, types) {
    let component = this;
    let formattedContents = Ember.A([]);
    types.map(type => {
      let flag = type.charAt(0);
      formattedContents = formattedContents.concat(
        component.parseSkippedContents(contents[`${type}`], flag)
      );
    });
    return formattedContents;
  },

  /**
   * @function parseSkippedContents
   * Method to parse fetched rescoped contents
   */
  parseSkippedContents(contentIds, flag) {
    let parsedContentIds = Ember.A([]);
    contentIds.map(id => {
      parsedContentIds.push(`#${flag}-${id}`);
    });
    return parsedContentIds;
  }
});
