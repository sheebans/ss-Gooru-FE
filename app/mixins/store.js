import Ember from "ember";

const { service } = Ember.inject;

/**
 * @typedef {Object} StoreMixin
 */
export default Ember.Mixin.create({

  /**
   * @property {Store} store
   */
  store: service("store")

});
