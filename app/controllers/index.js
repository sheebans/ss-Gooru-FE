import Ember from "ember";
import i18nMixin from '../mixins/i18n';

/**
 * @typedef {object} Index Controller
 */
export default Ember.Controller.extend(i18nMixin,{



  /**
   * Selected grades items
   * @property {array}
   */
  selectedGrades: null,

  /**
   * Selected subject item
   * @property {array}
   */
  selectedSubjects: null,

  /**
   * Error message displayed when click Browse Content button
   * @property {}
   */
  errorMessage:null,

  /**
   * @property {[]} subjects
   * @see setupController at routes/index.js
   */
  subjects: null,

  standards: function(){
    //@todo: use data retrieved in the route
    const items = Ember.A();
    items.addObject(Ember.Object.create({ id: 1, name: "CCSS", title: "Common Core State Standard"}));
    items.addObject(Ember.Object.create({ id: 2, name: "CA SS", title: "California State Standard"}));
    items.addObject(Ember.Object.create({ id: 2, name: "NGSS", title: "Next Generation State Standard"}));
    return items;
  }.property(),

  grades: function(){
    //@todo: use data retrieved in the route
    const items = Ember.A();
    items.addObject(Ember.Object.create({ id: 1, name: "Pre-K", levels: [] }));
    items.addObject(Ember.Object.create({ id: 1, name: "Elementary", levels: ["K", "1", "2", "3", "4", "5"] }));
    items.addObject(Ember.Object.create({ id: 1, name: "Middle School", levels: ["6", "7", "8"] }));
    items.addObject(Ember.Object.create({ id: 1, name: "High School", levels: ["9", "10", "11", "12"] }));
    items.addObject(Ember.Object.create({ id: 1, name: "Higher Ed", levels: [] }));
    return items;
  }.property(),
  /**
   * Validate if selectedGrades is null or empty
   * @property
   */
  isEmptyGrades : Ember.computed.empty("selectedGrades"),
  /**
   * Validate if selectedSubject is null or empty
   * @property
   */
  isEmptySubjects : Ember.computed.empty("selectedSubjects"),

  actions: {

    /**
     * Triggered when a subject selection changes
     * @param {DropdownItem[]} items
     */
    onSubjectChange: function(items){
      this.set("selectedSubjects",items);
    },

    /**
     * Triggered when a standard selection changes
     * @param {DropdownItem} item
     */
    onStandardSelected: function(item){
      console.debug(item);

    },

    /**
     * Triggered when grade selection changes
     * @param {DropdownItem} item
     */

    onGradeSelected: function(items){
      this.set("selectedGrades",items);
    },
    /**
     * Triggered when click browseContent button
     * @param {}
     */
    onbrowseContentClick:function(){
      const controller =this;
      var gradeId;
      var subjectId;
        if(controller.get("isEmptyGrades")){
          controller.set("errorMessage",controller.t("index.browseContent.grades_missing_message"));
        }else{
          controller.set("errorMessage",null);
          if(controller.get("isEmptySubjects")){
            controller.set("errorMessage",controller.t("index.browseContent.subjects_missing_message"));
          }else{
            controller.set("errorMessage",null);
            gradeId = controller.get("selectedGrades").map(function (item) {
              return item.get("id");
            });
            subjectId = controller.get("selectedSubjects").map(function (item) {
              return item.get("id");
            });
            controller.transitionToRoute('/search/collections?grades=' +gradeId+"&subjects="+subjectId);
          }}
        }
  }

});
