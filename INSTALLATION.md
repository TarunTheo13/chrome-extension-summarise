# Installation Guide for Explainx.ai

## Quick Start (5 minutes) ⚡

### Step 1: Build the Extension
Open your terminal and run:
```bash
cd /Users/theodoreweisz/Projects/AI_Makers_Codecademy_Bootcamp/chrome-extension-summarise
npm run build
```

### Step 2: Load in Chrome
1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable **"Developer mode"** using the toggle in the top-right corner
4. Click **"Load unpacked"**
5. Navigate to and select the `build` folder inside your project directory:
   ```
   /Users/theodoreweisz/Projects/AI_Makers_Codecademy_Bootcamp/chrome-extension-summarise/build
   ```

### Step 3: Start Using Explainx! 🎉
1. Visit any webpage
2. Look for the circular Explainx button in the top-right corner
3. Click it to extract and view the page content
4. Save summaries to view them later in the extension popup

## Troubleshooting 🔧

### Extension doesn't appear
- Make sure you've run `npm run build` successfully
- Check that "Developer mode" is enabled in chrome://extensions/
- Try reloading the extension by clicking the refresh icon

### Button not showing on webpage
- Refresh the webpage after installing the extension
- Check if the extension is enabled in chrome://extensions/
- Some websites (like chrome:// pages) don't allow extensions

### Summaries not saving
- Check if the extension has "Storage" permission
- Go to chrome://extensions/ and check the extension details

## Development Mode 👨‍💻

For active development with hot reload:
```bash
npm start
```

This starts a development server that watches for changes and automatically rebuilds.

## Updating the Extension 🔄

After making changes to the code:
1. Run `npm run build` again
2. Go to chrome://extensions/
3. Click the refresh icon on the Explainx card

## Uninstalling 🗑️

To remove the extension:
1. Go to chrome://extensions/
2. Click "Remove" on the Explainx card

---

Need help? Check the main [README.md](README.md) for more details!

