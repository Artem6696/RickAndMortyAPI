
function Character (name, species, status, image, id) {
    return `
<div id="${id}" class="character-card">
    <img class="character-image" src="${image}">
    <div class="name">${name}</div>
    <div class="species">Species: ${species}</div>
    <div class="status">Status: ${status}</div>
</div>
    `
}  

export default Character