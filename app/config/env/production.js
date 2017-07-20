/*
 Production Environment configuration properties
 */
export default {
  "appRootPath": "/", //default is root
  "endpoint" : {
    "url": "https://www.gooru.org",
    "secureUrl": "https://www.gooru.org",
    "tenantUrl": "https://s3-us-west-1.amazonaws.com/nile-tenants/prod"
  },

  "realTime": {
    "webServiceUrl": "https://www.gooru.org",
    "webServiceUri": "/nucleus/realtime",
    "webSocketUrl": "https://rt.gooru.org",
    "webSocketUri": "/ws/realtime"
  },

  "teams": {
    "url": "http://teams.gooru.org"
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
  },

  "quizzes-addon": {
    "endpoint" : {
      "url": "https://qa.api.quizzes.edify.cr",
      "secureUrl": "https://qa.api.quizzes.edify.cr",
      "providerUrl": "https://nile-qa.gooru.org"
    },

    "realTime": {
      "webServiceUrl": "https://qa.api.quizzes.edify.cr",
      "webServiceUri": "/",
      "webSocketUrl": "https://qa.api.quizzes.edify.cr",
      "webSocketUri": "/ws/quizzes-realtime"
    }
  },

  "exploreFeaturedCourses": {
    "firstCourseId": "1d91657f-694b-43dc-9306-bca17b107c7d",
    "secondCourseId": "3def51be-bd91-48fd-b747-9c86339b571a"
  }
};
