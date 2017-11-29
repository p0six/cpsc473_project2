import FirebaseSerializer from 'emberfire/serializers/firebase';
export default FirebaseSerializer.extend({
  attrs: {
    user: { embedded: 'always' },
    post: { embedded: 'always' },
    comment: { embedded: 'always' }
  }
});
