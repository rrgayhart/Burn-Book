var expect = require('chai').expect
const jsdom = require('mocha-jsdom')


describe('Unit Tests', () => {
  var sortByDate, grudges;
  jsdom()

  before(() => {
    $ = require('jquery')
    axios = require('axios')
    sortByDate = require('../public/scripts.js').sortByDate
    grudges = [
      { 
        date: new Date("Wed Feb 22 2017 12:21:11 GMT-0700 (MST)"), 
        id: 27,
        name: "Steve",
        offense: 'this assessment',
        status: false },
      {
        date: new Date("Mon Feb 20 2017 12:21:11 GMT-0700 (MST)"), 
        id: 20,
        name: "Fred",
        offense: 'not taking this assessment',
        status: false },
      {
        date: new Date("Thu Feb 23 2017 12:21:11 GMT-0700 (MST)"), 
        id: 24,
        name: "Lucia",
        offense: "Passing all the assessments",
        status: false }
    ]
  });

  it('returns sorted by Date', function(){
    var subject = sortByDate(grudges)
    expect(subject[0].name).to.equal('Fred')
    expect(subject[1].name).to.equal('Steve')
    expect(subject[2].name).to.equal('Lucia')
  });
});