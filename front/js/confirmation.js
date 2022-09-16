 

main();
function main(){
    let params= new URLSearchParams(window.location.search)//récupérer l'ID de commande dans l'URL
    const orderId = params.get('oi')
    document.getElementById("orderId").textContent=orderId;//afficher le numéro de commande<!-- 65431343444684674 -->

    
}










