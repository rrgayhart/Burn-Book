describe('burnTemplate', function(){
  var id, name, $subject;
  
  beforeEach(function(){
    id = 1
    name = 'Beth'
    var subject = burnTemplate(id, name)
    $subject = $(subject)
  });

  it('generates an article', function(){
    $subject.is('article')
  })

  it('contains name and id information', function(){
    var hasNameInSubjectText = $subject.text().indexOf(name) > 0
    var $idSpan = $subject.find('span.burn-category')[0]
    expect(hasNameInSubjectText)
    expect($idSpan.id).to.equal(id.toString())
  })
})