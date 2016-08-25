// Dummy object for testing
var wysihtml5 = {
  Editor: function(id) {
    return {
      on: function() {},
      focus: function() {},
      composer: {
        commands : {
          exec: function(name, p1) {
            if (name === "insertHTML") {
              document.getElementById(id).innerHTML = p1;
            }
          }
        },

        selection: {
          bookmark : 0,
          getBookmark : function(){
            return this.bookmark;
          },
          setBookmark: function (bookmark) {
            this.bookmark = bookmark;
          }
        }
      }
    };
  }
};
var wysihtml5ParserRules = null;
