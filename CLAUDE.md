# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Second Sidebar is a Firefox userChrome.js script that adds a second sidebar with web panels (similar to Vivaldi/Edge/Floorp/Zen browsers). It is built as a Firefox extension using userChrome.js through the fx-autoconfig loader.

## Development Commands

### Linting
```bash
npx eslint .
```

### Formatting
```bash
npx prettier --write **/*.{js,mjs,md,yml}
```

Check formatting without changes:
```bash
npx prettier --check **/*.{js,mjs,md,yml}
```

## Code Architecture

### Entry Point & Initialization Flow

The script entry point is `src/second_sidebar.uc.mjs`, which:
1. Waits for Firefox startup via `UC_API.Runtime.startupFinished()` or `delayedStartupPromise`
2. Ensures container identities are ready via `ContextualIdentityServiceWrapper`
3. Calls `SidebarInjector.inject()` to inject the sidebar UI
4. Calls `SidebarDecorator.decorate()` to apply CSS styling
5. Patches customize mode via `CustomizeModePatcher`

### Core Architecture Layers

**1. XUL Element Layer** (`src/second_sidebar/xul/`)
- Base class: `XULElement` - wrapper around Firefox XUL elements with chainable methods
- Creates the UI hierarchy: sidebar wrapper → sidebar main → sidebar box → toolbars/browsers
- All UI elements extend `XULElement` and build the DOM structure declaratively
- Elements are created in `SidebarElements.create()` and organized into:
  - Main sidebar structure (wrapper, main, box, toolbar, browser)
  - Popups (new, edit, delete, more, settings)
  - Context menu items
  - Widgets (collapse button, new web panel button)

**2. Controller Layer** (`src/second_sidebar/controllers/`)
- All controllers are instantiated in `SidebarControllers.create()`
- Key controllers:
  - `SidebarController`: Main sidebar visibility/position/auto-hide logic
  - `WebPanelsController`: Manages all web panel instances, creates/deletes panels
  - `WebPanelController`: Individual web panel state (load/unload/mute/zoom)
  - `SidebarResizer` & `SidebarSplitter`: Handle sidebar width/height adjustments
  - `SidebarMainCollapser`: Controls collapse/expand animations
- Controllers communicate via custom events (see `controllers/events.mjs`)

**3. Settings/State Layer** (`src/second_sidebar/settings/`)
- `Settings` base class: Loads/saves preferences via `PreferencesWrapper`
- Settings are stored in Firefox's `about:config` as JSON strings
- Key settings classes:
  - `SidebarSettings`: Position (left/right), auto-hide, width, animations
  - `WebPanelsSettings`: Collection of all web panel configurations
  - `WebPanelSettings`: Individual panel URL, container, favicon, type (pinned/floating)
  - `WebPanelsState`: Runtime state (active panel, loaded panels)

**4. Wrapper Layer** (`src/second_sidebar/wrappers/`)
- Thin abstractions around Firefox internal APIs (XPCOM components)
- Examples: `CustomizableUIWrapper`, `PreferencesWrapper`, `SessionStoreWrapper`
- Isolates Firefox API dependencies for easier testing/maintenance

**5. Patcher Layer** (`src/second_sidebar/patchers/`)
- Monkey-patches Firefox internals where necessary
- `CustomizeModePatcher`: Makes sidebar toolbar customizable
- `PopupNotificationsPatcher`: Adjusts popup positioning for floating panels
- `SidebarMainPatcher`: Handles sidebar behavior modifications

### Component Relationships

```
second_sidebar.uc.mjs (entry)
    ↓
SidebarInjector.inject()
    ↓ creates
SidebarElements (XUL hierarchy)
    ↓ used by
SidebarControllers (business logic)
    ↓ reads/writes
Settings classes (persistence)
    ↓ uses
Wrappers (Firefox APIs)
```

### Event System

Custom events defined in `controllers/events.mjs`:
- `SidebarEvents`: RESET_SIDEBAR_FLOATING_*, SIDEBAR_*
- `WebPanelEvents`: CREATE_WEB_PANEL, DELETE_WEB_PANEL
- Use `sendEvents()` to dispatch, `listenEvent()` to subscribe
- Events flow between controllers without tight coupling

