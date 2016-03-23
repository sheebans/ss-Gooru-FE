import Ember from 'ember';
import { COURSE_CATEGORIES } from 'gooru-web/config/config';
/**
 * Category component
 *
 * Component responsible for show  the categories group
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /*
     *Set Category
     * */
    setCategory:function(newCategory){
      this.set('activeCategory',newCategory);
      this.sendAction("onChangeCategory",newCategory);
    }
  },

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content','gru-category'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {Ember.A} categories - List of course categories
   */
  categories: COURSE_CATEGORIES,

  /**
   * @type {Number} courseCategory
   */
  courseCategory: null,
  /**
   * Indicate the active category
   * @property {Category}
   */
  activeCategory: Ember.computed('courseCategory','categories',function(){
    var categoriesList = this.get('categories');
    var selectedCategoryValue=this.get('courseCategory');
    var selectedCategory;
    categoriesList.forEach(function(category){
      if (category.value === selectedCategoryValue ){
      selectedCategory=category;
      }
      });
    return selectedCategory;
    }),
  // -------------------------------------------------------------------------
  // Properties
  /**
   * Indicate if a course information is in edit mode
   * @property {Boolean}
   */
  isEditing:null,
  /**
   * @property {String|Function} onChangeCategory - event handler when the selected category is changed
   */
  onChangeCategory: null,

});
