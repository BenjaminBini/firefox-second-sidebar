# Codebase Structure

## Directory Layout
```
src/
├── second_sidebar.uc.mjs          # Entry point - initializes the script
└── second_sidebar/
    ├── browser_elements.mjs       # Firefox browser element wrappers
    ├── sidebar_injector.mjs       # Injects sidebar into Firefox DOM
    ├── sidebar_decorator.mjs      # Applies CSS styling
    ├── sidebar_elements.mjs       # Creates all XUL elements
    ├── sidebar_controllers.mjs    # Instantiates all controllers
    ├── controllers/               # Business logic layer
    │   ├── events.mjs            # Custom event definitions
    │   ├── sidebar_controller.mjs
    │   ├── web_panels_controller.mjs
    │   ├── web_panel_controller.mjs
    │   └── [other controllers]
    ├── xul/                       # UI element definitions
    │   ├── base/
    │   │   └── xul_element.mjs   # Base class for all XUL elements
    │   ├── sidebar_wrapper.mjs
    │   ├── sidebar_main.mjs
    │   └── [other UI elements]
    ├── settings/                  # Persistence layer
    │   ├── settings.mjs          # Base settings class
    │   ├── sidebar_settings.mjs
    │   ├── web_panels_settings.mjs
    │   └── [other settings]
    ├── wrappers/                  # Firefox API abstractions
    │   ├── preferences.mjs
    │   ├── customizable_ui.mjs
    │   ├── contextual_identity_service.mjs
    │   └── [other wrappers]
    ├── patchers/                  # Firefox internals patches
    │   ├── customize_mode_patcher.mjs
    │   └── [other patchers]
    ├── css/                       # Embedded stylesheets (imported as JS strings)
    ├── utils/                     # Helper functions
    │   ├── geometry.mjs
    │   ├── containers.mjs
    │   └── [other utilities]
    └── icons/                     # Embedded SVG icons
```

## Initialization Flow
1. **Entry**: `second_sidebar.uc.mjs`
2. **Wait**: UC_API.Runtime.startupFinished() or delayedStartupPromise
3. **Prepare**: ContextualIdentityServiceWrapper.ensureDataReady()
4. **Inject**: SidebarInjector.inject() - creates UI hierarchy
5. **Style**: SidebarDecorator.decorate() - applies CSS
6. **Patch**: CustomizeModePatcher.patch() - enables customization
7. **Controllers**: Auto-initialized during element creation

## Architecture Layers (Bottom-Up)

### Layer 1: Wrappers
- Thin abstractions around Firefox XPCOM APIs
- Isolate Firefox-specific dependencies
- Examples: PreferencesWrapper, CustomizableUIWrapper, SessionStoreWrapper

### Layer 2: Settings
- Load/save preferences from `about:config`
- Store data as JSON strings in Firefox prefs
- Base class: `Settings`
- Examples: SidebarSettings, WebPanelsSettings, WebPanelSettings

### Layer 3: XUL Elements
- Base class: `XULElement` (chainable methods)
- Creates DOM hierarchy declaratively
- All elements extend XULElement
- Created via `SidebarElements.create()`

### Layer 4: Controllers
- Business logic and event handling
- Instantiated via `SidebarControllers.create()`
- Communicate via custom events (see `controllers/events.mjs`)
- Examples: SidebarController, WebPanelsController, WebPanelController

### Layer 5: Patchers
- Monkey-patch Firefox internals where needed
- Examples: CustomizeModePatcher, PopupNotificationsPatcher

## Component Communication
- **Events**: Custom events defined in `controllers/events.mjs`
- **sendEvents()**: Dispatch custom events
- **listenEvent()**: Subscribe to events
- No tight coupling between controllers
