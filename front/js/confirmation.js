 

main();
function main(){
    let params= new URLSearchParams(window.location.search)//passer l'ID de commande dans l'URL
    const orderId = params.get('oi')
    console.log("orderId");
    document.getElementById("orderId").textContent=orderId;//afficher le numéro de commande<!-- 65431343444684674 -->

    
}










