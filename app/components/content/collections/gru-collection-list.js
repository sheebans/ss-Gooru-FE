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
  // Dependencies

  /**
   * @requires service:api-sdk/course
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'collections', 'gru-collection-list'],
  // -------------------------------------------------------------------------
  // Actions

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
      var component = this;
      component.set('isSorting',true);

      const sortable = component.$('.sortable');
      sortable.sortable();
      sortable.sortable('enable');
    },
    /**
     * Cancel reorder collection items
     */
    cancelSort:function(){
      const sortable = this.$('.sortable');
      sortable.sortable('cancel');
      this.set('isSorting',false);
      sortable.sortable('disable');
    },

    /**
     * Save reorder collection items
     */
    saveReorder:function(){
      var component = this;
      const sortable = component.$('.sortable');
      if(this.get('isCollection')){
        //TODO
      }else{
        component.get('assessmentService').reorderAssessment(component.get('model.id'),component.get('orderList'))
        .then(function(){
            component.set('isSorting',false);
            sortable.sortable('disable');
            component.refreshList(component.get('orderList'));
          });
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events
  /**
   * DidInsertElement ember event
   */
  didInsertElement: function(){
    var component = this;

    const sortable = component.$('.sortable');
    sortable.sortable();
    sortable.sortable('disable');

    sortable.on('sortupdate', function() {
      const $items = component.$('.sortable').find('li');
      const orderList = $items.map(function(idx, item) {
        return $(item).data('id');
      }).toArray();
      component.set('orderList',orderList);
    });
  },
  /**
   * WillDestroyElement ember event
   */
  willDestroyElement:function(){
    var component = this;
    const sortable = component.$('.sortable');
    sortable.sortable();
    sortable.off('sortupdate');
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
  /**
   * @property {Array[]} orderList
   */
  orderList: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Refresh the item list after save reorder
   */
  refreshList:function(list){
    var items = this.get('items');
    var newItemList = Ember.A();
    list.forEach(function(item){
      let newItem = items.findBy('id',item);
      if(newItem){
        newItemList.addObject(newItem);
      }
    });
    items.clear();
    items.addObjects(newItemList);
  }


});
