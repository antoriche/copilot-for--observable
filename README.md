![logo](./dist/assets/icons/icon128.png)
# Copilot for ObservableHQ
<small>Based on template [by divshekhar](https://github.com/divshekhar/web-extension-template)</small>

This extention aim to provide code autocompletion for [observablehq](https://observablehq.com/)  
This is using OpenAI text completion model and user should provide an API Key  

## :hammer: Setup the project

```bash
git clone https://github.com/antoriche/copilot-for-observable # clone the project
cd copilot-for-observable
npm install # Install dependencies
npm run watch # Rebuild on file update
```

## :computer: Load extension to chrome
Open [chrome://extensions/](chrome://extensions/) and enable developer mode  
Load a new extention and point to the `dist` directory in this project  
You should click on `update` to reload the extention to apply changes  