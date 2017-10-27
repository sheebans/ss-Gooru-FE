/*
 Development Environment configuration properties
 */
export default {
  appRootPath: '/', //default is root
  endpoint: {
    url: 'http://www.gooru.org',
    secureUrl: 'https://www.gooru.org',
    tenantUrl: 'http://s3-us-west-1.amazonaws.com/nile-tenants/dev'
  },

  realTime: {
    webServiceUrl: 'http://www.gooru.org',
    webServiceUri: '/nucleus/realtime',
    webSocketUrl: 'https://rt.www.gooru.org',
    webSocketUri: '/ws/realtime'
  },

  teams: {
    url: 'http://teams-qa.gooru.org'
  },

  player: {
    resources: {
      pdf: {
        googleDriveEnable: false,
        googleDriveUrl: 'https://docs.google.com/gview?url='
      }
    }
  },

  themes: {
    bergen: {
      player: {
        narration: {
          highlightColor: '#C1E7D9'
        }
      }
    }
  },

  'quizzes-addon': {
    endpoint: {
      url: 'http://www.gooru.org',
      secureUrl: 'https://www.gooru.org',
      providerUrl: 'http://www.gooru.org'
    },

    realTime: {
      webServiceUrl: 'https://www.gooru.org',
      webServiceUri: '/',
      webSocketUrl: 'https://www.gooru.org',
      webSocketUri: '/ws/quizzes-realtime'
    }
  },

  exploreFeaturedCourses: {
    firstCourseId: '1d91657f-694b-43dc-9306-bca17b107c7d',
    secondCourseId: '7b58ac43-075b-46c4-a7f4-a1ce2b346e85'
  }
};
