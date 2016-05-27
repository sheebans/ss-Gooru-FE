import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import PlayerAccordionLesson from 'gooru-web/components/content/courses/play/gru-accordion-lesson';
import {CONTENT_TYPES} from 'gooru-web/config/config';

import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

/**
 * Content Builder: Accordion Lesson
 *
 * Component responsible for behaving as an accordion and listing a set of collections/assessments.
 * It is meant to be used inside of an {@link ./gru-accordion-unit|Accordion Unit}
 *
 * @module
 * @augments content/courses/play/gru-accordion-lesson
 * @mixes mixins/modal
 */
export default PlayerAccordionLesson.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/lesson
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),

  /**
   * @requires service:api-sdk/taxonomy
   */
  taxonomyService: Ember.inject.service("api-sdk/taxonomy"),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    cancelEdit: function () {
      if (this.get('model.isNew')) {
        this.get('onCancelAddLesson')(this.get('model'));
      } else {
        this.set('model.isEditing', false);
      }
    },

    edit: function () {
      var lessonForEditing = this.get('lesson').copy();
      this.set('tempLesson', lessonForEditing);
      this.set('model.isEditing', true);
    },

    openStandardPicker: function () {
      var component = this;
      var tree = this.get('taxonomyService').getCourses();

      var model = {
        selected: component.get('selectedStandards').map(function(standardTag) {
          return standardTag.get('taxonomyItem');
        }),
        shortcuts: component.get('selectedDomains').map(function(domainTag) {
          return domainTag.get('taxonomyItem');
        }),
        taxonomyItems: tree,
        callback: {
          success: function(selectedTags) {
            var selectedStandards = component.get('selectedStandards');
            var selected = selectedTags.map(function(domainTag) {
              return TaxonomyTag.create({
                isReadonly: true,
                taxonomyItem: domainTag.get('taxonomyItem')
              });
            });

            Ember.beginPropertyChanges();
            selectedStandards.clear();
            selectedStandards.pushObjects(selected);
            Ember.endPropertyChanges();
          }
        }
      };

      this.actions.showModal.call(this, 'taxonomy.modals.gru-standard-picker', model, null, 'gru-standard-picker');
    },

    saveLesson: function () {
      var courseId = this.get('course.id');
      var unitId = this.get('unitId');
      var editedLesson = this.get('tempLesson');
      var lessonService = this.get('lessonService');

      editedLesson.validate().then(function ({ validations }) {
        if (validations.get('isValid')) {
          // Saving an existing lesson or a new lesson (falsey id)?
          let savePromise = editedLesson.get('id') ?
                              lessonService.updateLesson(courseId, unitId, editedLesson) :
                                lessonService.createLesson(courseId, unitId, editedLesson);

          savePromise
            .then(function () {
              this.get('lesson').merge(editedLesson, ['id', 'title']);
              this.set('newCollectionModel.lessonId', this.get("lesson.id"));
              this.set('model.isEditing', false);
            }.bind(this))

            .catch(function (error) {
              var message = this.get('i18n').t('common.errors.lesson-not-created').string;
              this.get('notifications').error(message);
              Ember.Logger.error(error);
            }.bind(this));

        }
        this.set('didValidate', true);
      }.bind(this));
    },
    /**
     * Remove lesson item
     */
    removeLessonItem: function (builderItem) {
      this.get('items').removeObject(builderItem);
    },
    remixLessonItem: function (builderItem) {
      this.get('items').addObject(builderItem);
    },
    /**
     * Delete selected lesson
     *
     */
    deleteItem: function (builderItem) {
      let component = this;
      var model = {
        content: this.get('lesson'),
        index:this.get('index'),
        parentName:this.get('course.title'),
        deleteMethod: function () {
          return this.get('lessonService').deleteLesson(this.get('course.id'),this.get('unitId'),this.get('lesson.id'));
        }.bind(this),
        type: CONTENT_TYPES.LESSON,
        callback:{
          success:function(){
            component.get('onDeleteLesson')(builderItem);
          },
        }
      };
      this.actions.showModal.call(this,
        'content.modals.gru-delete-content',
        model, null, null, null, false);
    },

    copy: function() {
      var model = {
        content: this.get('lesson'),
        courseId: this.get('course.id'),
        unitId: this.get('unitId'),
        onRemixSuccess: this.get('onRemixLesson')
      };
      this.send('showModal', 'content.modals.gru-lesson-remix', model);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super(...arguments);

    let courseId = this.get('course.id');
    let unitId = this.get('unitId');
    let lessonId = this.get('lesson.id');
    this.set('newCollectionModel', {
      courseId,
      unitId,
      lessonId,
      associateLesson: true
    });

    if (!this.get('lesson.id')) {
      // If this a new unit, set the tempUnit value so things don't break in edit mode
      let lessonForEditing = this.get('lesson').copy();
      this.set('tempLesson', lessonForEditing);
    }

    // TODO: Init selected standards per lesson's taxonomy values
    var courses = this.get('taxonomyService').getCourses();

    var standardTag1 = TaxonomyTag.create({
      isReadonly: true,
      taxonomyItem: courses[0].find(['100', '202', '320'])
    });

    var standardTag2 = TaxonomyTag.create({
      isReadonly: true,
      taxonomyItem: courses[0].find(['100', '202', '323'])
    });

    var standardTag3 = TaxonomyTag.create({
      isReadonly: true,
      taxonomyItem: courses[0].find(['100', '203', '335'])
    });

    var standardTag4 = TaxonomyTag.create({
      isReadonly: true,
      taxonomyItem: courses[1].find(['101', '210', '300'])
    });

    var standardTag5 = TaxonomyTag.create({
      isReadonly: true,
      taxonomyItem: courses[1].find(['101', '210', '301'])
    });

    var standardTag6 = TaxonomyTag.create({
      isReadonly: true,
      taxonomyItem: courses[1].find(['101', '212', '320'])
    });

    this.set('selectedStandards', [standardTag1, standardTag2, standardTag3, standardTag4, standardTag5, standardTag6]);

  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {Object} newCollectionModel - model for the new collection/assessment modals
   */
  newCollectionModel: null,

  /**
   * @property {TaxonomyTag[]} selectedDomains - List of domain tags assigned to this lesson's unit
   */
  selectedDomains: null,

  /**
   * @prop {Content/Lesson} tempLesson - Temporary lesson model used for editing
   */
  tempLesson: null

});
