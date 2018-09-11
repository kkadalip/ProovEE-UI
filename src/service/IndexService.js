import axios from "axios/index";

const debug = false;

export class IndexService {
    static getData() {
        return axios.get('http://localhost:8090/stations')
            .then(res => res.data[res.data.length - 1]).catch((err) => {
                if (debug) {
                    console.error(err)
                }
                console.log("Could not fetch data");
            })
    };

    static convertTimestampToDate(unix_timestamp) {
        const date = new Date(unix_timestamp * 1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2); // <- Will display time in 10:30:23 format
    }
}