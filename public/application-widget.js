// Application Widget loader.
// This file support the player widget 1.0 initialization

var ApplicationWidget = function (selector, properties, autoStart) {

  var aw = {

    emberApp: "GooruWebApp",

    rootElementId: "gooru-application-container",

    selector: selector,

    properties: {},

    autoStart : autoStart || true,

    getContainer: function () {
      var selector = this.selector || ("#" + this.rootElementId);
      var container = jQuery(selector);
      // Verify Container ID
      var containerId = container.attr("id");
      if (typeof containerId === 'undefined') {
        container.attr("id", this.rootElementId);
      }

      return container;
    },

    /**
     * Initialize the application widget application, it also load dependencies
     */
    initialize: function (properties, onLoad) {
      var jqueryWasPresent = window.jQuery !== undefined;
      if (jqueryWasPresent) {
        jQuery.noConflict(true);
      }

      var aw = this;
      var appRootPath = properties.appRootPath;

      // Add google font styles
      aw.addCss("https://www.gooru.org/css?family=Lato:400,300,300italic,400italic,700,700italic", "text/css");
      aw.addCss("https://www.gooru.org/icon?family=Material+Icons");

      // Add web app styles
      aw.addCss(appRootPath + "assets/vendor.css", "text/css");
      aw.addCss(appRootPath + "assets/gooru-web.css", "text/css");

      // Add web app javascripts
      aw.addScript(appRootPath + "assets/vendor.js", {
        // Add Ember App after vendor libs
        onload: function () {
          aw.addScript(appRootPath + "assets/gooru-web.js", {
            onload: function() {
              aw.properties = aw.mergeProperties(properties);
              onLoad(properties);
            }
          });
        }
      });
    },

    /**
     * Merges application custom properties
     */
    mergeProperties: function(properties) {
      var aw = this;
      var fromUrl = aw.getPropertiesFromUrl();
      var fromContainer = aw.getPropertiesFromContainer();
      var fromBoth = $.extend(fromContainer, fromUrl);

      var transition = aw.getTransition(fromBoth);

      var result = {
        features: {
          header: {
            enabled: false //header should be disabled for embedded apps
          },
          collections: {
            player: {
              showReactionBar: fromBoth.showReactions === true,
              showQuestions: fromBoth.showQuestions === true,
              showReportLink: fromBoth.showReport === true,
              showCollectionName: fromBoth.showCollectionName === true
            }
          },
          resources: {
            player: {
              showResourceHeader: fromBoth.showResourceHeader === true
            }
          }
        },
        appRootPath: fromBoth.appRootPath,
        transition: transition,
        token: fromBoth.gooruToken
      };

      return $.extend(properties, result);
    },

    /**
     * Gets the transition information if available
     * @param properties
     * @returns {Array}
     */
    getTransition: function(properties) {
      var transition = undefined;
      var collectionId = properties.collectionId;
      var resourceId = properties.resourceId;
      var questionId = properties.questionId;

      if (collectionId) {
        transition = ['player', collectionId];
      }
      else if (resourceId) {
        transition = ['content.resources.play', resourceId];
      }
      else if (questionId) {
        transition = ['content.questions.play', questionId];
      }
      return transition;
    },

    /**
     * Load the player
     */
    start: function () {
      var aw = this;

      // Try to find a data-role=gooru-player element
      var container = aw.getContainer();
      if (container) {
        // Start App in next tick of the run loop.
        Ember.run.next(this, function () {
          var emberApp = window[aw.emberApp];
          emberApp.start({
            awProps: aw.properties
          });
        });
      }
      else {
        throw new Error("Container not found:" + aw.selector);
      }
    },

    /**
     * Add a script tag to head
     * @param url
     * @param options
     */
    addScript: function (url, options) {
      var tag = document.createElement('script');
      tag.setAttribute("type", "text/javascript");
      tag.setAttribute("src", url);
      if (typeof options !== "undefined") {
        // Add onload callback
        tag.onload = options.onload;
      }
      // Add script tag to head
      var parent = document.getElementsByTagName("head")[0];
      parent.appendChild(tag);
    },

    /**
     * Add a stylesheet tag to head
     * @param url
     * @param type
     */
    addCss: function (url, type) {
      var tag = document.createElement('link');
      if (typeof type !== "undefined") {
        tag.setAttribute("type", type);
      }
      tag.setAttribute("rel", "stylesheet");
      tag.setAttribute("href", url);
      // Add stylesheet to head
      var parent = document.getElementsByTagName("head")[0];
      parent.appendChild(tag);
    },

    /**
     * Apply url params if available
     * You can pass any param supported by the div element as data parameters
     *
     * i.e http://yourdomain.com/player.html?collection-id=123
     *
     */
    getPropertiesFromUrl: function () {
      var params = window.location.search.substring(1);
      params = params ? JSON.parse('{"' + params.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        }) : {};

      return params;
    },

    /**
     * Loads properties from the container
     * */
    getPropertiesFromContainer: function () {
      var container = this.getContainer();
      return container.data();
    },

    /**
     * Destroys the application
     */
    destroy: function () {
      var emberApp = window[aw.emberApp];
      if (emberApp) {
        emberApp.destroy();
      }
    }
  };

  aw.initialize(properties, function () {
    if (aw.autoStart){
      aw.start();
    }
  });

  return aw;
};
