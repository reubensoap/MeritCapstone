export const BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';
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

    export function signup(signupRequest) {
        return request({
            url: BASE_URL + "/signup",
            method: 'POST',
            body: JSON.stringify(signupRequest)
        });
    }

    export function login(loginRequest) {
        return request({
            url: BASE_URL + "/login",
            method: 'POST',
            body: JSON.stringify(loginRequest)
        });
    }

    export function getCurrentUser() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }
    
        return request({
            url: BASE_URL + "/AccountHolder",
            method: 'GET'
        });
    }

    export function createAccountHolder(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/CreateAccount",
            method: 'POST',
            body: JSON.stringify(values)
        });
    }

    export function createSavingsAccount(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/SavingsAccount",
            method: 'POST',
            body: JSON.stringify(values)
        });
    }

    export function createCheckingAccount(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/CheckingAccount",
            method: 'POST',
            body: JSON.stringify(values)
        });
    }

    export function createCDAccount(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/CDAccount",
            method: 'POST',
            body: JSON.stringify(values)
        });
    }

    export function createDBAccount(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/DBAccount",
            method: 'POST',
            body: JSON.stringify(values)
        });
    }

    export function createRegIRA(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/RegularIRA",
            method: 'POST',
            body: JSON.stringify(values)
        });
    }

    export function createRollIRA(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/RolloverIRA",
            method: 'POST',
            body: JSON.stringify(values)
        });
    }

    export function createRothIRA(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/RothIRA",
            method: 'POST',
            body: JSON.stringify(values)
        });
    }

    export function deleteChecking() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/Delete/CheckingAccount",
            method: 'POST'
        });
    }

    export function deleteCD(value) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/Delete/CDAccount/" + value,
            method: 'POST',
        });
    }

    export function deleteDB(value) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/Delete/DBAccount/" + value,
            method: 'POST',
        });
    }

    export function deleteReg() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/Delete/RegularIRA",
            method: 'POST',
        });
    }

    export function deleteRoll() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/Delete/RolloverIRA",
            method: 'POST',
        });
    }

    export function deleteRoth() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/Delete/RothIRA",
            method: 'POST',
        });
    }

    export function deposit(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/Deposit/" + values.type + "/" + values.to + "/" + values.amount,
            method: 'POST',
        });
    }

    export function withdraw(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/Withdraw/" + values.type + "/" + values.to + "/" + values.amount,
            method: 'POST',
        });
    }

    export function transfer(values) {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: BASE_URL + "/Transfer/" + values.type + "/" + values.from + "/" + values.to + "/" + values.amount,
            method: 'POST',
        });
    }



