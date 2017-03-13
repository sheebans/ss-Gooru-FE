import Ember from 'ember';

/**
 * CLass Activity model
 * typedef {Object} CLassActivity
 */
export default Ember.Object.extend({

    /**
     * @property {String} id - The class activity id
     */
    id: null,

    /**
     * @property {Date} date of class activity
     */
    date: null,

    /**
     * @property {Collection}
     */
    collection: null,

    /**
     * @property {CollectionPerformanceSummary}
     */
    performance: null
});
