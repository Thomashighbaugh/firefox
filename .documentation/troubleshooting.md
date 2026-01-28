# Troubleshooting Guide

Comprehensive troubleshooting guide for the Higgs Boson Firefox Theme.

## Common Issues and Solutions

### CSS Not Loading

#### Issue: userChrome.css styles not applying

**Symptoms:**
- Browser appears unchanged after installation
- Tabs remain at the top
- No visual changes to the interface

**Solutions:**

1. **Check userChrome CSS preference**:
   ```
   about:config → toolkit.legacyUserProfileCustomizations.stylesheets = true
   ```

2. **Verify file location**:
   - Files must be in `[Profile]/chrome/` directory
   - Check that `userChrome.css` exists in the correct location
   - Ensure file permissions allow reading

3. **Restart Firefox completely**:
   - Close all Firefox windows
   - Wait a few seconds
   - Restart Firefox

4. **Check file syntax**:
   ```bash
   # Validate CSS syntax
   csslint userChrome.css
   # Or use browser DevTools
   ```

5. **Clear startup cache**:
   - Navigate to `about:support`
   - Click "Clear startup cache"
   - Restart Firefox

#### Issue: Partial CSS loading

**Symptoms:**
- Some styles apply but others don't
- Layout appears broken or incomplete

**Solutions:**

1. **Check CSS import paths**:
   ```css
   /* Ensure all imports use correct relative paths */
   @import url("css/chrome/tabs.css");
   ```

2. **Verify file permissions**:
   ```bash
   # Linux/macOS
   chmod 644 userChrome.css
   chmod -R 644 css/
   ```

3. **Check for CSS conflicts**:
   - Open Browser Console (Ctrl+Shift+J)
   - Look for CSS parsing errors
   - Check for duplicate or conflicting rules

### JavaScript Not Working

#### Issue: userChrome.js scripts not executing

**Symptoms:**
- Second sidebar not appearing
- Custom toolbar buttons missing
- No additional functionality beyond CSS

**Solutions:**

1. **Verify fx-autoconfig installation**:
   - Check that `config.js` exists in Firefox installation directory
   - Verify `defaults/pref/config-prefs.js` is present
   - Ensure proper permissions on script files

2. **Check Browser Console for errors**:
   ```javascript
   // Open Browser Console (Ctrl+Shift+J)
   // Look for error messages related to:
   - "fx-autoconfig"
   - Script loading failures
   - Module import errors
   ```

3. **Verify script file permissions**:
   ```bash
   # Linux/macOS
   chmod 644 JS/*.uc.js
   chmod 644 JS/*.uc.mjs
   chmod -R 644 JS/second_sidebar/
   ```

4. **Test with minimal script**:
   ```javascript
   // Create test.uc.js
   console.log("UserChrome.js is working");
   ```

#### Issue: Second sidebar not appearing

**Symptoms:**
- CSS loads correctly but no second sidebar
- Error messages in Browser Console about missing modules

**Solutions:**

1. **Check module imports**:
   ```javascript
   // Verify all import paths in second_sidebar.uc.mjs
   import { SidebarInjector } from "./second_sidebar/sidebar_injector.mjs";
   ```

2. **Verify UC_API availability**:
   ```javascript
   // Add debug logging to second_sidebar.uc.mjs
   console.log("UC_API available:", typeof UC_API !== "undefined");
   ```

3. **Check XUL namespace**:
   ```javascript
   // Ensure XUL namespace is properly declared
   if (!document.documentElement.hasAttribute("xmlns")) {
     document.documentElement.setAttribute("xmlns", 
       "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
   }
   ```

### Performance Issues

#### Issue: Firefox becomes slow or unresponsive

**Symptoms:**
- Delayed response to clicks
- Slow tab switching
- High CPU usage

**Solutions:**

1. **Disable expensive effects**:
   ```css
   /* Disable blur effects */
   .blur-effect {
     backdrop-filter: none !important;
   }
   
   /* Reduce animations */
   * {
     transition-duration: 0ms !important;
     animation-duration: 0ms !important;
   }
   ```

2. **Optimize CSS selectors**:
   ```css
   /* Use specific selectors instead of universal */
   #specific-element { /* styles */ }
   /* Instead of */
   * { /* styles */ }
   ```

3. **Check for memory leaks**:
   - Open `about:memory`
   - Look for unusually high memory usage
   - Check for JavaScript errors causing loops

