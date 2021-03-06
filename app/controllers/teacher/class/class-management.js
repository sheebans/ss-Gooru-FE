import Ember from 'ember';
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
  classService: Ember.inject.service('api-sdk/class'),

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when the user click outside of pullup.
     **/
    onClosePullUp() {
      this.set('showReportPullUp', false);
      this.set('isShowProficiencyPullup', false);
      this.set('isShowCompetencyContentReport', false);
    },
    /**
     * Archive class
     **/
    archiveClass: function() {
      const classId = this.get('class.id');
      var model = {
        content: this.get('class'),
        archiveMethod: () =>
          this.get('classService')
            .archiveClass(classId)
            .then(() => this.send('updateUserClasses'))
            .then(() => this.transitionToRoute('teacher-home'))
      };

      this.actions.showModal.call(
        this,
        'content.modals.gru-archive-class',
        model,
        null,
        null,
        null,
        false
      );
    },

    /**
     *
     * Triggered when a delete class option is selected
     */
    deleteClass: function() {
      let controller = this;
      var model = {
        content: controller.get('class'),
        deleteMethod: function() {
          return controller
            .get('classService')
            .deleteClass(controller.get('class.id'));
        },
        callback: {
          success: function() {
            controller.send('updateUserClasses');
          }
        }
      };

      this.actions.showModal.call(
        controller,
        'content.modals.gru-delete-class',
        model,
        null,
        null,
        null,
        false
      );
    },

    /**
     *
     * Triggered when a edit title class option is selected
     */
    editTitle: function(state = false) {
      let controller = this;

      controller.set('editingTitle', state);

      if (!state) {
        controller.saveClass();
      }
    },

    /**
     *
     * Triggered when a edit min score class option is selected
     */
    editScore: function() {
      let controller = this;
      controller.set('editingScore', true);
    },

    /**
     *Remove student
     */
    removeStudent: function(student) {
      let controller = this;
      var model = {
        content: student,
        deleteMethod: function() {
          return controller
            .get('classService')
            .removeStudentFromClass(
              controller.get('class.id'),
              student.get('id')
            );
        },
        callback: {
          success: function() {
            controller.get('sortedMembers').removeObject(student);
          }
        }
      };

      this.actions.showModal.call(
        this,
        'content.modals.gru-remove-student',
        model,
        null,
        null,
        null,
        false
      );
    },

    profileStudent: function(student) {
      let controller = this;
      let studentId = student.get('id');
      let classId = controller.get('class.id');
      this.transitionToRoute(`/${studentId}/about?classId=${classId}`);
    },

    proficiencyStudent: function(student) {
      let controller = this;
      controller.set('isShowProficiencyPullup', true);
      controller.set('selectedStudent', student);
    },

    /**
     *
     * Triggered when a edit save score option is selected
     */
    saveScore: function() {
      let controller = this;
      controller.set('editingScore', false);
      controller.saveClass();
    },
    /**
     *Sort student list by criteria
     */
    sortStudents: function(criteria) {
      if (this.get('sortBy') !== criteria) {
        this.set('sortBy', criteria);
        this.set('reverseSort', false);
      } else {
        this.set('reverseSort', !this.get('reverseSort'));
      }
    },
    /**
     *
     * Triggered when a update class option is selected
     */
    updateClass: function() {
      this.saveClass();
    },

    /**
     * Triggered from a co-teacher card of class mgt
     */
    removeCoteacher: function(coteacher) {
      var classCollaboratorsRef = this.get('class').get('collaborators');
      let classCollaborators = classCollaboratorsRef.copy();
      classCollaborators.reduce((acc, ccb, index, ccArr) => {
        if (ccb.id === coteacher.id) {
          ccArr.removeAt(index);
        }
      }, 0);
      let classCollaboratorArr = classCollaborators.map(ccb => ccb.id);
      this.get('classService')
        .removeCoTeacherFromClass(this.get('class.id'), classCollaboratorArr)
        .then(() => {
          this.get('class').set('collaborators', classCollaborators);
        });
    },

    /**
     * Method to show student report in pathway pullup
     */
    onOpenStudentReport(reportData, model) {
      let controller = this;
      controller.set('showReportPullUp', true);
      controller.set('reportData', reportData);
      controller.set('model', model);
      controller.set('isLoading', true);
    },

    /**
     * Action triggered when select a competency
     */
    onSelectCompetency(competency) {
      let controller = this;
      controller.set('selectedCompetency', competency);
      controller.set('isShowCompetencyContentReport', true);
    },

    /**
     * Navigate to teacher profile page
     * @param  {Object} teacher
     */
    profileTeacher: function(teacher) {
      let controller = this;
      let teacherId = teacher.get('id');
      let classId = controller.get('class.id');
      localStorage.setItem('classId', classId);
      this.transitionToRoute(`/${teacherId}/about?classId=${classId}`);
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
   * @property {boolean} isAttendClassWithCode
   */
  isAttendClassWithCode: Ember.computed.equal('class.classSharing', 'open'),

  /**
   * @param {Boolean} reverseSort - default sort in ascending order
   */
  reverseSort: false,

  /**
   * @param {String} sortBy - sort criteria
   */
  sortBy: 'firstName',

  /**
   * @param {String} sortDefinition - List of sort criteria
   */
  sortDefinition: Ember.computed('sortBy', 'reverseSort', function() {
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [`${this.get('sortBy')}:${sortOrder}`];
  }),

  /**
   * @param {[Student]} sortedMembers - Class members sorted
   */
  sortedMembers: Ember.computed.sort('class.members', 'sortDefinition'),

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'On',
      value: true
    }),
    Ember.Object.create({
      label: 'Off',
      value: false
    })
  ]),
  /**
   * Copy of the class model used for editing.
   * @property {Class}
   */
  tempClass: null,

  /**
   * @property {Boolean}
   * Property to show/hide proficiency pull up
   */
  isShowProficiencyPullup: false,

  /**
   * @property {String}
   * Property to store coruse subject bucket or K12.MA will be default
   */
  subjectBucket: Ember.computed('course', function() {
    let controller = this;
    return controller.get('course.subject') || 'K12.MA';
  }),

  /**
   * @property {Object}
   * Property to store selected student's data
   */
  selectedStudent: null,

  /**
   * @property {isCourseAssigned}
   * Property to check whether a course is assigned to the class or not
   */
  isCourseAssigned: Ember.computed('class', function() {
    let controller = this;
    let classData = controller.get('class');
    let isCourseAssigned = classData ? classData.courseId || false : false;
    return isCourseAssigned;
  }),

  /**
   * @property {Boolean} isShowCompetencyContentReport
   */
  isShowCompetencyContentReport: false,

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Validate and save class information
   */
  saveClass: function() {
    var controller = this;
    let editedClass = this.get('tempClass');
    var classSharing = this.get('isAttendClassWithCode')
      ? 'open'
      : 'restricted';

    editedClass.set('classSharing', classSharing);

    editedClass.validate().then(
      function({ validations }) {
        if (validations.get('isValid')) {
          controller
            .get('classService')
            .updateClass(editedClass)
            .then(function() {
              controller.send('updateUserClasses');
              controller
                .get('class')
                .merge(editedClass, ['title', 'minScore', 'classSharing']);
            });
        } else {
          var classForEditing = controller.get('class').copy();
          this.set('tempClass', classForEditing);
        }
        this.set('didValidate', true);
      }.bind(this)
    );
  },

  /**
   * Reset controller values
   */
  resetValues: function() {
    this.set('editingTitle', null);
    this.set('editingScore', null);
    this.set('didValidate', false);
  }
});
