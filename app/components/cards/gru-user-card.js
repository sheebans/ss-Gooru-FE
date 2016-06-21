import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Component.extend(ModalMixin,{
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-user-card'],
  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     *Remove student
     */
    removeStudent: function () {
      let component = this;
      const myId = this.get("session.userId");
      var model = {
        content: component.get('user'),
        //deleteMethod: function () {
        //  return component.get('classService').deleteClass(controller.get('class.id'));
        //}.bind(component),
        callback:{
          success:function(){
            controller.send('updateUserClasses');
          }
        }
      };

      this.actions.showModal.call(this,
        'content.modals.gru-remove-student',
        model, null, null, null, false);
    },
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * The class presented to the user
   * @property {Class}
   */
  "user": null,
  /**Indicate if the user card is showing a teacher or a member of the class
   * @property {Class}
   */
  "isStudentCard":false,
  /**
   * Indicate if the user in session is a teacher.
   * @property {Class}
   */
  "isStudent":false,

  /**
   * Indicate if is a student card on a teacher view
   * @see controllers/info.js
   * @property {isTeacherAndStudentCard}
   */
  "isTeacherAndStudentCard":Ember.computed('isStudent','isStudentCard',function(){
    return !this.get('isStudent')&& this.get('isStudentCard');
  })
});
