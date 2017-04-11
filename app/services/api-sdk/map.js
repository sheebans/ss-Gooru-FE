import Ember from 'ember';
import MapSerializer from 'gooru-web/serializers/map/map';
import MapAdapter from 'gooru-web/adapters/map/map';

/**
 * Map Service
 *
 * Service responsible for map functionality
 *
 * @typedef {Object} MapService
 * @augments Ember/Service
 */
export default Ember.Service.extend({

  // -------------------------------------------------------------------------
  // Events

  init: function () {
    this._super(...arguments);
    this.set('serializer', MapSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('adapter', MapAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {GoalSerializer} serializer
   */
  serializer: null,

  /**
   * @property {GoalAdapter} adapter
   */
  adapter: null,


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Returns the next map location for an specific map context
   * @param {MapContext} mapContext
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
  }
});
