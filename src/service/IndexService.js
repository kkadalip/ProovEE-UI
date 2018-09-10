import axios from "axios/index";

export class IndexService {
    static getData() {
        return axios.get('http://localhost:8090/stations')
            .then(res => res.data[0]).catch((err) => {
                console.error(err);
            })
    }
    
    // static getStations() {
    //     return axios.get('http://localhost:8090/stations')
    //         .then(res => res.data[0].stations).catch((err) => {
    //             console.error(err);
    //         })
    // }
}