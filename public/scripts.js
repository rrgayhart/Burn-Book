const burnList = $('#burn-list');
const peopleCount = $('#total-people');


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
    checkStatus(status)
    burnList.append(`<div>
      ${name}
      ${offense}
      ${date}
      ${status}
      </div>`)
  }
}

const checkStatus = (status) => {
  if (status === false) {
    let status = 'Not Forgiven'
  } else {
    let status = 'Forgiven'
  }
}

const countPeople = (grudges) => {
  let count = grudges.length
  peopleCount.append(
    `<div>
      ${count}
    </div>`
  )
}
