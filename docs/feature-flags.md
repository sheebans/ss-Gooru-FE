Feature flags
=============
Gooru application features can be enabled and disabled at runtime.

```
{
  features: {
    header: {
      enabled: true
    },
    collections: {
      player: {
        showReactionBar: true,
        showReportLink: true,
        showBackLink: true,
        showRemix: true,
        showCollectionName: true,
        showCollectionAuthor: true,
        showResourceNumber: true,
        showQuestionFeedback: false
      }
    }
  }
}
```

## `header.enabled`
Useful to hide the application header

## `collections.player.showReactionBar`
Useful to hide the reaction bar at the collection player

## `collections.player.showReportLink`
Useful to hide the player summary report

## `collections.player.showBackLink`
Useful to hide the player back navigation

## `collections.player.showRemix`
Useful to hide the player remix button

## `collections.player.showCollectionName`
Useful to hide the collection name

## `collections.player.showCollectionAuthor`
Useful to hide the collection author

## `collections.player.showResourceNumber`
Useful to hide the resource number

## `collections.player.showQuestionFeedback`
Useful to always show or hide feedback per question, assessment settings take priority over this, so that if
the assessment is configured to show feedback there is no way to turn it off.