4. **Disable problematic scripts**:
   ```bash
   # Temporarily disable scripts
   mv problematic-script.uc.js problematic-script.uc.js.disabled
   ```

#### Issue: High memory usage

**Symptoms:**
- Firefox uses excessive RAM
- System becomes sluggish
- Browser tabs crash

**Solutions:**

1. **Enable memory minimization**:
   - Ensure `minimizeMemory.uc.js` is enabled
   - Adjust memory thresholds in the script

2. **Check web panel usage**:
   ```javascript
   // Limit number of web panels
   const MAX_WEB_PANELS = 5;
   
   // Close unused panels automatically
   setInterval(() => {
     WebPanelManager.closeInactivePanels();
   }, 300000); // 5 minutes
   ```

3. **Optimize CSS animations**:
   ```css
   /* Use transform instead of changing layout properties */
   .animated-element {
     transform: translateX(100px);
     /* Instead of */
     /* left: 100px; */
   }
   ```

### Layout Issues

#### Issue: Overlapping elements

**Symptoms:**
- UI elements appear on top of each other
- Toolbar buttons are misaligned
- Text is cut off or hidden

**Solutions:**

1. **Check z-index values**:
   ```css
   /* Ensure proper layering */
   .top-layer { z-index: 1000; }
   .middle-layer { z-index: 100; }
   .bottom-layer { z-index: 1; }
   ```

2. **Verify positioning**:
   ```css
   /* Use absolute positioning carefully */
   .positioned-element {
     position: absolute;
     top: 0;
     left: 0;
     /* Ensure width/height are set */
     width: 100px;
     height: 30px;
   }
   ```

3. **Check responsive breakpoints**:
   ```css
   /* Add missing responsive rules */
   @media (max-width: 768px) {
     .responsive-element {
       display: none;
     }
   }
   ```

#### Issue: Vertical tabs not displaying correctly

**Symptoms:**
- Tabs appear horizontal instead of vertical
- Tab content is cut off
- Tab strip is mispositioned

**Solutions:**

1. **Check CSS media queries**:
   ```css
   /* Ensure vertical tabs preference is set */
   @media -moz-pref("sidebar.verticalTabs") {
     #TabsToolbar {
       orientation: vertical !important;
     }
   }
   ```

2. **Verify tab dimensions**:
   ```css
   .tabbrowser-tab {
     width: 100% !important;
     max-width: none !important;
     min-height: var(--tab-min-height) !important;
   }
   ```

3. **Reset tab strip layout**:
   ```css
   #tabbrowser-arrowscrollbox {
     flex-direction: column !important;
     overflow-x: hidden !important;
     overflow-y: auto !important;
   }
   ```

### Compatibility Issues

#### Issue: Theme breaks with Firefox updates

**Symptoms:**
- Previously working features stop functioning
- CSS selectors no longer match elements
- JavaScript errors after Firefox update

**Solutions:**

1. **Update CSS selectors**:
   ```bash
   # Check for changes in Firefox UI
   # Use Browser Toolbox (Ctrl+Alt+Shift+I)
   ```

2. **Check deprecation warnings**:
   ```javascript
   // Look for warnings in Browser Console
   // Update deprecated API calls
   ```

3. **Review Firefox release notes**:
   - Check for userChrome.css changes
   - Look for deprecated CSS properties
   - Update selectors as needed

4. **Test compatibility**:
   ```css
   /* Use @supports for feature detection */
   @supports (backdrop-filter: blur(10px)) {
     .blur-effect {
       backdrop-filter: blur(10px);
     }
   }
   ```

#### Issue: Extension conflicts

**Symptoms:**
- Theme works without extensions but breaks with them enabled
- Specific extension buttons don't appear correctly
- Extension functionality is impaired

**Solutions:**

1. **Identify conflicting extensions**:
   - Disable all extensions
   - Enable one at a time to isolate the issue

2. **Add extension-specific CSS**:
   ```css
   /* Fix for specific extension */
   #extension-specific-button {
     /* Override conflicting styles */
     display: block !important;
     position: relative !important;
   }
   ```

3. **Update toolbar button order**:
   ```css
   /* Adjust button order to accommodate extensions */
   #extension-button {
     order: 5 !important;
   }
   ```

### Firefox Profile Issues

#### Issue: Theme works in one profile but not another

