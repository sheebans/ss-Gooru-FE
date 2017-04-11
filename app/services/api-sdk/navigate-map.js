import Ember from 'ember';
import NavigateMapSerializer from 'gooru-web/serializers/map/navigate-map';
import NavigateMapAdapter from 'gooru-web/adapters/map/navigate-map';
import MapContext from 'gooru-web/models/map/map-context';

/**
 * Navigate Map Service
 *
 * Service responsible for navigate map functionality
 *
 * @typedef {Object} NavigateMapService
 * @augments Ember/Service
 */
export default Ember.Service.extend({

  // -------------------------------------------------------------------------
  // Events

  init: function () {
    this._super(...arguments);
    this.set('serializer', NavigateMapSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('adapter', NavigateMapAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {NavigateMapSerializer} serializer
   */
  serializer: null,

  /**
   * @property {NavigateMapAdapter} adapter
   */
  adapter: null,


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Returns the next map location based on a specific map context
   * This method is used to know what is next based on where the user is right now
   * @param {MapContext} mapContext the current map context returned by the API
   * @returns {Promise| { context: MapContext, suggestions: MapSuggestion[] }
   */
  next: function (mapContext) {
    const service = this;
    const mapSerializer = service.get('serializer');
    return service.get('adapter').next(mapSerializer.serializeMapContext(mapContext))
      .then(function (payload) {
        return {
          context: mapSerializer.normalizeMapContext(payload.context),
          suggestions: mapSerializer.normalizeMapSuggestions(payload.suggestions)
        };
      });
  },

  /**
   * Returns the first/current map location for a course
   * This method is used to start a course or continue a course without knowing the exact location
   * @param {string} courseId
   * @param {string} classId optional
   * @returns {Promise| { context: MapContext, suggestions: MapSuggestion[] }
   */
  continue: function (courseId, classId = undefined) {
    const service = this;
    const mapContext = MapContext.create({
      courseId: courseId,
      classId: classId,
      status: 'continue'
    });
    return service.next(mapContext);
  },

  /**
   * Starts from a specific map location based on the context information
   * This method is used to get the map context from API when playing a specific collection, we need it because
   * the returned context will be used to navigate next
   *
   * @param {MapContext} mapContext some data for the map context, this is not a context returned by the API
   * @returns {Promise| { context: MapContext, suggestions: MapSuggestion[] }
   */
  start: function (mapContext) {
    const service = this;
    mapContext.set('status', 'start');
    return service.next(mapContext);
  }

});
