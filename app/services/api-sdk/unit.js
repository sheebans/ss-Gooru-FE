import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import UnitSerializer from 'gooru-web/serializers/content/unit';
import UnitAdapter from 'gooru-web/adapters/content/unit';

/**
 * Unit Service
 *
 * Service responsible for performing CRUD operations on a unit model
 *
 * @typedef {Object} UnitService
 * @augments Ember/Service
 */
export default Ember.Service.extend(StoreMixin, {

  // -------------------------------------------------------------------------
  // Events

  init: function () {
    this._super(...arguments);
    this.set('serializer', UnitSerializer.create());
    this.set('adapter', UnitAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UnitSerializer} serializer
   */
  serializer: null,

  /**
   * @property {UnitAdapter} adapter
   */
  adapter: null,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Gets a specific unit by ID
   * @param {string} collectionId
   * @returns {Unit}
   */
  findById: function(courseId, unitId, options = {}) {
    options.queryType = 'byId';
    return this.get('store').queryRecord('unit/unit', {
      courseId: courseId,
      unitId: unitId,
      options: options
    });
  },

  /**
   * Find all units by class and course allowed for the current user
   * @param {string} classId class identifier
   * @param {string} courseId course identifier
   * @param {Object} options request options, like pagination, sort, etc
   * @returns {Promise.<Unit[]>} returns an array of units
   */
  findByClassAndCourse: function(classId, courseId, options = {}) {
    return this.get('store').queryRecord('unit/unit', {
      classId: classId,
      courseId: courseId,
      options: options
    });
  },

  /**
   * Create a unit for a course
   * @param {String} courseId - ID of the course the unit belongs to
   * @param {Content/Unit} unit - Unit model
   * @returns {Promise|String} returns the unit model with the newly assigned ID
   */
  createUnit: function (courseId, unit) {
    var unitData = this.get('serializer').serializeCreateUnit(unit);

    return this.get('adapter').createUnit({
      courseId: courseId,
      unit: unitData
    }).then(function (unitId) {
      unit.set('id', unitId);
      return unit;
    }).catch(function (error) {
      return error;
    });
  }

});
