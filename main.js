const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://api.escuelajs.co/api/v1';

function fetchData(urlApi, callback){
    let xhttp = new XMLHttpRequest()

    //Initializes a request.
    xhttp.open('GET', urlApi, true);

    xhttp.onreadystatechange = function(event){
        if(xhttp.readyState === 4){
        
            const statusOk = xhttp.status === 200;
            const response = statusOk ? JSON.parse(xhttp.responseText) : null; 
            const error = statusOk ? null : new Error(`Error ${API}`);
            
            callback(response, error)
        }
    }
    
    //Send the request
    xhttp.send()
}

//Get all products
fetchData(`${API}/products`, (products, errProducts) => {
    if(errProducts) return console.error(errProducts);
    //Get the first product
    fetchData(`${API}/products/${products[0]?.id}`, (product, errProduct) => {
        if(errProduct) return console.error(errProduct);
        //Get category the first product
        fetchData(`${API}/categories/${product?.category?.id}`, (category, errCategory) => {
            console.log(products[0])
            console.log(product.title)
            console.log(category.name)
        })
    })
})