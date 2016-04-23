import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';
import BuilderMixin from 'gooru-web/mixins/content/builder';
import Lesson from 'gooru-web/models/content/lesson';

/**
 * Content Builder: Accordion Unit
 *
 * Component responsible for behaving as an accordion and listing a set of lessons.
 * It is meant to be used inside of an {@link ./gru-accordion-course|Accordion Course}
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(BuilderMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  /**
   * @requires service:api-sdk/lesson
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @requires service:api-sdk/unit
   */
  unitService: Ember.inject.service("api-sdk/unit"),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'courses', 'gru-accordion', 'gru-accordion-unit'],

  classNameBindings: ['model.isEditing:edit:view'],

  tagName: 'li',

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
      var unitForEditing = this.get('unit').copy();
      this.set('tempUnit', unitForEditing);
      this.set('model.isEditing', true);
    },

    saveUnit: function () {
      var courseId = this.get('courseId');
      var editedUnit = this.get('tempUnit');
      var unitService = this.get('unitService');

      // Saving an existing unit or a new unit (falsey id)?
      var savePromise = editedUnit.get('id') ?
                          unitService.updateUnit(courseId, editedUnit) :
                            unitService.createUnit(courseId, editedUnit);

      savePromise.then(function () {
          this.set('unit', editedUnit);
          this.set('model.isEditing', false);
        }.bind(this))

        .catch(function (error) {
          var message = this.get('i18n').t('common.errors.unit-not-created').string;
          this.get('notifications').error(message);
          Ember.Logger.error(error);
        }.bind(this));
    },

    toggle: function () {
      var toggleValue = !this.get('model.isExpanded');

      this.loadData();
      this.get('onExpandUnit')();
      this.set('model.isExpanded', toggleValue);
    }

  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {String} course - ID of the course this unit belongs to
   */
  courseId: null,

  /**
   * @prop {Content/Unit} tempUnit - Temporary unit model used for editing
   */
  tempUnit: null,

  /**
   * @prop {Boolean} isLoaded - Has the data for the unit already been loaded
   */
  isLoaded: false,

  /**
   * @prop {Content/Unit} unit
   */
  unit: Ember.computed.alias('model.data'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load data for the unit
   *
   * @function actions:loadData
   * @returns {undefined}
   */
  loadData: function () {
    if (!this.get('isLoaded')) {
      let courseId = this.get('courseId');
      let unitId = this.get('unit.id');

      return this.get('unitService')
        .fetchById(courseId, unitId)
        .then(function (unit) {
          this.set('model.data', unit);

          // Wrap every lesson inside of a builder item
          var children = unit.get('children').map(function (lesson) {
            return BuilderItem.create({
              data: lesson
            });
          });
          unit.set('children', children);

          this.set('items', children);
          this.set('isLoaded', true);
        }.bind(this))

        .catch(function (error) {
          var message = this.get('i18n').t('common.errors.unit-not-loaded').string;
          this.get('notifications').error(message);
          Ember.Logger.error(error);
        }.bind(this));
    } else {
      return Ember.RSVP.resolve(true);
    }
  }

});
