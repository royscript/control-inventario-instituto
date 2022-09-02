//const urlBase = "https://node-server-google.vercel.app/api";
const urlBase = "http://192.168.1.95:3000/api";
async function postData(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    try {
        const response = await fetch(urlBase+url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
            //'Content-type': 'multipart/form-data'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
        console.log("Error en peticion POST : "+error);
        alert("Error en peticion POST : "+error);
    }
        
}
export default postData;