import Ember from "ember";
import ModalMixin from 'gooru-web/mixins/modal';
/**
 * Class Information controller
 *
 * Controller responsible of the logic for the class information page
 */
export default Ember.Controller.extend(ModalMixin,{

  // -------------------------------------------------------------------------
  // Dependencies
  classController: Ember.inject.controller('class'),

  /**
   * @requires service:api-sdk/class
   */
  classService: Ember.inject.service("api-sdk/class"),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     *
     * Triggered when a delete class option is selected
     */
    deleteClass: function(){
      var model = {
        content: this.get('class'),
        deleteMethod: function () {
          return this.get('classService').deleteClass(this.get('class.id'));
        }.bind(this),
        redirect: {
          route: 'home'
        }
      };

      this.actions.showModal.call(this,
        'content.modals.gru-delete-class',
        model, null, null, null, false);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  "class": Ember.computed.reads('classController.class'),

  /**
   * @property {User[]} class students
   */
  students: Ember.computed.reads('classController.members'),

  /**
   * A link to the computed property isStudent in class controller
   * @see controllers/class.js
   * @property {isStudent}
   */
  "isStudent": Ember.computed.reads('classController.isStudent')
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
