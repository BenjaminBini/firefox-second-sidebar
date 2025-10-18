# Code Style & Conventions

## JavaScript Style
- **ES6+ Features**: Classes, arrow functions, async/await, destructuring, template literals
- **Module System**: ES modules (ESM) with `.mjs` extension
- **Type Documentation**: JSDoc type annotations (no TypeScript)

## Naming Conventions
- **Classes**: PascalCase (e.g., `SidebarController`, `WebPanelSettings`)
- **Methods/Variables**: camelCase (e.g., `loadPanel`, `activePanel`)
- **Files**: snake_case matching class names (e.g., `sidebar_controller.mjs`, `web_panel_settings.mjs`)
- **Private Methods**: Prefix with `#` (e.g., `#setupListeners()`)
- **Constants**: ALL_CAPS for true constants (e.g., `PREF_KEY`)

## Code Organization
- **Singletons**: Use static methods on classes
- **Chainable Methods**: XULElement classes support method chaining
- **File Structure**: One primary class per file
- **Imports**: ES module imports at top of file

## Formatting Rules (Prettier)
- **Indentation**: 2 spaces (no tabs)
- **Line Width**: Default Prettier settings
- **Quotes**: Prefer double quotes for strings
- **Semicolons**: Required

## Architecture Patterns
- **Layer Separation**: Clear separation between XUL elements, controllers, settings, and wrappers
- **Event-Driven**: Custom events for inter-controller communication
- **Declarative UI**: XUL elements constructed declaratively in constructors
- **Wrapper Pattern**: Thin abstractions around Firefox APIs

## Documentation
- Use JSDoc comments for complex methods
- Include inline comments for non-obvious logic
- Document public APIs and interfaces

## Best Practices
- Keep Firefox API dependencies in wrapper classes
- Use wrapper classes to isolate XPCOM components
- Prefer symbolic editing tools when possible
- Clear startup cache after changes to see effects
