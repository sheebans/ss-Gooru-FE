import Ember from 'ember';

/**
 * Teacher Performance Controller
 *
 * Controller responsible of the logic for the teacher performance
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
    // -------------------------------------------------------------------------
    // Dependencies

    queryParams: ['collectionType', 'unitId', 'lessonId', 'courseId'],


    // -------------------------------------------------------------------------
    // Properties

    /**
     * @property {string}
     */
    collectionType: 'assessment',

    /**
     * @property {string}
     */
    courseId: null,

    /**
     * @property {string}
     */
    unitId: null,

    /**
     * @property {string}
     */
    lessonId: null

    // -------------------------------------------------------------------------
    // Actions

    // -------------------------------------------------------------------------
    // Methods


});