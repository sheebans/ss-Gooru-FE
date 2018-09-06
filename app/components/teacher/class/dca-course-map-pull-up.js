import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['backdrop-pull-ups', 'teacher-class-dca-course-map-pull-up'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course-map
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * Maintains the state of data loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Maintains the context data
   * @type {Object}
   */
  context: null,

  /**
   * Class Id extract from context
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * Course Id which is mapped to this class.
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * This property have details of course object
   * @type {Object}
   */
  course: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user close the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    /**
     * Handle toggle functionality of hide/show unit items
     * @return {Object}
     */
    toggleUnitItems(selectedUnit) {
      let component = this;
      let unitId = selectedUnit.get('id');
      let element = `#dca-unit-${unitId}`;
      let courseId = component.get('courseId');
      if (selectedUnit.get('isActive')) {
        component.$(element).slideUp(400, function() {
          selectedUnit.set('isActive', false);
        });
      } else {
        component.$(element).slideDown(400, function() {
          selectedUnit.set('isActive', true);
        });
      }
      component
        .get('unitService')
        .fetchById(courseId, unitId)
        .then(unit => {
          if (!component.isDestroyed) {
            selectedUnit.set('children', unit.get('children'));
            selectedUnit.set('hasLessonFetched', true);
          }
        });
    },

    /**
     * Handle toggle functionality of hide/show lesson items
     * @return {Object}
     */
    toggleLessonItems(selectedUnit, selectedLesson) {
      let component = this;
      let classId = selectedUnit.get('classId');
      let unitId = selectedUnit.get('id');
      let lessonId = selectedLesson.get('id');
      let element = `#dca-lesson-${lessonId}`;
      let courseId = component.get('courseId');
      if (selectedLesson.get('isActive')) {
        component.$(element).slideUp(400, function() {
          selectedLesson.set('isActive', false);
        });
      } else {
        component.$(element).slideDown(400, function() {
          selectedLesson.set('isActive', true);
        });
      }
      component
        .get('courseMapService')
        .getLessonInfo(classId, courseId, unitId, lessonId, true)
        .then(lesson => {
          if (!component.isDestroyed) {
            selectedLesson.set('children', lesson.get('children'));
            selectedLesson.set('hasCollectionFetched', true);
          }
        });
    },

    /**
     * Action get triggered when add content to DCA got clicked
     */
    onAddContentToDCA(content) {
      let component = this;
      let classId = component.get('classId');
      let contentType = content.get('format');
      let contentId = content.get('id');
      component
        .get('classActivityService')
        .addActivityToClass(classId, contentId, contentType)
        .then(newContentId => {
          let date = moment().format('YYYY-MM-DD');
          let data = component.serializerSearchContent(
            content,
            newContentId,
            date
          );
          content.set('isAdded', true);
          component.sendAction('addedContentToDCA', data, date);
        });
    },

    /**
     * Action get triggered when schedule content to DCA got clicked
     */
    onScheduleContentToDCA(content) {
      let component = this;
      let contentType = content.get('format');
      let classId = component.get('classId');
      let params = {
        content: content,
        contentType: contentType,
        classId: classId
      };
      component.set('showScheduleDca', true);
      component.set('scheduleDcaContext', params);
    },

    /**
     * Action get triggered when schedule content  added to DCA
     */
    addedScheduleContentToDCA(content, newContentId, addedDate) {
      let component = this;
      let data = component.serializerSearchContent(
        content,
        newContentId,
        addedDate
      );
      component.sendAction('addedContentToDCA', data, addedDate);
    },

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playContent
     * @param {string} unitId - Identifier for a unit
     * @param {string} lessonId - Identifier for lesson
     * @param {string} collection - collection or assessment
     */
    playContent: function(unitId, lessonId, collection) {
      let component = this;
      let classId = component.get('classId');
      let courseId = component.get('courseId');
      let collectionId = collection.get('id');
      let collectionType = collection.get('collectionType');
      let url = `${
        window.location.origin
      }/player/class/${classId}/course/${courseId}/unit/${unitId}/lesson/${lessonId}/collection/${collectionId}?role=teacher&type=${collectionType}`;
      if (collection.get('isExternalAssessment')) {
        url = collection.get('url');
      }
      window.open(url);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.loadData();
    this.openPullUp();
  },

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
  },

  loadData() {
    let component = this;
    let courseId = component.get('courseId');
    component.set('isLoading', true);
    component
      .get('courseService')
      .fetchById(courseId)
      .then(course => {
        if (!component.isDestroyed) {
          component.set('course', course);
          component.set('isLoading', false);
        }
      });
  },

  serializerSearchContent(content, contentId, date) {
    return Ember.Object.create({
      id: contentId,
      added_date: date,
      collection: content,
      isActive: false
    });
  }
});
