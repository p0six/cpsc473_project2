import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    /*return [
      {
        comment: "test",
        dateSubmitted: new Date('2016-03-03'),
        score: 1
      },
      {
        comment: "tesds",
        dateSubmitted: new Date('2017-01-03'),
        score: 12
      }
    ];*/

    /*var iList = [];
    var item = null;
    var tag = 'comment';

    item = this.store.createRecord(tag,
      {
          comment: "ekekopop",
          dateSubmitted: new Date('2011-03-03'),
          score: 1
        });
    iList.push(item);

    item = this.store.createRecord(tag,
      {
          comment: "nmnmmsmsn",
          dateSubmitted: new Date('2010-03-03'),
          score: 1
        });
    iList.push(item);

    return iList;*/

    return this.store.query('comment', {
      orderBy: 'dateSubmitted',
      limitToLast: 10
    });
  }
});

/*
comment: DS.attr('string'),
dateSubmitted: DS.attr('date'),
score: DS.attr('number')
*/
