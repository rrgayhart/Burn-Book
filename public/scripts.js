$('.submit-btn').on('click', (e) => {
  e.preventDefault();
  const name = $('#name-input').val();
  const offense = $('#offense-input').val();
  const id = Date.now();
  const status = false;
  const date = new Date();
  postGrudgeToServer(name, offense, id, status, date)

});

const postGrudgeToServer = (name, offense, id, status, date) => {
  axios.post('/api/grudges', { name, offense, id, status, date })
}
