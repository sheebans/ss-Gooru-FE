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
    "webSocketUrl": "https://goorurt.qa.gooruweb.edify.cr",
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
```

## `appRootPath`
Base path where the application is hosted

## `endpoint`
Useful to configure the BE services
* `endpoint.url`: application rest services url
* `endpoint.secureUrl`: application web socket url 


## `realTime`
Useful to configure the real time BE services
* `realTime.webServiceUrl`: application rest services url
* `realTime.webSocketUrl`: application web socket url 


## `teams`
* `teams.url`: Useful to configure the Team application integration

## `themes`
Useful to configure some own properties of the themes
