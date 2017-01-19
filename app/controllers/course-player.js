import PlayerController from 'gooru-web/controllers/player';

/**
 * Course Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default PlayerController.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions
  actions: {
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * The course for this collection
   * @property {Course}
   */
  course: null,

  /**
   * The unit for this collection
   * @property {Unit}
   */
  unit: null,

  /**
   * The lesson for this collection
   * @property {Lesson}
   */
  lesson: null,

  /**
   * The height of the coursePlay header
   * @property {Number}
   */
  heightOffset: 75,

  /**
   * Indicates if the navigator menu is going to be collapsed
   * @property {Boolean}
   */
  collapsedMenu: true,

  /**
   * Indicates if the remix button is visible
   * @property {boolean} showRemix
   */
  showRemix: false,

  /**
   * Indicates if the reaction bar is visible
   * @property {boolean}
   */
  showReactionBar: false

});
