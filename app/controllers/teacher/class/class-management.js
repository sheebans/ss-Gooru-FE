import Ember from "ember";
import ModalMixin from 'gooru-web/mixins/modal';
/**
 * Class management controller
 *
 * Controller responsible of the logic for the teacher class management tab
 */

export default Ember.Controller.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('teacher.class'),

  /**
   * @requires service:api-sdk/class
   */
  classService: Ember.inject.service("api-sdk/class"),

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     *
     * Triggered when a update class option is selected
     */
    updateClass: function(){
      this.saveClass();
    },

    /**
     *
     * Triggered when a delete class option is selected
     */
    deleteClass: function(){
      let controller = this;
      var model = {
        content: controller.get('class'),
        deleteMethod: function () {
          return controller.get('classService').deleteClass(controller.get('class.id'));
        },
        callback:{
          success:function(){
            controller.send('updateUserClasses');
          }
        }
      };

      this.actions.showModal.call(controller,
        'content.modals.gru-delete-class',
        model, null, null, null, false);
    },

    /**
     *
     * Triggered when a edit title class option is selected
     */
    editTitle: function(state=false) {
      let controller = this;

      controller.set('editingTitle', state);

      if(!state){
        controller.saveClass();
      }
    },

    /**
     *
     * Triggered when a edit min score class option is selected
     */
    editScore: function(state=false) {
      let controller = this;
      controller.set('editingScore', true);
    },

    /**
     *
     * Triggered when a edit save score option is selected
     */
    saveScore: function() {
      let controller = this;

      controller.set('editingScore', false);
      controller.saveClass();
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {Course}
   */
  course: Ember.computed.alias('classController.course'),

  /**
   * Copy of the class model used for editing.
   * @property {Class}
   */
  tempClass: null,

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false,

  /**
   * @param {Boolean } editingTitle - value used to check if title is editing or not
   */
  editingTitle: null,

  /**
   * @param {Boolean } editingScore - value used to check if score is editing or not
   */
  editingScore: null,

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })]),

  /**
   * @property {boolean} isAttendClassWithCode
   */
  isAttendClassWithCode: Ember.computed.equal('class.classSharing', 'open'),

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Validate and save class information
   */
  saveClass: function(){
    var controller = this;
    let editedClass = this.get('tempClass');
    var classSharing = this.get('isAttendClassWithCode') ? 'open' : 'restricted';

    editedClass.set('classSharing', classSharing);

    editedClass.validate().then(function ({ validations }) {
      if (validations.get('isValid')) {
        controller.get('classService').updateClass(editedClass)
          .then(function () {
            controller.send('updateUserClasses');
            controller.get('class').merge(editedClass, ['title', 'minScore', 'classSharing']);
          });
      }
      else {
        var classForEditing = controller.get('class').copy();
        this.set('tempClass', classForEditing);
      }
      this.set('didValidate', true);
    }.bind(this));
  },

  /**
   * Reset controller values
   */
  resetValues: function(){
    this.set('editingTitle', null);
    this.set('editingScore', null);
    this.set('didValidate', false);
  }
});
