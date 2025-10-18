# Tech Stack

## Core Technologies
- **Language**: JavaScript (ES6+, ESM modules)
- **File Extension**: `.mjs` (ES modules)
- **UI Framework**: XUL (XML User Interface Language - Firefox's native UI markup)
- **Runtime**: Firefox chrome context with XPCOM components access

## Firefox APIs & Components
- **XPCOM Components**: `Cc` (Components.classes), `Ci` (Components.interfaces), `Cu` (Components.utils)
- **ChromeUtils**: Firefox's chrome utilities
- **Services**: Firefox Services API
- **CustomizableUI**: Toolbar customization API
- **ContextualIdentityService**: Multi-Account Containers API
- **SessionStore**: Browser session management
- **Favicons**: Favicon management
- **ZoomManager/FullZoom**: Page zoom control

## Development Tools
- **Linter**: ESLint 9.38.0 with @eslint/js
- **Formatter**: Prettier
- **Version Control**: Git

## Dependencies
- `eslint@^9.38.0`
- `@eslint/js@^9.38.0`
- `globals@^16.4.0`

## Deployment
- **Loader**: fx-autoconfig (https://github.com/MrOtherGuy/fx-autoconfig)
- **Installation Path**: `<Firefox Profile>/chrome/JS/`
- **Startup Cache**: Must be cleared after changes
