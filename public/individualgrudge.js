const id = parseInt(window.location.pathname.split("/")[1]);

$(document).ready(function() {
  getIndividualGrudgeFromServer(id)
})

$('.forgive-btn').on('click', (e) => {
  e.preventDefault();
  updateForgivenessStatus(id);
});

const updateForgivenessStatus = (id) => {
  axios.put('/api/grudges/${id}')
}

const getIndividualGrudgeFromServer = (id) => {
  axios.get('/api/grudges/${id}')
  .then(response => {
    let grudge = response.data
    appendGrudge(grudge)
  })
}

const appendGrudges = (grudge) => {
    let offense = grudge.offense
    let date = grudge.date
    let status = grudge.status
    let id = grudge.id
    burnList.append(`<article class="burn-details">
      <p>
        <span class="burn-category">
          Offense:
        </span>
        ${offense}
      </p>
      <p>
        <span class="burn-category">
          Date:
        </span>
        ${date}
      </p>
      <p>
        <span class="burn-category"> Forgiveness Status: </span>
        ${status}
      </p>
      </article>`)
  }
}
