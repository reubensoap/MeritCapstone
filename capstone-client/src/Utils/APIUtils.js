const BASE_URL = 'http://localhost:8080';
const ACCESS_TOKEN = 'accessToken';
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};
    export function getCdOfferings() {
        return request({
            url: 'http://localhost:8080/CDOfferings',
            method: 'GET'
        });
    }

