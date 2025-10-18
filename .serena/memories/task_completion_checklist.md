# Task Completion Checklist

When completing a development task, follow these steps:

## 1. Code Quality Checks

### Run Linter
```bash
npx eslint .
```
- Fix any linting errors before proceeding
- Ensure no new warnings are introduced

### Run Formatter
```bash
npx prettier --write **/*.{js,mjs,md,yml}
```
- Format all modified files
- Ensure consistent code style

## 2. Code Review
- [ ] Verify changes follow architectural patterns (XUL → Controllers → Settings → Wrappers)
- [ ] Check that private methods use `#` prefix
- [ ] Ensure proper JSDoc comments for complex logic
- [ ] Verify file names match class names in snake_case
- [ ] Confirm ES module imports are correct

## 3. Testing Considerations
- [ ] Clear Firefox startup cache after changes
- [ ] Test in Firefox with fx-autoconfig installed
- [ ] Verify `dom.allow_scripts_to_close_windows` is enabled
- [ ] Test both left and right sidebar positions
- [ ] Test with different container configurations
- [ ] Check console for any errors or warnings

## 4. Documentation
- [ ] Update CLAUDE.md if architectural changes were made
- [ ] Add inline comments for non-obvious logic
- [ ] Update JSDoc comments if method signatures changed

## 5. Git Workflow
- [ ] Review `git status` for unintended changes
- [ ] Stage only relevant files with `git add`
- [ ] Write clear, descriptive commit message
- [ ] Ensure commit follows project conventions

## Important Notes
- **No automated tests**: This project doesn't have a test suite; manual testing in Firefox is required
- **Startup cache**: Always clear `<Firefox Profile>/startupCache/` after code changes
- **XPCOM context**: Changes run in privileged Firefox chrome context
- **Live testing**: Test changes in actual Firefox browser with fx-autoconfig
