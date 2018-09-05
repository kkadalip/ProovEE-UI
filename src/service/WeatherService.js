import axios from "axios/index";

export class WeatherService {
    static getStations() {
        return axios.get('http://localhost:8090/stations')
            .then(res => res.data[0].stations);
    }
}