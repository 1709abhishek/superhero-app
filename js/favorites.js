let favoritesArray = JSON.parse(localStorage.getItem("favoritesArray"));

const loadCharacters = async () => {
    console.log(favoritesArray)
    const htmlString = favoritesArray
        .map(async (id) => {
            console.log(id);
            try {
                const res = await fetch(`https://www.superheroapi.com/api.php/3976831975725162/${id}`);
                character = await res.json();
                console.log(character);
                const htmlString = document.createElement('div');
                htmlString.innerHTML = (
                    `
                        <li class="character"><a href="./profile.html?id=${character.id}">
                            <h2 id="character-name">${character.name}</h2></a>
                             <p id="character-id">id: ${character.id}</p>
                             <img class="character-image" src="${character.image.url}"></img>
            <h3 class="fullname">${character.appearance.gender}</h3>
                   
                  <h3 class="publisher">${character.biography.publisher}</h3>
                  <button class="btn remove-from-fav" data-id=${character.id} onClick="removeCharacter(${character.id})">
                                        Remove from favourites
                                    </button>
                                    
                  </li>
                  
                    `
                );
                document.getElementById("charactersList").appendChild(htmlString)
            } catch (err) {
                console.error(err);
            }

        });


};





// remove from favorites

const removeCharacter = (id) => {
    favoritesArray.pop(id);
    alert("removed character");
    localStorage.setItem("favoritesArray", JSON.stringify(favoritesArray));
    location.reload();
}

loadCharacters();