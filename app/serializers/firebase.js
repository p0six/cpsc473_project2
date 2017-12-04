import FirebaseSerializer from 'emberfire/serializers/firebase';

export default FirebaseSerializer.extend({
  // TODO: I believe this serializer is unnecessary...marked for future removal
  attrs: {
    user: {
      embedded: 'always'
    },
    post: {
      embedded: 'always'
    },
    comment: {
      embedded: 'always'
    }
  }
});
