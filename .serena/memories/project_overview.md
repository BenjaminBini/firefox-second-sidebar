# Project Overview

## Purpose
Second Sidebar is a Firefox userChrome.js script that adds a second sidebar with web panels (similar to browsers like Vivaldi, Edge, Floorp, and Zen). It enhances Firefox's native sidebar capabilities by providing an additional customizable sidebar with web panels.

## Key Features
- **Sidebar Management**: Show/hide, left/right positioning, auto-hide, animations, customizable width
- **Web Panels**: Create, delete, edit, pin/unpin, mute/unmute, zoom, periodic reload
- **Container Support**: Multi-Account Container integration
- **Floating Panels**: Detached window support
- **Customization**: Via Firefox's native Customize Toolbar interface
- **Extensions Support**: Works with Firefox extensions
- **Mobile View**: Support for mobile user-agent per panel

## Target Environment
- **Platform**: Firefox browser (desktop)
- **Loader**: fx-autoconfig (userChrome.js loader)
- **Execution Context**: Firefox chrome (privileged XPCOM access)
- **No Build Step**: Code runs directly without bundling/transpilation

## Architecture Philosophy
- Class-based ES6+ JavaScript architecture
- Layered design: XUL Elements → Controllers → Settings → Wrappers
- Event-driven communication between components
- Declarative UI construction via XUL elements
- Persistence via Firefox preferences (JSON serialization)
