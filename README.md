### To view a live copy of the application... click [here](https://img.awwsheezy.com/)

## TO RUN THE application

1. Pull the application from github
2. cd to the folder ex. cd imgrepo
3. type: npm install
4. type: npm install -g bower@latest
5. type: bower install
6. type: ember serve
7. enjoy the app at: http://localhost:4200


# imgrepo - An image repository built on EmberJS.

* `ember new imgrepo && cd imgrepo`

## Build Steps..
#### Create our 'bower.json' file which all bower installations will write to
* `bower init` - hit enter a bunch of times.

#### This gets us into business with Bootstrap
* `bower install bootstrap-sass --save`

#### This automates converting SCSS stylesheets to CSS during EmberCLI build process
* `ember install ember-cli-sass`
##### Look at page 374-377 for info / configuration requirements..

#### FontAwesome gives us a really nice pack of icons to work from:
* `ember install ember-font-awesome`
##### If you get an error "Cannot find module '@glimmer/syntax'", it's due to a bug in font awesome..
* `npm install @glimmer/syntax` to correct.
#### Another change made to `ember-cli-build.js` to correct an error with duplicate fonts..

#### Can now render icon's via "{{fa-icon "[icon name]"}}", for a list of icons, click [here](http://fontawesome.io/icons/)

#### Moment-from makes it nice to render date strings..
* `bower install moment --save`
##### Change made to `ember-cli-build.js` to import moment.

#### emberx-select@2.2.3 - maintains state in application without corresponding onChange() required.
* `ember install emberx-select@2.2.3`
##### Error will occur stating "Cannot read property 'indexOf' of undefined", fix that with:
* `bower install ember --save` - emberx-select seems to look for ember in bower_components, and this populates it.

#### Emberfire - Our Adapter to Firebase
* `ember install emberfire`
#### Useful guide [here](https://www.firebase.com/docs/web/libraries/ember/guide.html)

#### Firebase user authentication instructions [here](https://github.com/firebase/emberfire/blob/master/docs/guide/authentication.md)
* `ember install torii`
#### More docs [here](https://github.com/firebase/emberfire/blob/master/docs/migration/1XX-to-2XX.md)

#### Potential modal options:
https://github.com/yapplabs/ember-modal-dialog
* `ember install ember-modal-dialog`

#### File uploads?
* `ember install emberx-file-input@1.1.2`
##### More info [here](https://github.com/Aathi/firebase-storage-ember-example)

#### maybe look into emberx-slider as well?

### Firebase Hosting
```
retinaMike:imgrepo mromero$ firebase init

You're about to initialize a Firebase project in this directory:

  /Users/mromero/Documents/University/CPSC 473/ember-apps/imgrepo

? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confirm your choices. Hosting: Configure and deplo
y Firebase Hosting sites

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Select a default Firebase project for this directory: imgHost (imghost-17e95)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File dist/index.html already exists. Overwrite? No
i  Skipping write of dist/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

â  Firebase initialization complete!
retinaMike:imgrepo mromero$ cat firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
retinaMike:imgrepo mromero$ firebase deploy

=== Deploying to 'imghost-17e95'...

i  deploying hosting
i  hosting: preparing dist directory for upload...
â  hosting: 29 files uploaded successfully

â  Deploy complete!

Project Console: https://console.firebase.google.com/project/imghost-17e95/overview
Hosting URL: https://imghost-17e95.firebaseapp.com
retinaMike:imgrepo mromero$
```


#### Routes:
```
ember g route application
ember g route index
ember g route user
ember g route user/index
ember g route user/edit
ember g route post
ember g route post/index
ember g route post/edit
ember g route posts
ember g route posts/new
ember g route users
ember g route users/new
ember g route comments
ember g route comment
ember g route comment/index
ember g route comment/edit
ember g route comments/new
```

#### Models:
```
ember g model post
ember g model user
ember g model comment
```

#### Controllers:
```
ember g controller users/new
ember g controller posts/new
ember g controller application
```
