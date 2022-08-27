/*

-afficher un message d'erreur si besoin
-constituer un objet contact (à partir des données du formulaire) et un tableau de produits
*/

main();
async function main() {
  let panierTxt = localStorage.getItem("panier") || "[]"; //-stocker les choix de l'utilisateur (localStorage)
  let panier = JSON.parse(panierTxt);
  let panierAvecPrix = [];
  console.log("panier: ", panier);//-recupérer le panier 
   for(const article of panier){//-parcourir l'array
    await fetch(`http://localhost:3000/api/products/${article.id}`).then((reponse) =>
      reponse.json()
    )
    .then(articleInfo=>{
      panierAvecPrix.push({...article,prix: articleInfo.price});//...spreadOperator
      document.getElementById("cart__items").insertAdjacentHTML("beforeend",//-créer et insérer des éléments dans la page panier
      `<article class="cart__item" data-id="${article.id}" data-color="${article.couleur}">
      <div class="cart__item__img">
        <img src="${articleInfo.imageUrl}" alt="${articleInfo.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${articleInfo.name}</h2>
          <p>${article.couleur}</p>
          <p>${articleInfo.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantite}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`)
    });
  };
  afficherTotal();
  //ajouter un evenement supprimer avec data et dataset
  const deleteItemBtns =document.querySelectorAll(".deleteItem");
  console.log(deleteItemBtns);
  deleteItemBtns.forEach(deleteItem=>{
    deleteItem.addEventListener("click",function (e) {
      const closest = e.target.closest(".cart__item");
      console.log("dataset");
      console.log(closest.dataset);
      panier=panier.filter(article=>article.id!=closest.dataset.id||article.couleur!=closest.dataset.color);
      localStorage.setItem("panier", JSON.stringify(panier));
      panierAvecPrix=panierAvecPrix.filter(article=>article.id!=closest.dataset.id||article.couleur!=closest.dataset.color);
      closest.remove();
      afficherTotal();
    })
  });

  //ajouter un evenement pour changement de quantité
  const changeQuantityInputs =document.querySelectorAll(".itemQuantity");
  console.log(changeQuantityInputs);
  changeQuantityInputs.forEach(changeQuantityInput=>{
    changeQuantityInput.addEventListener("change", (e)=>{
      const nouvelleQuantite =e.target.value;
      console.log(nouvelleQuantite)
      const closest = e.target.closest(".cart__item");
      console.log("dataset");
      console.log(closest.dataset);
      let produitEnCours = panier.find(article => article.id ==closest.dataset.id && article.couleur ==closest.dataset.color);
      produitEnCours.quantite=nouvelleQuantite;
      localStorage.setItem("panier", JSON.stringify(panier));
      let produitAvecPrixEnCours = panierAvecPrix.find(article => article.id ==closest.dataset.id && article.couleur ==closest.dataset.color);
      produitAvecPrixEnCours.quantite=nouvelleQuantite;
      
      afficherTotal();
    })
  });
  function afficherTotal(){
  //Afficher le nombre total d'articles du panier
    let totalQuantity = 0;
    for (let i=0; i<panier.length; i++){
    totalQuantity += parseInt(panier[i].quantite) ;
    }
    document.getElementById("totalQuantity").textContent=totalQuantity;

  //Afficher le prix total du panier
    let totalPrice = 0;
    for (let i=0; i<panierAvecPrix.length; i++){
    totalPrice += panierAvecPrix[i].prix *parseInt(panierAvecPrix[i].quantite);
    }
    document.getElementById("totalPrice").textContent=totalPrice.toFixed(2);
  } 
  


   document.getElementById("order").addEventListener("click", envoyerCommande);//-récupérer et analyser les données saisies par l'utilisateur dans le formulaire
   function envoyerCommande(event){
    event.preventDefault();
    if (!formulaireValide()){
      return;
      
    }
    console.log("formulaire valide")
    
    
    //constituer un tableau contact (firstName, lastName, address, city, email)

    //constituer un objet JSON avec les infos de la commande (contact+panier)
    /*
  else 
  let contact = new Array(firstName, lastName, address, city, email)
  let order = (id, panier, contact)
    */
    //faire fetch avec la methode POST
    //fetch order
   }
   function formulaireValide(){ //verifier la validation du formulaire avec regex
    let resultat = true;
    const inputPrenom = document.getElementById("firstName").value;
    /*if (inputPrenom === "") {
      document.getElementById("firstNameErrorMsg").textContent="Veuillez renseigner le prénom";
      resultat= false; 
    }
    */
    let regexPrenom =  /^[A-Z][A-Za-zàéèêëîïôùûüç\-]+(\s[A-Z][A-Za-zàéèêëîïôùûüç]+)*$/
    ; //vérification du champ prénom
    if(!regexPrenom.test(inputPrenom)){
      document.getElementById("firstNameErrorMsg").textContent="Ecrire un prénom valide";
      resultat= false; 
    }
    
    const inputNom = document.getElementById("lastName").value;
    let regexNom = /^[A-Z][A-Za-zàéèêëîïôùûüç\-]+(\s[A-Z][A-Za-zàéèêëîïôùûüç]+)*$/; //vérification du champ nom de famille
    if(!regexNom.test(inputNom)){
      document.getElementById("lastNameErrorMsg").textContent="Ecrire un nom valide";
      resultat= false; 
    }

    const inputAdresse = document.getElementById("address").value;
    let regexAdresse = /^[A-Za-z0-9àéèêëîïôùûüç°',]+(\s[A-Za-z0-9àéèêëîïôùûüç°',]+)*$/
    ; //vérification du champ adresse
    if(!regexAdresse.test(inputAdresse)){
      document.getElementById("addressErrorMsg").textContent="Ecrire une adresse valide";
      resultat= false; 
    }

    const inputVille = document.getElementById("city").value;
    let regexVille = /^[0-9{5}]+(\s[A-Za-zàéèêëîïôùûüç'\-]+)*$/; //vérification du champ code postal
    if(!regexVille.test(inputVille)){
      document.getElementById("cityErrorMsg").textContent="Ecrire un code postal valide";
      resultat= false; 

    const inputEmail = document.getElementById("email").value;
    let regexEmail =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    ; //vérification du champ email
    if(!regexEmail.test(inputEmail)){
      document.getElementById("emailErrorMsg").textContent="Ecrire un email valide";
      resultat= false; 
    }
    
   return resultat;
  }
}
}
