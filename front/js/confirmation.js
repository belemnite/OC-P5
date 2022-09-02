 
/*-effectuer une requête POST sur l'API et récupérer l'identifiant de commande dans la réponse de celle-ci
-rediriger l'utilisateur sur la page Confirmation,
en passant l'ID de commande dans l'URL dans le but d'afficher le numéro de commande
-ne pas stocker le numéro de commande
*/
main();
function main(){
    let params= new URLSearchParams(window.location.search)
    const orderId = params.get('oi')
    console.log("orderId");
    document.getElementById("orderId").textContent=orderId;

    
}
//<!-- 65431343444684674 -->


//Tests d'acceptation






