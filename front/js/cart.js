/*

-afficher un message d'erreur si besoin
-constituer un objet contact (à partir des données du formulaire) et un tableau de produits
*/

main();
async function main() {
  let panierTxt = localStorage.getItem("panier") || "[]"; //-stocker les choix de l'utilisateur (localStorage)
  let panier = JSON.parse(panierTxt);
  console.log("panier: ", panier);//-recupérer le panier 
   for(const article of panier){//-parcourir l'array
    await fetch(`http://localhost:3000/api/products/${article.id}`).then((reponse) =>
      reponse.json()
    )
    .then(articleInfo=>{
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
      closest.remove();
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
    })
  });
  //Afficher le nombre total d'articles du panier
  /* let totalQuantity = 0;
    for (let i=0; i<panier.length; i++){
    totalQuantity += panier [i];
    }
    console.log(totalQuantity);

  //Afficher le prix total du panier
    let totalPrice = 0;
    for (let i=0; i<panier.length; i++){
    totalPrice += panier [i];
    }
    console.log(totalPrice);
    
  */


   document.getElementById("order").addEventListener("click", envoyerCommande);//-récupérer et analyser les données saisies par l'utilisateur dans le formulaire
   function envoyerCommande(){
    //verifier la validation du formulaire avec regex
    /*isValid(value){
      let firstName = [^/A-Z//a-z/];//vérification du champ prénom
      document.getElementById("firstNameErrorMsg")

      let lastName = [/A-Z/];//vérification du champ nom de famille
      document.getElementById("lastNameErrorMsg")

      let address= [/a-zA-Z0-9/\,]m;//vérification du champ adresse
      document.getElementById("addressErrorMsg")

      let city = [/0-9{5}/];//vérification du champ code postal
      document.getElementById("cityErrorMsg")

      let email = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;//vérification du champ email
      document.getElementById("emailErrorMsg")

    };*/
    //constituer un tableau contact (firstName, lastName, address, city, email)

    //constituer un objet JSON avec les infos de la commande (contact+panier)
    /*
      if (!formValide()){
    return;
    
  }
  else 
  let contact =
    */
    //faire fetch avec la methode POST
   }
}
