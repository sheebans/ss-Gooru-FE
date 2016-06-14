import Ember from 'ember';

/**
 * Taxonomy tag list
 */
export default Ember.Component.extend({


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy', 'gru-taxonomy-tag-list'],

  classNameBindings: ['isInCard:in-card'],

  // --------------------------------------------
  // Actions
  actions: {
    removeTag: function (tag) {
      if(this.get("onRemove")) {
        this.get("onRemove")(tag);
      }
    }
  },


  // --------------------------------------------
  // Properties
  /**
   * @property {boolean} Is the taxonomy tag list contained within a content card
   */
  isInCard: false,

  /**
   * @property {TaxonomyTag[]} taxonomy tag
   */
  tags: null,

  /**
   * Indicates the total of tags visible
   * @property {number}
   */
  tagsVisible: null,


  /**
   * @property {TaxonomyTag[]} taxonomy tag
   */
  visibleTags: Ember.computed("tags.[]", function(){
    const tagsVisible = this.get("tagsVisible") || 999999; //long number so it show all when no provided
    return this.get("tags").filter(function(tag, index){
      return index < tagsVisible;
    });
  }),

  /**
   * @property {number}
   */
  totalTags: Ember.computed.alias("tags.length"),

  /**
   * Indicates how many tags are not visible
   * @property {number}
   */
  nonVisibleTags: Ember.computed("totalTags", function(){
    const totalTags = this.get("totalTags");
    const tagsVisible = this.get("tagsVisible") || totalTags;
    const nonVisibleTags = (totalTags - tagsVisible);
    return nonVisibleTags > 0 ? nonVisibleTags : 0;
  }),

  /**
   * @property {string}
   */
  onRemove: null


});
