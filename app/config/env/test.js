/*
  Test Environment configuration properties
 */
export default {
  "appRootPath": "/", //default is root
  "endpoint" : {
    "url": "http://localhost:7357",
    "secureUrl": "http://localhost:7357"
  },

  "realTime": {
    "webServiceUrl": "https://localhost:7357",
    "webServiceUri": "/nucleus/realtime",
    "webSocketUrl": "https://localhost:7357",
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
