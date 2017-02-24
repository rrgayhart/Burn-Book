const burnDetails = $('.individual-grudge');

$(document).ready(function() {
  const id = parseInt(window.location.pathname.split("/")[1]);
  console.log(id);
  getIndividualGrudgeFromServer(id)
})

const getIndividualGrudgeFromServer = (id) => {
  axios.get(`/api/grudges/${id}`)
  .then(response => {
    let grudge = response.data
    appendGrudge(grudge)
  })
}

const updateForgivenessStatus = (id) => {
  axios.put(`/api/grudges/${id}`)
  .then(res => {
    clearDetails()
    getIndividualGrudgeFromServer(id)
  })
}

const clearDetails = () => {
  $('.individual-grudge').html('')
}

const appendGrudge = (grudge) => {
    let name = grudge.grudge.name
    let offense = grudge.grudge.offense
    let date = grudge.grudge.date
    let status = grudge.grudge.status
    let id = grudge.grudge.id
    burnDetails.append(`<article class="individual-grudge">
      <h4>
        <span class="burn-category" class="name">
          Name:
        </span>
        ${name}
      </h4>
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
        <span class="burn-category"> Forgiven: </span>
        ${status}
      </p>
      <input onClick="updateForgivenessStatus(${id})" type="submit"/>
      </article>`)
  }
