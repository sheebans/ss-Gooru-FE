import Ember from 'ember';
var introJS = window.introJs;
const INTRO_JS_OPTIONS = Ember.A([
  'next-label',
  'prev-label',
  'skip-label',
  'done-label',
  'tooltip-position',
  'tooltip-class',
  'highlightClass',
  'exit-on-esc',
  'exit-on-overlay-click',
  'show-step-numbers',
  'show-step-numbers',
  'keyboard-navigation',
  'show-buttons',
  'show-bullets',
  'show-progress',
  'scroll-to-element',
  'overlay-opacity',
  'disable-interaction'
]);

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-tour'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    test() {
      console.log(this);
      let intro = this.get('introJS');
      let options = this.get('introJSOptions');
      intro.setOptions(options);
      intro.start();
    },

  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    this.set("introJS",introJS());
  },
  // -------------------------------------------------------------------------
  // Properties

  introJSOptions: Ember.computed(
    'next-label',
    'prev-label',
    'skip-label',
    'done-label',
    'tooltip-position',
    'tooltip-class',
    'highlightClass',
    'exit-on-esc',
    'exit-on-overlay-click',
    'show-step-numbers',
    'show-step-numbers',
    'keyboard-navigation',
    'show-buttons',
    'show-bullets',
    'show-progress',
    'scroll-to-element',
    'overlay-opacity',
    'disable-interaction',
    'steps',

    function(){
      var camelize = Ember.String.camelize;
      var underscore = Ember.String.underscore;

      var options = {};
      INTRO_JS_OPTIONS.map(function(option){
        var value = this.get(option);
        options[option]=value;
      },this);

      /*Ember.EnumerableUtils.forEach(INTRO_JS_OPTIONS, function(option){
        var normalizedName = camelize(underscore(option));

        var value = this.get(option);

        if (value !== null && value !== undefined) {
          options[normalizedName] = value;
        }
      }, this);*/

      options.steps = this.get('steps');

      return options;
    }
  ),

  startTour: function(){
    let intro = this.get('introJS');
    let options = this.get('introJSOptions');
    intro.setOptions(options);
    intro.start();
  }


});
