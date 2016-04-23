import Ember from 'ember';
import Collection from 'gooru-web/models/content/collection';
import BuilderMixin from 'gooru-web/mixins/content/builder';

/**
 * Collection List
 *
 * Component responsible for listing a set of resources/questions
 *
 * @module
 * @augments content/courses/gru-accordion-course
 *
 */
export default Ember.Component.extend(BuilderMixin, {


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'collections', 'gru-collection-list'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isCollection - is this a listing for a collection or for an assessment
   */
  isCollection: Ember.computed('model', function() {
    return this.get('model') instanceof Collection;
  })

});
