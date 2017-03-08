import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";
import RubricModel from 'gooru-web/models/content/rubric';

export default Ember.Route.extend(PrivateRouteMixin, {
  queryParams: {
    editing:{},
    editingContent:{
      refreshModel: true
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function (params) {
    var rubric = RubricModel.create( {id:'id-for-test',title: 'Rubric for testing'});
    const isEditing = params.editing;
    const editingContent = params.editingContent ? params.editingContent : null;
    return Ember.RSVP.hash({
      rubric,
      isEditing: !!isEditing,
      editingContent: editingContent
    });
  },

  setupController(controller, model) {
    controller.set('rubric', model.rubric);
    controller.set('isEditing', model.isEditing);
    controller.set('editingContent', model.editingContent);
  }
});
