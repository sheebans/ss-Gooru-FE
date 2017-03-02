/*
 Development Environment configuration properties
 */
export default {
  "appRootPath": "/", //default is root
  "endpoint" : {
    "url": "",
    "secureUrl": "",
    "tenantUrl": "http://s3-us-west-1.amazonaws.com/nile-tenants/dev"
  },

  "realTime": {
    "webServiceUrl": "http://nile-dev.gooru.org",
    "webServiceUri": "/nucleus/realtime",
    "webSocketUrl": "https://rt.nile-dev.gooru.org",
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
