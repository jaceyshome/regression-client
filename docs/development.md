# Development

## Directory Structure
```shell
├── dist/                         # Compiled files
│     ├── css/
│     │    ├──main.css
│     │    └──vendor.css
│     ├── fonts/
│     ├── images/
│     ├── main-bundle.js
│     ├── vendor-bundle.js
│     └── index.html
│
├── node_modules/                 # 3rd-party libraries
│
├── src/                          # Application source files 
│     │
│     ├── styles/                 
│     │     ├── components.scss   # Components scss imports
│     │     ├── app.scss          # Your application specific .scss goes here
│     │     └── vendor-scss.js    # Import all vendor .scss/css here [e.g. require('font-awesome/scss/font-awesome.scss')]  
│     │
│     ├── components/                  # All your application view logic files
│     │     ├── components/
│     │     ├── your-pages.js
│     │     └── ...
│     │
│     ├── index.html            
│     └── index.js                # Application entry point
│   
├── eslintrc.js                   # To configuring ESLint
└── package.json                  # NPM scripts list
```

## Docker image
Build with version
```
npm run docker:build
```
Publish
```
npm run docker:publish
```

reference: https://gist.github.com/duluca/d13e501e870215586271b0f9ce1781ce/


## References and major dependencies
1. (PixiJS 4)[http://www.pixijs.com/]
2. (MithrilJS)[https://mithril.js.org]
