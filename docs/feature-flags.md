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
        showBackLink: true
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
