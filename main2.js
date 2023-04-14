import fetch from 'node-fetch';
const API = 'https://api.escuelajs.co/api/v1';


fetch(`${API}/products`)
    .then(response => response.json())
    .then(products => {
        console.log(products)
        return fetch(`${API}/products/${products[0].id}`);
    })
    .then(response => response.json())
    .then(product => {
        console.log(product.title)
        return fetch(`${API}/categories/${product?.category?.id}`);
    })
    .then(response => response.json())
    .then(category => {
        console.log(category.name)
    })
    .catch(err => console.error(err))