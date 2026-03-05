# pureclock

Just a pure dark clock. 12hr.

[Click here to open the clock](https://theArnoll.github.io/pureclock)

## Functions

| Keyboard keys | Screen tap | Functions |
| ------------- | ---------- | --------- |
| `f` | Hour (Left) | Toggle fullscreen |
| `t` `1` `2` | Hour (Right) | Toggle font style |
| `m` | Minute | Show / Hide this manual |
| `w` | Second (Left) | Toggle White / Gray color |
| `c` | Second (Right) | Random color (8 colors) |

### CUSTOMIZE SETTINGS

You can save settings by modifying the link in your browser's address bar:  

1. Disable Position Shift  
    The position shifting every hour is for OLED screen protection.  
    If you want to disable it,  
    add <code>?oled=0</code> to the end.  
    Example: ```.../clock.html?oled=0```

2. Set Custom Color  
    Add <code>?color=ColorCode</code> (Use 6-digit hex code, no '#').  
    Example: ```.../clock.html?color=71A1F0```

3. Use Both  
    Connect them with an '<code>&</code>' symbol.  
    Example: ```.../clock.html?oled=0&color=71A1F0```

Or you can ignore these function, too!\
It's already a nice clock even if you don't configure anything.

Link:\
[theArnoll.github.io/pureclock](https://theArnoll.github.io/pureclock)\
or\
[pse.is/pureclock](https://pse.is/pureclock)

---

# Changelog (since v.1.5)

## v.1.5 Update: UX Update

### Improved Touchscreen Experience

Keyboard is no longer required for configuration.

### Modify Pop Out Info

Formatted everything to make it easier to read.

## v.1.5.1 Patch: Experience Balancing

### Rearranged overlay text size strategy

Make the manual view stay in the screen on desktop / landscape screen.

Removed keyboard instruction in manual view on mobile device (devices with touch screen, not able to hover)

## v.1.6 Update: UI refining

### Prevented text space squeezing

Changed position shifting method for OLED protection to prevent the space squeezing situation when the clock text is going close to the right edge.

## v.1.7 Update: Fullscreen Update

### Added fullscreen toggle in the website

This update focuses primarily on mobile devices. Hiding the address bar has become even harder since the last update, and it has never been possible to achieve a true fullscreen experience on mobile devices before this update. Therefore, I added a fullscreen toggle to resolve these issues.

> iOS Safari may not support toggling fullscreen mode by tapping the left digit of the hour part, and a fix is not currently planned. Pull requests are welcome.

## v.1.7.1 Patch: Touchscreen Fullscreen UX refining

Fixing the accidentally character choosing when toggling fullscreen on mobile device by adding a 0.1 second delay after tapping the digit.
