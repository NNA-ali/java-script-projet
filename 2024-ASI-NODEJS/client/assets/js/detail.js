
let nom = document.querySelector('#nom');
let genre = document.querySelector('#genre');
let pays = document.querySelector('#pays');
let date = document.querySelector('#date');
// let  = document.querySelector('#');
let modif = document.querySelector('#modif');

let url = window.location;
let livreId = url.hash.substring(1);

function modify() {
    // création objet temporaire respectant le model
    let tmp = {
        nom: nom.value,
        genre: genre.value,
        pays: pays.value,
        date: date.value,
        
    };

    let urlModif = `/livre/${livreId}`;
    let options = {
        method: 'PUT',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(tmp)
    };

    fetch(urlModif, options)
        .then((res) => {
            if(res.ok) {
                window.location.href = '/pages/livre.html';
            }
        })
        .catch((err) => {
            console.log('Error :', err);
        });
}

let myHeaders = new Headers();
let route = `/livre/${livreId}`;
let options = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache : 'default'
};

fetch(route, options)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((response) => {
        nom.value = response.nom;
        genre.value = response.genre;
        pays.value = response.pays;
        date.value = String(response.date).slice(0, 10);
        
    })
    .catch((err) => {
        console.log('Error :', err);
    });

  
modif.addEventListener('click', () => {
    modify()
});