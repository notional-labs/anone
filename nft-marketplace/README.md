# basic-another-1-nft-marketplace

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### fix error "The template root requires exactly one element.eslint-plugin-vue" in file .Vue
You can solve this by doing: 
```
F1>Preferences:Open Settings (JSON)
```
Paste:
```
"vetur.validation.template": false,
"vetur.validation.script": false,
"vetur.validation.style": false,
```