# pureclock

Just a pure dark clock. 12hr.

[Click here to open the clock](https://theArnoll.github.io/pureclock)

## Functions

| Keyboard keys | Screen tap | Functions |
| ------------- | ---------- | --------- |
| `f` `1` `2` | Hour | Toggle font style |
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

## v.1.5 Update: UX Update

### Improved Touchscreen Experience

Keyboard is no longer required for configuration.

### Modify Pop Out Info

Formatted everything to make it easier to read.

## v.1.5.1 Patch: Experience Balancing

### Rearranged overlay text size strategy

Make the manual view stay in the screen on desktop / landscape screen.

Removed keyboard instruction in manual view on mobile device (devices with touch screen, not able to hover)