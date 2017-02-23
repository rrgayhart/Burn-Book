const burnList = $('#burn-list');
const peopleCount = $('#total-people');
const forgivenCount = $('#total-forgiven');
const unforgivenCount = $('#total-unforgiven');

$('.submit-btn').on('click', (e) => {
  e.preventDefault();
  const name = $('#name-input').val();
  const offense = $('#offense-input').val();
  const id = Date.now();
  const status = false;
  const date = new Date();
  postGrudgeToServer(name, offense, id, status, date)
  getGrudgesFromServer()
});

const postGrudgeToServer = (name, offense, id, status, date) => {
  axios.post('/api/grudges', { name, offense, id, status, date })
}

const getGrudgesFromServer = () => {
  axios.get('/api/grudges')
    .then(response => {
      let grudges = response.data
      appendGrudges(grudges)
      countPeople(grudges)
    })
}

const appendGrudges = (grudges) => {
  for (var i = 0; i < grudges.length; i++) {
    let name = grudges[i].name
    let offense = grudges[i].offense
    let date = grudges[i].date
    let status = grudges[i].status
    burnList.append(`<div>
      ${name}
      ${offense}
      ${date}
      ${status}
      </div>`)
  }
}


const countPeople = (grudges) => {
  let count = grudges.length
  let forgiven = grudges.filter(grudges => grudges.status === true).length
  let unforgiven = grudges.filter(grudges => grudges.status !== true).length
  peopleCount.append(
    `<span> ${count}</span>`
  )
  forgivenCount.append(
    `<span> ${forgiven}</span>`
  )
  unforgivenCount.append(
    `<span> ${unforgiven}</span>`
  )
}
