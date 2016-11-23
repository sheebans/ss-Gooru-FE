Application Properties
======================

Gooru application can be configured at runtime by setting several properties

```
{
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
      "london": {
        "player": {
          "narration": {
            "highlightColor": "#C1E7D9"
          }
        }
      }
    }
};
```

## `appRootPath`
Path were the application is hosted

## `endpoint`
Useful to configure the BE services

## `realTime`
Useful to configure the real time BE services

## `teams`
Useful to configure the Team application integration

## `themes`
Useful to configure some own properties of the themes
