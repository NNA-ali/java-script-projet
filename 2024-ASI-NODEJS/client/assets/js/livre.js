function addLivre() {
    // Récupérer l'ensemble des informations de mon formulaire
    let nom = document.querySelector('#nom');
    let genre = document.querySelector('#genre');
    let pays = document.querySelector('#pays');
    let date = document.querySelector('#date');
    


    
    let tmp = {
        nom: nom.value,
        genre: genre.value,
        pays : pays.value,
        date: date.value,
      
    };


    

    let url = '/livre';

    let options = {
        method: 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(tmp)
    };

    fetch(url, options)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((response) => {
        addOneLine(response);
        document.forms['formSpe'].reset();
    })
    .catch((error) => {
        console.log('Error : ', error);
    });
}

function deleteLivre(id) {
    let url = `/livre/${id}`;
    let options = {
        method: 'DELETE'
    };
    fetch(url, options)
        .then((res) => {
            if (res.ok) {
                window.location.href = '/pages/livre.html';
            }
        })
        .catch((err) => {
            console.log('Error :', err);
    })
}
function addOneLine(data) {
    let tab = document.querySelector('#livre');
    let newLine = document.createElement('tr');
    if(newLine) {
        for (const prop in data) {
            if(prop != '_id' && prop != '__v') {
                let tmp = document.createElement('td');
                if(tmp) {
                    tmp.innerText = data[prop];
                    newLine.appendChild(tmp);

                }
            }
        }
    }
    

    // création lien vers la page de détail
    let tdLink = document.createElement('td');
    let link = document.createElement('a');
    link.href = `/pages/detail.html#${data._id}`;
    link.innerText = 'Détails';

    if(tdLink && newLine) {
        tdLink.appendChild(link);
        newLine.appendChild(tdLink);
    }

    // création du bouton de suppression
    let tdSuppr = document.createElement('td');
    let btnSuppr = document.createElement('button');
    if (btnSuppr && tdSuppr && newLine) {
        btnSuppr.innerText = 'Suppression';
        btnSuppr.classList.add('btn', 'btn-outline-danger');
        tdSuppr.appendChild(btnSuppr);
        newLine.appendChild(tdSuppr);
        btnSuppr.addEventListener('click', () => {
            deleteLivre(data._id);
        });
    }

    if (tab) {
        tab.appendChild(newLine);
    }
}

let btn = document.querySelector('#valid');
if (btn) {
    btn.addEventListener('click', (e) => {
        // Je stop la validation de la balise form avec :
        e.preventDefault();
        addLivre();
    });
}

let myHeaders = new Headers();
let url = '/livre';
let options = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache : 'default'
};

fetch(url, options)
    .then((res) => {
        if(res.ok) {
            console.log(res);
            return res.json();
        }
    })
    .then((response) => {
        console.log(response); // Ajoutez cette ligne pour voir le contenu de la réponse
        response.forEach((elt) => {
            elt.date = String(elt.date).slice(0,10);
            addOneLine(elt);
        });
    })
    
    .catch((err) => {
        console.log('Error :', err);
    })