const burnList = $('.list-container');
const peopleCount = $('#total-people');
const forgivenCount = $('#total-forgiven');
const unforgivenCount = $('#total-unforgiven');

$(document).ready(function() {
  getGrudgesFromServer()
})

$('.submit-btn').on('click', (e) => {
  e.preventDefault();
  const name = $('#name-input').val();
  const offense = $('#offense-input').val();
  const status = false;
  const date = new Date();
  const id = Date.now()
  postGrudgeToServer(name, offense, id, status, date)
  clearInputs()
});

$('#sort-name-btn').on('click', (e) => {
  e.preventDefault();
  clearList();
  sortGrudgesName()
});

$('#sort-date-btn').on('click', (e) => {
  e.preventDefault();
  clearList();
  sortGrudgesDate();
});


const postGrudgeToServer = (name, offense, status, id, date) => {
  axios.post('/api/grudges', { name, offense, status, id, date })
}

const getGrudgesFromServer = () => {
  axios.get('/api/grudges')
  .then(response => {
    let grudges = response.data
    appendGrudges(grudges)
    countPeople(grudges)
  })
}

const sortGrudgesName = () => {
  axios.get('/api/grudges')
    .then(response => {
      let grudges = response.data
      sortByName(grudges)
    })
}

const sortGrudgesDate = () => {
  axios.get('/api/grudges')
    .then(response => {
      let grudges = response.data
      sortByDate(grudges)
    })
}

const updateForgivenessStatus = (id) => {
  axios.put('/api/grudges/${id}')
}

const clearInputs = () => {
  $('#name-input').val('');
  $('#offense-input').val('');
}

const clearList = () => {
  $('.list-container').html('')
}

const appendGrudges = (grudges) => {
  for (var i = 0; i < grudges.length; i++) {
    let name = grudges[i].name
    let offense = grudges[i].offense
    let date = grudges[i].date
    let status = grudges[i].status
    let id = grudges[i].id
    burnList.append(`<article class="burn-item">
      <a href=/${id}>
        <h4>
          <span class="burn-category" class="name" id=${id}>
            Name:
          </span>
          ${name}
        </h4>
      </a>
      </article>`)
  }
}

const getGrudgeDetails = (grudges, id) => {
  axios.get('/api/grudges/:id')
  .then(response => {
    let grudges = response.data
    appendGrudges(grudges)
    countPeople(grudges)
  })
}

const sortByName = (grudges) => {
  let sortedGrudges = grudges.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA > nameB) {
      return 1;
    } else if (nameB > nameA) {
      return -1;
    } else {
      return 0;
    }
    });
  appendGrudges(sortedGrudges)
}

const sortByDate = (grudges) => {
  let sortedGrudges = grudges.sort((a, b) => {
    const dateA = a.date;
    const dateB = b.date;
    if (dateA > dateB) {
      return 1;
    } else if (dateB > dateA) {
      return -1;
    } else {
      return 0;
    }
    });
  appendGrudges(sortedGrudges)
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
