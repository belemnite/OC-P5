
main();
function main() {


let params= new URLSearchParams(window.location.search)//-récupérer l'ID depuis l'URL( grâce à urlSearchParam)
const id = params.get('id')


fetch(`http://localhost:3000/api/products/${id}`)//-requête fetch pour les infos du produit
.then(reponse=>reponse.json())//extraire le contenu "JSON" de la réponse de l'API
.then(produit=>{
    //-afficher les détails sur la page
    let imageProduit= document.getElementById("image-produit");//récupérer un élément depuis la page HTML
    imageProduit.innerHTML=`<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
    const nomProduit= document.getElementById("title");
    nomProduit.textContent=produit.name;
    const prixProduit= document.getElementById("price");
    prixProduit.textContent=produit.price;
    document.getElementById("description").textContent=produit.description;
    const couleursProduit= document.getElementById("colors");
    produit.colors.forEach(couleur => {
    couleursProduit.insertAdjacentHTML("beforeend",`<option value="${couleur}">${couleur}</option>`)
    });
    
})

.catch(erreur=>alert(erreur))

//-associer la fonction  "ajouterAuPanier" au bouton
const btnAddToCart = document.getElementById("addToCart");//-lire depuis la page les inputs de l'utilisateur
btnAddToCart.addEventListener("click", ajouterAuPanier);

function ajouterAuPanier() {
  if (!formValide()){//vérifier la validité des inputs utilisateur avant d'effectuer le traitement
    return;
  }
  let panierTxt=localStorage.getItem("panier")||"[]";//-récupérer les choix de l'utilisateur (localStorage)
  let panier=JSON.parse(panierTxt)
  const couleurChoisie = document.getElementById("colors").value;
  const quantiteChoisie = document.getElementById("quantity").value; 
  
  // si quantité d'un même produit (même ID, même couleur) supérieure à 1, modifier uniquement la quantité
  let produitExistant = panier.find(article => article.id ==id && article.couleur ==couleurChoisie);
  if (!produitExistant) {
    panier.push({id:id,couleur:couleurChoisie, quantite: quantiteChoisie}); 
  }
  else{
    produitExistant.quantite= parseInt(produitExistant.quantite)+parseInt(quantiteChoisie);
  }
  
  localStorage.setItem ("panier",JSON.stringify(panier))
  alert("Votre produit a bien été ajouté au panier!")
}
}

function formValide() {
  if (document.getElementById("colors").value==="") {
   alert("Veuillez choisir une couleur");
   return false; 
  }
  const quantiteChoisie=document.getElementById("quantity").value;
  if (quantiteChoisie==0) {
    alert("Veuillez choisir une quantité");
    return false; 
   }
   if ((quantiteChoisie<0)||(quantiteChoisie>100)) {
    alert("Veuillez choisir une quantité entre 1 et 100");
    return false; 
   }
  return true;
}

