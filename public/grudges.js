function returnCounts(grudges=[]){
  let total = grudges.length;
  let forgiven = grudges.filter(grudges => grudges.status === true).length;
  let unforgiven = grudges.filter(grudges => grudges.status !== true).length;
  return { total, forgiven, unforgiven };
}

if(typeof module !== 'undefined') {
  module.exports = {
   returnCounts
  }
}