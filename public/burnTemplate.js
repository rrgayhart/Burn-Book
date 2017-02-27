function burnTemplate(id, name){
  return `<article class="burn-item">
      <a href=/${id}>
        <h4>
          <span class="burn-category" class="name" id=${id}>
            Name:
          </span>
          ${name}
        </h4>
      </a>
    </article>`
}