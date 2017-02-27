describe('grudgeTemplate', function(){
  it('it can handle receiving name and id', function(){
    var name = 'Anthony';
    var id = 11;
    var subject = grudgeTemplate(id, name);
    expect(subject).to.equal('cats');
  })
})