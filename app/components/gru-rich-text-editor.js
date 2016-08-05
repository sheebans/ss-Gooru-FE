import Ember from 'ember';
import { LATEX_EXPRESSIONS } from 'gooru-web/config/question';

/**
 * Rich text editor component
 *
 * @module
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-rich-text-editor'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    toggleExpressionsPanel() {
      if(this.get('showExpressionsPanel')){
        this.cancelExpression();
      }
      this.toggleProperty('showExpressionsPanel');
    },
    insertExpression() {
      var component = this;
      if (component.get('editor') && component.get('mathField')) {
        let latex = component.get('mathField').latex();
        let html = "<span class='gru-math-expression'><span class='source' hidden>" + latex + "</span>" + katex.renderToString(latex) + "</span>";
        component.get('editor').focus();
        if (component.get('cursor')) {
          component.get('editor').composer.selection.setBookmark(component.get('cursor'));
        }
        if (component.get('editor').composer) {
          component.get('editor').composer.commands.exec("insertHTML", html);
          var editorElement = component.$('.editor-box');
          component.set('content', editorElement.html());
          component.makeExpressionsReadOnly();
          component.setCursor();
        }
      }
      this.cancelExpression();
      this.toggleProperty('showExpressionsPanel');
    },
    updateExpression() {
      var component = this;
      if (component.get('editingExpression') && component.get('editor') && component.get('mathField')) {
        let latex = component.get('mathField').latex();
        let source = component.get('editingExpression').find('.source');
        if (source.length && latex !== source.text()) {
          let html = katex.renderToString(latex);
          source.text(latex);
          component.get('editingExpression').find('.katex').replaceWith(html);
          var editorElement = component.$('.editor-box');
          component.set('content', editorElement.html());
          component.makeExpressionsReadOnly();
          component.setCursor();
          this.cancelExpression();
          this.toggleProperty('showExpressionsPanel');
        }
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    var component = this;
    var mathFieldSpan = component.$('.math-field')[0];
    // Initialize Mathquill
    var MQ = MathQuill.getInterface(2);
    component.set('mathField', MQ.MathField(mathFieldSpan));
    component.set('MQ', MQ);

    // Initialize RTE
    var editor = new wysihtml5.Editor("wysihtml-editor", {
      toolbar: "wysihtml-toolbar",
      cleanUp: false,
      parserRules: wysihtml5ParserRules
    });

    // Workaround to prevent editor cleanup, which would delete math expressions
    Ember.run.later(function() {
      if (editor.composer && editor.composer.commands) {
        editor.focus();
        editor.composer.commands.exec("insertHTML", component.get('content'));
        component.makeExpressionsReadOnly();
        component.setCursor();
      }
    }, 100);

    component.set('editor', editor);

    // Add expression to MathQuill field
    component.$().on('click', '.tab-pane a', function(e) {
      e.preventDefault();
      var expression = $(this).data('expression');
      if (component.get('mathField') && LATEX_EXPRESSIONS[expression]) {
        component.get('mathField').write(LATEX_EXPRESSIONS[expression]).focus();
      }
    });
   // Save cursor position
    component.$().on('click', '#wysihtml-editor', function(e) {
      e.preventDefault();
      component.setCursor();
    });

    component.$().on('keyup', '.editor-box', function(e) {
      e.preventDefault();
      var editorElement = component.$('.editor-box');
      component.set('content', editorElement.html());
      component.setCursor();
    });

    // Go to edit mode of existing expression
    component.$().on('click', '.katex', function(e) {
      e.preventDefault();
      var sourceLatex = $(this).siblings('.source').text();
      if (sourceLatex && sourceLatex !== "") {
        component.set('editingExpression', $(this).closest('.gru-math-expression'));
        component.set('showExpressionsPanel', true);
        Ember.run.later(function() {
          component.get('mathField').latex(sourceLatex).reflow().focus();
        }, 100);
      }
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} Indicates if the expressions panel must be showed
   */
  showExpressionsPanel: false,

  /**
   * @property {DOMElement} Reference to the DOM element of the editing expression
   */
  editingExpression: null,

  /**
   * @property {boolean} Indicates it the user is editing an existing expression
   */
  isEditingExpression: Ember.computed('editingExpression', function() {
    return this.get('editingExpression') !== null;
  }),

  /**
   * @property {MQ} Mathquill instance
   */
  MQ: null,

  /**
   * @property {MathQuill} MathQuill field reference
   */
  mathField: null,

  /**
   * @property {Object} wysihtml5 editor instance
   */
  editor: null,

  /**
   * @property {string} content to edit
   */
  content: null,

  /**
   * @property {WrappedRange} Cursor position on wysihtml5 editor
   */
  cursor: null,

  restoreMathAndSelection: Ember.observer('showExpressionsPanel', function() {
    var component = this;
    Ember.run.later(function() {
      if (component.get('showExpressionsPanel')) {
        if (component.get('mathField')) {
          component.get('mathField').focus();
        }
      } else {
        if (component.get('cursor')) {
          component.setCursor();
        }
      }
    }, 100);
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Makes sure that the expressions inside the RTE are not editable
   */
  makeExpressionsReadOnly() {
    this.$('.katex').attr('contenteditable', false);
  },
  /**
   * Cancel expression panel
   */
  cancelExpression() {
    this.get('mathField').latex(""); // Clear math field
    this.set('editingExpression', null);
  },
  setCursor(){
    var component = this;
    component.set('cursor',component.get('editor').composer.selection.getBookmark());
    component.get('editor').composer.selection.setBookmark(component.get('cursor'));
    component.get('editor').focus();
  }
});
