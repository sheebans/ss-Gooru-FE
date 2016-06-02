import Ember from 'ember';
import Collection from 'gooru-web/models/content/collection';
import BuilderMixin from 'gooru-web/mixins/content/builder';
import ModalMixin from 'gooru-web/mixins/modal';

/**
 * Collection List
 *
 * Component responsible for listing a set of resources/questions
 *
 * @module
 * @augments content/courses/gru-accordion-course
 *
 */
export default Ember.Component.extend(BuilderMixin, ModalMixin, {


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'collections', 'gru-collection-list'],

  actions:{
    /**
     * Remove collection item
     */
    removeCollectionItem: function (builderItem) {
      this.get('items').removeObject(builderItem);
    },

    /**
     * Remix collection item
     */
    remixCollectionItem: function (builderItem) {
      this.get('items').addObject(builderItem);
    },
    /**
     * Reorder collection items
     */
    reOrderElements:function(){
      const sortable = this.$('.sortable');
      sortable.sortable();

      sortable.on('sortupdate', function() {

        const $items = component.$('.sortable').find('li');
        const answers = $items.map(function(idx, item) {
          return $(item).data('id');
        }).toArray();
      });
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isCollection - is this a listing for a collection or for an assessment
   */
  isCollection: Ember.computed('model', function() {
    return this.get('model') instanceof Collection;
  }),

  /**
   * @property {Boolean} isSorting
   */
  isSorting: false,

});
