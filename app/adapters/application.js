// import FirestoreAdapter from 'emberfire/adapters/firestore';
import FirestoreAdapter from 'emberfire/adapters/realtime-database';

export default FirestoreAdapter.extend({
    // Uncomment the following lines to enable offline persistence and multi-tab support
    // enablePersistence: true,
    // persistenceSettings: { synchronizeTabs: true }
});
