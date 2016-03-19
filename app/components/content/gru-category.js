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
  // Attributes

  classNames: ['content','gru-category'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {Ember.A} categories - List of course categories
   */
  categories: COURSE_CATEGORIES,

  /**
   * @type Number} courseCategory
   */
  courseCategory: null,
  /**
   * Indicate the active category
   * @property {Boolean}
   */
  activeCategory: Ember.computed(function(){
    return   this.get('courseCategory');
  }),
// -------------------------------------------------------------------------
  // Properties
  /**
   * Indicate if a course information is in edit mode
   * @property {Boolean}
   */
  isEditing:null,
  /**
   * Selected Category
   */
  selectedCategory: Ember.computed('courseCategory','categories',function(){
    var categoriesList = this.get('categories');
    var selectedCategoryValue=this.get('courseCategory');
    var selectedCategory;
    categoriesList.forEach(function(category){
      if (category.value === selectedCategoryValue ){
        selectedCategory=category.label;
      }
    });
    return selectedCategory;
  }),
});
