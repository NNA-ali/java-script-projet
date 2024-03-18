// Fonction pour ajouter un livre
function addLivre() {
    // Récupérer les informations du formulaire
    let nom = document.querySelector('#nom').value;
    let genre = document.querySelector('#genre').value;
    let pays = document.querySelector('#pays').value;
    let date = document.querySelector('#date').value;
    
    // Créer un objet représentant le livre
    let livre = {
        nom: nom,
        genre: genre,
        pays: pays,
        date: date,
        
    };

    // Définir l'URL d'ajout de livre
    let url = '/livre';

    // Configuration de la requête
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livre)
    };

    // Envoi de la requête pour ajouter le livre
    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur lors de l\'ajout du livre');
            }
        })
        .then(data => {
            // Si le livre est ajouté avec succès, réinitialiser le formulaire
            document.getElementById('formSpe').reset();
            // Ajouter le livre à la liste des livres affichée sur la page
            addOneLine(data);
            console.log("Redirection vers la page principale");
            // Redirection vers la page principale
            window.location.replace('livre.html');
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}

// Ajouter un écouteur d'événement sur le bouton de validation
document.getElementById('valid').addEventListener('click', addLivre);
