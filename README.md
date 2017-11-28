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
