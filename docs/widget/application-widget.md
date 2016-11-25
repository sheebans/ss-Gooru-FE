Application Widget
==================
Gooru application ca be also embedded in a 3rd party application, any of the existing pages can be accessed directly.


# Embedding the app
* Include the script `application-widget.js` at your html page
* Include an HTML element to embed the application, the id `gooru-application-container` is required
* Add the application script to start up the app `aw = new ApplicationWidget('#gooru-application-container', options)`

```
<body>

  <div id="gooru-application-container"></div>

  <script src="../application-widget.js"></script>

  <script type="text/javascript">
    (function () {
      var aw = new ApplicationWidget('#gooru-application-container', {
        "appRootPath": "../",
        "transition": [ 'player', 'b6170219-5841-46b8-9c6a-d684bc457538', { queryParams: { type: 'collection', role: 'student' }}]
      });
    })();
  </script>
</body>
```



# Options

## `applicationRootPath`
Indicates where the application-widget.js is hosted, another resources would be loaded from there

*Default:* ""

*Example*
    ```
    aw = new ApplicationWidget('#gooru-application-container', {
        "appRootPath": "../"
    };
    ```
## `transition`
It is used to indicate the page to be presented to the user, it is an array having the route name, route params and query params

*Default:* sign in page

*Example*
    ```
    aw = new ApplicationWidget('#gooru-application-container', {
        "appRootPath": "../",
        "transition": [ 'player', collectionId, { queryParams: { type: type, role: 'student' }}]
    }  
    ```

## `token` (optional)
It contains an authorized Gooru token, the application will start a user session with it

*Default:* anonymous

*Example:* 
   ```
    aw = new ApplicationWidget('#gooru-application-container', {
        "appRootPath": "../",
        "token": axsdamdmsd2122asasa
    }  
    ```

## `sourceId` (optional)
It contains an sourceId identifying the customer, most of the time is used by LTI communication

*Default:* empty

*Example:* 
   ```
    aw = new ApplicationWidget('#gooru-application-container', {
        "appRootPath": "../",
        "sourceId": any-id
    }  
    ```
    
## `themeId` (optional)
Gooru provides several UI themes, this property indicates which css rules should be loaded

*Default:* gooru

*Example:* 
   ```
    aw = new ApplicationWidget('#gooru-application-container', {
        "appRootPath": "../",
        "themeId": london
    }  
    ```
    
## `features`
When setting up the widget it is possible to enable or disable functionality, the features property is a json object containing
the features to be disabled.
See [features flag document](../feature-flags.md) for more information

*Default*: all features are enabled

*Example*
   ```
    aw = new ApplicationWidget('#gooru-application-container', {
        "appRootPath": "../",
        "collections": {
            "player": {
              "showReactionBar": false,
              "showReportLink": false,
              "showBackLink": false,
              "showRemix": true
            }
        }
    }  
    ```
    
## `application properties`
When setting up the widget it is possible to set any other application property, any property you add needs to match the name expected by the application.
See [application properties document](../application-properties.md) for more information

*Default:* no properties changes

*Example*
   ```
    aw = new ApplicationWidget('#gooru-application-container', {
        "appRootPath": "../",
        "endpoint" : {
          "url": "http://nucleus-qa.gooru.org",
          "secureUrl": "https://nucleus-qa.gooru.org"
        },
        "realTime": {
          "webServiceUrl": "https://rt.nucleus-qa.gooru.org",
          "webSocketUrl": "https://rt.nucleus-qa.gooru.org",
        },
    }  
    ```

## Related documents

[Player Widget](player-widget.md)