**Symptoms:**
- Theme functions correctly in default profile
- Same files don't work in new profile

**Solutions:**

1. **Copy complete chrome directory**:
   ```bash
   cp -r /path/to/working/profile/chrome /path/to/new/profile/
   ```

2. **Verify preferences are set**:
   ```
   toolkit.legacyUserProfileCustomizations.stylesheets = true
   ```

3. **Check file permissions**:
   ```bash
   chmod -R 644 chrome/
   ```

4. **Reset profile if necessary**:
   - Create fresh profile
   - Copy theme files
   - Set required preferences

## Advanced Debugging

### Browser Toolbox Debugging

1. **Enable Browser Toolbox**:
   ```
   devtools.chrome.enabled = true
   devtools.debugger.remote-enabled = true
   ```

2. **Open Browser Toolbox**: `Ctrl+Alt+Shift+I`

3. **Inspect userChrome elements**:
   - Use Inspector to examine DOM structure
   - Check CSS rules and computed styles
   - Debug JavaScript modules

### CSS Debugging Techniques

1. **Add debug styles**:
   ```css
   /* Highlight problem areas */
   :root[debug-mode="1"] * {
     outline: 1px solid red !important;
   }
   
   /* Show hidden elements */
   :root[debug-mode="1"] [hidden] {
     visibility: visible !important;
     opacity: 0.5 !important;
     outline: 2px dashed blue !important;
   }
   ```

2. **Enable debug mode**:
   ```javascript
   // In Browser Console
   document.documentElement.setAttribute('debug-mode', '1');
   ```

### JavaScript Debugging

1. **Add extensive logging**:
   ```javascript
   class DebugLogger {
     static log(module, message, data = null) {
       const timestamp = new Date().toISOString();
       console.log(`[${timestamp}][${module}] ${message}`, data);
     }
   }
   
   // Usage throughout modules
   DebugLogger.log('SidebarInjector', 'Starting injection', { element: sidebarBox });
   ```

2. **Use performance monitoring**:
   ```javascript
   performance.mark('sidebar-start');
   // ... sidebar injection code
   performance.mark('sidebar-end');
   performance.measure('sidebar-injection', 'sidebar-start', 'sidebar-end');
   ```

## Getting Help

### Information to Provide

When seeking help, include:

1. **Firefox version**: `about:support`
2. **Operating system and version**
3. **Theme version/commit hash**
4. **Error messages from Browser Console**
5. **List of enabled extensions**
6. **Screenshots of the issue**
7. **Minimal reproduction steps**

### Log Collection

```bash
# Collect system information
firefox --version
uname -a

# Check file permissions
ls -la chrome/
ls -la chrome/JS/

# Verify preference settings
# about:config → search for "toolkit.legacy"
```

### Testing Environment

Create a clean testing environment:

1. **Create test profile**:
   ```bash
   firefox -P test-profile -no-remote
   ```

2. **Install minimal theme**:
   - Copy only essential files
   - Test basic functionality first

3. **Add components incrementally**:
   - Add CSS files one by one
   - Test JavaScript modules individually

### Community Resources

- Check existing GitHub issues
- Review Firefox userChrome.css communities
- Consult fx-autoconfig documentation
- Test with Firefox Developer Edition

## Prevention Strategies

### Regular Maintenance

1. **Keep backups**:
   ```bash
   # Weekly backup
   tar -czf firefox-theme-backup-$(date +%Y%m%d).tar.gz chrome/
   ```

2. **Test before Firefox updates**:
   - Use Firefox Beta/Nightly for testing
   - Keep stable theme version for production

3. **Monitor performance**:
   ```javascript
   // Add performance monitoring to critical paths
   setInterval(() => {
     const memory = performance.memory;
     if (memory && memory.usedJSHeapSize > 50 * 1024 * 1024) {
       console.warn('High memory usage detected');
     }
   }, 60000);
   ```

### Best Practices

1. **Use version control**:
   ```bash
   git init
   git add .
   git commit -m "Working theme configuration"
   ```

2. **Document custom changes**:
   ```css
   /* Custom modification for extension XYZ - 2024-01-15 */
   #extension-xyz-button {
     order: 10 !important;
   }
   ```

3. **Test across different setups**:
   - Different screen resolutions
   - Various extension combinations
   - Multiple Firefox versions

For additional support, refer to the main project documentation and community resources.