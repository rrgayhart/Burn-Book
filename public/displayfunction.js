module.exports = function appendGrudges(response){
    for (var i = 0; i < response.length; i++) {
      return $(`$burn-list`).append(
        `<article>
            ${response[i].name}
        </article>`
      )

  }
