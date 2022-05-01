import axios from "axios";

export function getKey() {
   return '50c934f9';
}

export async function request(parameters) {
    if (typeof parameters === 'object' && parameters !== null) {
        let url = "http://www.omdbapi.com/?apikey=50c934f9&";
        Object.keys(parameters).forEach(key => {
            url += key + "=" + parameters[key];
        });
        try {
            return (await axios.get(url)).data;
        } catch (e) {
            console.error(e);
        }
    }
    return null;
}