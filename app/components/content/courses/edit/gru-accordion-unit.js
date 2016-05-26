import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';
import Lesson from 'gooru-web/models/content/lesson';
import PlayerAccordionUnit from 'gooru-web/components/content/courses/play/gru-accordion-unit';
import ModalMixin from 'gooru-web/mixins/modal';
import {CONTENT_TYPES} from 'gooru-web/config/config';

import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';


/**
 * Content Builder: Accordion Unit
 *
 * Component responsible for behaving as an accordion and listing a set of lessons.
 * It is meant to be used inside of an {@link ./gru-accordion-course|Accordion Course}
 *
 * @module
 * @augments components/content/courses/play/gru-accordion-unit
 *
 */
export default PlayerAccordionUnit.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/unit
   */
  unitService: Ember.inject.service("api-sdk/unit"),

  /**
   * @requires service:api-sdk/taxonomy
   */
  taxonomyService: Ember.inject.service("api-sdk/taxonomy"),


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    add: function () {
      this.loadData().then(function() {
        this.actions.addLesson.call(this);
        this.get('onExpandUnit')();
        this.set('model.isExpanded', true);
      }.bind(this));
    },

    addLesson: function () {
      var lesson = Lesson.create(Ember.getOwner(this).ownerInjection(), {
        title: null
      });
      var builderItem = BuilderItem.create({
        isEditing: true,
        data: lesson
      });
      this.get('items').pushObject(builderItem);
    },

    cancelAddLesson: function (builderItem) {
      this.get('items').removeObject(builderItem);
      builderItem.destroy();
    },

    /**
     * Load the data for this unit (data should only be loaded once)
     *
     * @function actions:selectUnit
     */
    cancelEdit: function () {
      if (this.get('model.isNew')) {
        this.get('onCancelAddUnit')(this.get('model'));
      } else {
        this.set('model.isEditing', false);
      }
    },

    copy: function() {
      var model = {
        content: this.get('unit'),
        courseId: this.get('course.id'),
        onRemixSuccess: this.get('onRemixUnit')
      };
      this.send('showModal', 'content.modals.gru-unit-remix', model);
    },

    /**
     * Delete selected unit
     *
     */
    deleteItem: function (builderItem) {
      let component = this;
      var model = {
        content: this.get('unit'),
        index:this.get('index'),
        parentName:this.get('course.title'),
        deleteMethod: function () {
          return this.get('unitService').deleteUnit(this.get('course.id'), this.get('unit.id'));
        }.bind(this),
        type: CONTENT_TYPES.UNIT,
        callback: {
          success:function(){
            component.get('onDeleteUnit')(builderItem);
          }
        }
      };
      this.actions.showModal.call(this, 'content.modals.gru-delete-content', model);
    },

    edit: function () {
      this.loadData().then(function() {
        var unitForEditing = this.get('unit').copy();
        this.set('tempUnit', unitForEditing);
        this.set('model.isEditing', true);
      }.bind(this));
    },

    openDomainPicker: function () {
      var component = this;
      var tree = this.get('taxonomyService').getCourses();

      var model = {
        selected: component.get('selectedDomains').map(function(domainTag) {
          return domainTag.get('taxonomyItem');
        }),
        shortcuts: component.get('selectedCourses'),
        taxonomyItems: tree,
        callback: {
          success: function(selectedTags) {
            var selectedDomains = component.get('selectedDomains');
            var selected = selectedTags.map(function(domainTag) {
              return TaxonomyTag.create({
                isReadonly: true,
                taxonomyItem: domainTag.get('taxonomyItem')
              });
            });

            Ember.beginPropertyChanges();
            selectedDomains.clear();
            selectedDomains.pushObjects(selected);
            Ember.endPropertyChanges();
          }
        }
      };

      this.actions.showModal.call(this, 'taxonomy.modals.gru-domain-picker', model, null, 'gru-domain-picker');
    },

    /**
     * Remove Lesson from a list of lessons
     */
    removeLesson: function (builderItem) {
      this.get('items').removeObject(builderItem);
    },

    /**
     * Remix Lesson from a list of lessons
     */
    remixLesson: function (lesson) {
      var builderItem = BuilderItem.create({
        isEditing: false,
        data: lesson
      });
      this.get('items').pushObject(builderItem);
    },

    saveUnit: function () {
      var courseId = this.get('course.id');
      var editedUnit = this.get('tempUnit');
      var unitService = this.get('unitService');

      // Saving an existing unit or a new unit (falsey id)?
      var savePromise = editedUnit.get('id') ?
                          unitService.updateUnit(courseId, editedUnit) :
                            unitService.createUnit(courseId, editedUnit);

      savePromise.then(function () {
          this.get('unit').merge(editedUnit, ['id', 'title', 'bigIdeas', 'essentialQuestions']);
          this.set('model.isEditing', false);
        }.bind(this))

        .catch(function (error) {
          var message = this.get('i18n').t('common.errors.unit-not-created').string;
          this.get('notifications').error(message);
          Ember.Logger.error(error);
        }.bind(this));
    }
  },


  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);

    if (!this.get('unit.id')) {
      // If this a new unit, set the tempUnit value so things don't break in edit mode
      let unitForEditing = this.get('unit').copy();
      this.set('tempUnit', unitForEditing);
    }

    // TODO: Init selected domains per unit's taxonomy values
    var courses = this.get('taxonomyService').getCourses();

    var domainTag1 = TaxonomyTag.create({
      isReadonly: true,
      taxonomyItem: courses[0].find(['100', '202'])
    });

    var domainTag2 = TaxonomyTag.create({
      isReadonly: true,
      taxonomyItem: courses[0].find(['100', '203'])
    });

    var domainTag3 = TaxonomyTag.create({
      isReadonly: true,
      taxonomyItem: courses[1].find(['101', '210'])
    });

    this.set('selectedDomains', [domainTag1, domainTag2, domainTag3]);

    // TODO: Selected courses assumed to exist in gru-accordion-course
    // or in the course model
    this.set('selectedCourses', [courses[0]]);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {TaxonomyTag[]} selectedDomains - List of domain tags assigned to this unit
   */
  selectedDomains: null,

  /**
   * @prop {Content/Unit} tempUnit - Temporary unit model used for editing
   */
  tempUnit: null

});
