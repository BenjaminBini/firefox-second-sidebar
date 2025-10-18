# Suggested Commands

## Development Commands

### Linting
```bash
npx eslint .
```
Run ESLint to check code quality and catch potential issues.

### Formatting
```bash
npx prettier --write **/*.{js,mjs,md,yml}
```
Format all JavaScript, Markdown, and YAML files.

```bash
npx prettier --check **/*.{js,mjs,md,yml}
```
Check if files are formatted without making changes.

## Testing Locally

### Installation Steps
1. Install fx-autoconfig: https://github.com/MrOtherGuy/fx-autoconfig
2. Copy `src/` contents to `<Firefox Profile>/chrome/JS/`
3. Enable `dom.allow_scripts_to_close_windows` in `about:config`
4. Clear startup cache (see below)
5. Restart Firefox

### Clear Firefox Startup Cache
After making code changes, you must clear Firefox's startup cache:
```bash
# Delete the startupCache directory in your Firefox profile
rm -rf <Firefox Profile>/startupCache/
```
Or follow: https://github.com/MrOtherGuy/fx-autoconfig?tab=readme-ov-file#deleting-startup-cache

## System Commands (macOS/Darwin)

### File Operations
- `ls` - List directory contents
- `cd` - Change directory
- `find` - Search for files
- `grep` - Search file contents
- `cat` - Display file contents
- `rm` - Remove files/directories

### Git Commands
- `git status` - Check repository status
- `git add` - Stage changes
- `git commit` - Commit changes
- `git push` - Push to remote
- `git log` - View commit history

## Project Structure Navigation
- Entry point: `src/second_sidebar.uc.mjs`
- Core modules: `src/second_sidebar/`
- Controllers: `src/second_sidebar/controllers/`
- XUL Elements: `src/second_sidebar/xul/`
- Settings: `src/second_sidebar/settings/`
- Wrappers: `src/second_sidebar/wrappers/`