### Web Panel Types

1. **Pinned panels**: Fixed in sidebar, always visible, managed as tabs
2. **Floating panels**: Detached windows, positioned independently
3. **Temporary panels**: Created from context menu, deleted on close

Each panel:
- Runs in its own browser context (supports Firefox containers)
- Can be loaded/unloaded from memory
- Supports custom zoom, mobile view, periodic reload
- Tracks mute state and notification badges

## Important Constraints

1. **Firefox APIs**: This code runs in Firefox's privileged chrome context with access to XPCOM components (Cc, Ci, Cu, ChromeUtils)
2. **ESM Modules**: All files use `.mjs` extension and ES module syntax
3. **XUL**: Uses Firefox's XUL markup language for UI elements (createXULElement)
4. **No Build Step**: Code is loaded directly by fx-autoconfig, no bundling/transpilation
5. **Preferences**: Settings must be stored in Firefox prefs, serialized as JSON strings
6. **Startup Cache**: Changes require clearing Firefox startup cache to take effect

## Code Style

- ES6+ JavaScript with JSDoc type annotations
- 2-space indentation (enforced by Prettier)
- Class-based architecture with static methods for singletons
- Chainable methods pattern in XULElement classes
- PascalCase for classes, camelCase for methods/variables
- File names match class names in snake_case

## Testing Locally

1. Install fx-autoconfig: https://github.com/MrOtherGuy/fx-autoconfig
2. Copy `src/` contents to `<Firefox Profile>/chrome/JS/`
3. Enable `dom.allow_scripts_to_close_windows` in `about:config`
4. Clear startup cache: Delete `<Firefox Profile>/startupCache/`
5. Restart Firefox

## File Organization

- `src/second_sidebar.uc.mjs`: Entry point
- `src/second_sidebar/`:
  - `browser_elements.mjs`: Firefox browser element wrappers
  - `sidebar_elements.mjs`: Creates all XUL elements
  - `sidebar_controllers.mjs`: Instantiates all controllers
  - `sidebar_injector.mjs`: Injection logic
  - `sidebar_decorator.mjs`: CSS injection
  - `controllers/`: Business logic and event handlers
  - `xul/`: UI element definitions
  - `settings/`: Persistence layer
  - `wrappers/`: Firefox API abstractions
  - `patchers/`: Firefox internals patches
  - `css/`: Embedded stylesheets (imported as JS strings)
  - `utils/`: Helper functions (geometry, containers, URLs, etc.)
  - `icons/`: Embedded SVG icons

## Common Patterns

### Creating a new XUL element
```javascript
import { XULElement } from "./xul/base/xul_element.mjs";

export class MyElement extends XULElement {
  constructor() {
    super({
      tag: "toolbarbutton",
      id: "my-element-id",
      classList: ["my-class"],
    });
    this.setAttribute("label", "My Label");
  }
}
```

### Creating a new controller
```javascript
export class MyController {
  constructor() {
    this.#setupListeners();
  }

  #setupListeners() {
    SidebarElements.myElement.listenClick(() => {
      this.doSomething();
    });
  }
}
```

### Saving/loading settings
```javascript
import { Settings } from "./settings.mjs";

const PREF = "extensions.second-sidebar.my-setting";

export class MySettings {
  static load() {
    return Settings.load(PREF) ?? { defaultValue: true };
  }

  static save(value) {
    Settings.save(PREF, value);
  }
}
```

### Working with Firefox wrappers
```javascript
import { PreferencesWrapper } from "./wrappers/preferences.mjs";
import { CustomizableUIWrapper } from "./wrappers/customizable_ui.mjs";

// Read/write preferences
PreferencesWrapper.setStringPref("pref.name", "value");
const value = PreferencesWrapper.getStringPref("pref.name");

// Register customizable toolbar
CustomizableUIWrapper.registerArea("toolbar-id", {
  defaultPlacements: ["button-id"],
});
```
- use relevant agents and ALWAYS use serena
- agents must use serena also