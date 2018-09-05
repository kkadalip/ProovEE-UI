import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        console.log("constructor START");
        super(props);
        this.state = {
            loading: true,
            data: []
        };
        console.log("constructor END");
    }

    loadData() {
        console.log("LOAD DATA START");

        function convertToStation(data) {
            return null; // TODO
        }

        fetch('http://localhost:8090/stations')
            .then(response => response.json())
            .then(data => {
                console.log("data is " + JSON.stringify(data));
                console.log("data 0 is " + JSON.stringify(data[0]));
                let result = data[0].stations.map((s) => {
                    return (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.wmoCode}</td>
                            <td>{s.longitude}</td>
                            <td>{s.latitude}</td>
                            <td>{s.phenomenon}</td>
                            <td>{s.visibility}</td>
                            <td>{s.precipitations}</td>
                            <td>{s.airPressure}</td>
                            <td>{s.relativeHumidity}</td>
                            <td>{s.airTemperature}</td>
                            <td>{s.windDirection}</td>
                            <td>{s.windSpeed}</td>
                            <td>{s.windSpeedMax}</td>
                            <td>{s.waterLevel}</td>
                            <td>{s.waterLevelEh2000}</td>
                            <td>{s.waterTemperature}</td>
                            <td>{s.uvIndex}</td>
                            <td>{s.windChillC}</td>
                            <td>{s.windChillF}</td>
                            <td>{s.windChillMaxC}</td>
                            <td>{s.windChillMaxF}</td>
                        </tr>
                    )
                });
                this.setState({
                    loading: false,
                    data: result
                });
            });
        console.log("LOAD DATA END");
    }

    componentDidMount() {
        console.log("componentDidMount START");
        this.loadData();
        console.log("componentDidMount END ");
    }

    render() {
        console.log("RENDER START"); // + this.state.stations
        console.log("state is: " + JSON.stringify(this.state));
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome</h1>
                </header>
                <p className="App-intro">
                    Weather stations:
                </p>
                <table border="1">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>WMO code</td>
                        <td>Longitute</td>
                        <td>Latitude</td>
                        <td>Phenomenon</td>
                        <td>Visibility</td>
                        <td>Precipitations</td>
                        <td>Air pressure</td>
                        <td>Relative humidity</td>
                        <td>Air temperature</td>
                        <td>Wind direction</td>
                        <td>Wind speed</td>
                        <td>Wind speed max</td>
                        <td>Water level</td>
                        <td>Water level EH2000</td>
                        <td>Water temperature</td>
                        <td>UV index</td>
                        <td>Wind chill C</td>
                        <td>Wind chill F</td>
                        <td>Wind chill Max C</td>
                        <td>Wind chill Max F</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;