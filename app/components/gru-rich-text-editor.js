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
      this.toggleProperty('showExpressionsPanel');
    },
    insertExpression() {
      var component = this;
      if (component.get('editor') && component.get('mathField')) {
        let latex = component.get('mathField').latex();
        let html = "<span class='gru-math-expression'><span class='source' hidden>" + latex + "</span>" + katex.renderToString(latex) + "</span>";
        component.get('editor').focus();
        if (component.get('cursorPosition')) {
          component.get('cursorPosition').collapseToEnd();
        }
        if (component.get('editor').composer) {
          component.get('editor').composer.commands.exec("insertHTML", html);
        }
        component.makeExpressionsReadOnly();
      }
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
          component.makeExpressionsReadOnly();
        }
      }
    },
    cancelExpression() {
      this.set('showExpressionsPanel', false);
      this.get('mathField').latex(""); // Clear math field
      this.set('editingExpression', null);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    debugger;
    var component = this;
    var editorElement = component.$('.editor-box');
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
    // Save caret position on editor blur
    editor.on('blur:composer', function() {
      if (rangy) {
        component.set('cursorPosition', rangy.getSelection());
        component.set('content', editorElement.html());
      }
    });

    // Workaround to prevent editor cleanup, which would delete math expressions
    setTimeout(function() {
      if (editor.composer && editor.composer.commands) {
        editor.focus();
        editor.composer.commands.exec("insertHTML", component.get('content'));
        editorElement.blur();
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
    // Go to edit mode of existing expression
    component.$().on('click', '.katex', function(e) {
      e.preventDefault();
      var sourceLatex = $(this).siblings('.source').text();
      if (sourceLatex && sourceLatex != "") {
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
    return this.get('editingExpression') != null;
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
   * @property {RangySelection} Caret position in the editor
   */
  cursorPosition: null,

  /**
   * @property {Object} wysihtml5 editor instance
   */
  editor: null,

  /**
   * @property {string} content to edit
   */
  content: null,

  restoreMathAndSelection: Ember.observer('showExpressionsPanel', function() {
    var component = this;
    Ember.run.later(function() {
      if (component.get('showExpressionsPanel')) {
        if (component.get('mathField')) {
          component.get('mathField').focus();
        }
      } else {
        component.get('editor').focus();
        if (component.get('cursorPosition')) {
          component.get('cursorPosition').collapseToEnd();
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
  }
});
