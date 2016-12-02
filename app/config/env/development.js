/*
 Development Environment configuration properties
 */
export default {
  "appRootPath": "/", //default is root
  "endpoint" : {
    "url": "http://nucleus-qa.gooru.org",
    "secureUrl": "https://nucleus-qa.gooru.org"
  },

  "realTime": {
    "webServiceUrl": "http://goorurt.qa.gooruweb.edify.cr",
    "webServiceUri": "/nucleus/realtime",
    "webSocketUrl": "https://goorurt.qa.gooruweb.edify.cr",
    "webSocketUri": "/ws/realtime"
  },

  "teams": {
    "url": "http://teams-qa.gooru.org"
  },

  "player": {
    "resources":{
      "pdf": {
        "googleDriveEnable": false,
        "googleDriveUrl":"https://docs.google.com/gview?url="
      }
    }
  },

  "themes": {
    "bergen": {
      "player": {
        "narration": {
          "highlightColor": "#C1E7D9"
        }
      }
    }
  }
};
