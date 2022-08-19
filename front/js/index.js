main();
function main() {
  console.log("Hello world javascript");
  fetch("http://localhost:3000/api/products") //Récupérer le tableau des produits depuis l'URL de l'API
    .then((reponse) => reponse.json()) //extraire le contenu "JSON" de la réponse de l'API
    .then((produits) => {
      const listingProduits = document.getElementById("items"); //récupérer un élément depuis la page HTML
      produits.forEach((produit) => {
        //pour chaque produit, répéter les instructions suivantes
        listingProduits.insertAdjacentHTML(
          "beforeend", //avant la fin on insère le contenu HTML suivant
          `<a href="./product.html?id=${produit._id}">
            <article>
              <img src="${produit.imageUrl}" alt="${produit.altTxt}">
              <h3 class="productName">${produit.name}</h3>
              <p class="productDescription">${produit.description}</p>
            </article>
          </a>`
        );
      });
    })
    .catch((erreur) => alert(erreur));
}
