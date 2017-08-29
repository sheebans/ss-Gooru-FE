import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'rubric', 'gru-scoring-levels'],

  //// -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Delete Level
     */
    deleteLevel: function(level) {
      this.get('scoringLevels').removeObject(level);
    },
    /**
     * Delete Level
     */
    addLevel: function() {
      this.get('scoringLevels').addObject({ name: '', score: null });
    },
    /**
     *Triggered when scoring switch change
     */
    onScoringChange: function(isChecked) {
      this.set('showScore', isChecked);
    },
    /**
     *Triggered when level switch change
     */
    onLevelChange: function(isChecked) {
      this.set('showLevel', isChecked);
      if (!this.get('showLevel')) {
        this.set('showScore', false);
        this.set('disabledScoring', true);
      } else {
        this.set('disabledScoring', false);
      }
    }
  },

  //// -------------------------------------------------------------------------
  // Properties

  /**
   *Disabled Score Switch
   *
   * @property {Boolean}
   */
  disabledScoring: false,
  /**
   * @property {[]} scoringLevels
   * Should have 4 levels as default
   */
  scoringLevels: Ember.A([
    {
      name: '',
      score: null
    },
    {
      name: '',
      score: null
    },
    {
      name: '',
      score: null
    },
    {
      name: '',
      score: null
    },
    {
      name: '',
      score: null
    }
  ]),
  /**
   *Show the score scale
   *
   * @property {Boolean}
   */
  showScore: true,
  /**
   *Show the level scale
   *
   * @property {Boolean}
   */
  showLevel: true,
  /**
   * @property {Boolean} preview
   */
  preview: false,
  /**
   * List of options to show in the switch
   *
   * @property {Array}
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
  ])
});
