import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  parentController: Ember.inject.controller('profile'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Handle onSelectCourse event from gru-course-card
     *
     */
    selectCourse: function(course){
      console.log("Select Course",course);
    },

    /**
     * Handle onRemixCourse event from gru-course-card
     *
     */
    remixCourse: function(){
      console.log("Remix Course");
    },

    /**
     * Handle onViewLayoutChange event from gru-view-layout-picker
     *
     */
    viewLayoutChange:function(layout){
      console.log(layout);
    }

  }

});
