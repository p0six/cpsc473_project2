
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('index-image-background', 'helper:index-image-background', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{index-image-background inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

