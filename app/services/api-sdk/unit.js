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
    this.set('serializer', UnitSerializer.create(Ember.getOwner(this).ownerInjection()));
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
  },

  /**
   * Update existing unit
   * @param {String} courseId - ID of the course the unit belongs to
   * @param {Content/Unit} unit - Unit model
   * @returns {Promise|String} returns the unit model
   */
  updateUnit: function (courseId, unit) {
    var unitData = this.get('serializer').serializeUpdateUnit(unit);

    return this.get('adapter').updateUnit({
      unitId: unit.get('id'),
      courseId: courseId,
      unit: unitData
    }).then(function () {
      return unit;
    }).catch(function (error) {
      return error;
    });
  },

  /**
   * Returns a unit by id
   * @param {string} courseId - course the unit belongs to
   * @param {string} unitId - unit ID to search for
   * @returns {Promise|Content/Unit}
   */
  fetchById: function (courseId, unitId) {
    return this.get('adapter').getUnitById({
      courseId: courseId,
      unitId: unitId
    }).then(function (unitData) {
        return this.get('serializer').normalizeUnit(unitData);
      }.bind(this))
      .catch(function (error) {
        return error;
      });
  }

});
