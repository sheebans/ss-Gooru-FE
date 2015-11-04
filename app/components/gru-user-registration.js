import Ember from "ember";
import ModalMixin from '../mixins/modal';

/**
 * User registration
 *
 * Component that routes the user either to the log in flow or the sign up flow.
 * May be embedded into a modal window (@see gru-modal).
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-user-registration'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {?String} specific class
   */
  'component-class':null,

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null

});
