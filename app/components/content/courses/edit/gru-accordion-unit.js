import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import Lesson from 'gooru-web/models/content/lesson';
import PlayerAccordionUnit from 'gooru-web/components/content/courses/play/gru-accordion-unit';
import ModalMixin from 'gooru-web/mixins/modal';
import {CONTENT_TYPES} from 'gooru-web/config/config';

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
      var model = {
        selected: this.get('tempUnit.taxonomy').slice(0),
        shortcuts: null,  // TODO: TBD
        subject: this.get('course.mainSubject'),
        callback: {
          success: function(selectedTags) {
            var taxonomyList = component.get('tempUnit.taxonomy');
            var dataTags = selectedTags.map(function(taxonomyTag) {
              return taxonomyTag.get('data');
            });

            Ember.beginPropertyChanges();
            taxonomyList.clear();
            taxonomyList.pushObjects(dataTags);
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
     * Remove tag data from the taxonomy list in tempUnit
     */
    removeTag: function (taxonomyTag) {
      var tagData = taxonomyTag.get('data');
      this.get('tempUnit.taxonomy').removeObject(tagData);
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
          Ember.beginPropertyChanges();
          this.get('unit').merge(editedUnit, ['id', 'title', 'bigIdeas', 'essentialQuestions']);
          this.set('unit.taxonomy', editedUnit.get('taxonomy').toArray());
          this.set('model.isEditing', false);
          Ember.endPropertyChanges();
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
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {TaxonomyTag[]} selectedTags - List of domain tags assigned to this unit
   */
  selectedTags: Ember.computed('tempUnit.taxonomy.[]', function() {
    return this.get('tempUnit.taxonomy').map(function(tagData) {
      return TaxonomyTag.create({
        isActive: true,
        isReadonly: true,
        isRemovable: true,
        data: tagData
      });
    });
  }),

  /**
   * @prop {Content/Unit} tempUnit - Temporary unit model used for editing
   */
  tempUnit: null

});
