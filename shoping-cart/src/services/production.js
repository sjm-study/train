import axios from 'axios'

export default function getData() {
    // return axios.get('./data/products.json')
    return axios.get('products.json')
}