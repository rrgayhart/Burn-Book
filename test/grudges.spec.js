var expect = require('chai').expect;

var returnCounts = require('../public/grudges.js').returnCounts

describe('returnCounts', function(){
  var grudges = [
    { 
      date: "Thu Feb 23 2017 12:21:11 GMT-0700 (MST)", 
      id: 27,
      name: "Steve",
      offense: 'this assessment',
      status: false },
    {
      date: "Thu Feb 23 2017 12:21:11 GMT-0700 (MST)", 
      id: 20,
      name: "Fred",
      offense: 'not taking this assessment',
      status: false },
    {
      date: "Thu Feb 23 2017 12:21:11 GMT-0700 (MST)", 
      id: 24,
      name: "Lucia",
      offense: "Passing all the assessments",
      status: false }
  ]

  it('measures totl, unforgiven and forgiven', function(){
    var subject = returnCounts(grudges);
    expect(subject.total).to.equal(3);
    expect(subject.unforgiven).to.equal(3);
    expect(subject.forgiven).to.equal(0);
    grudges[2].status = true;
    var subject = returnCounts(grudges);
    expect(subject.total).to.equal(3);
    expect(subject.unforgiven).to.equal(2);
    expect(subject.forgiven).to.equal(1);
  })

  xit('handles no grudges', function(){
    // bug here!
    var subject = returnCounts({});
    expect(subject.total).to.equal(0);
    expect(subject.unforgiven).to.equal(0);
    expect(subject.forgiven).to.equal(0);
  })
})