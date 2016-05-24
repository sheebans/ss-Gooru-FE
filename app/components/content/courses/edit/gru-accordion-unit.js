import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';
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
export default PlayerAccordionUnit.extend(ModalMixin,{

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

    edit: function () {
      this.loadData().then(function() {
        var unitForEditing = this.get('unit').copy();
        this.set('tempUnit', unitForEditing);
        this.set('model.isEditing', true);
      }.bind(this));
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
          callback:{
            success:function(){
              component.get('onDeleteUnit')(builderItem);
            },
          }
      };
      this.actions.showModal.call(this,
        'content.modals.gru-delete-content',
        model, null, null, null, false);
    },
    /**
     * Remove Lesson from a list of lessons
     */
    removeLesson: function (builderItem) {
      this.get('items').removeObject(builderItem);
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
   * @prop {Content/Unit} tempUnit - Temporary unit model used for editing
   */
  tempUnit: null

});
