import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
//import {ColumnGroup} from 'primereact/columngroup';
import {WeatherService} from './service/WeatherService';

import {Button} from 'primereact/button';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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

    componentDidMount() {
        console.log("componentDidMount START");
        WeatherService.getStations().then(data => this.setState({loading: false, stations: data}));
        console.log("componentDidMount END ");
    }

    render() {
        console.log("RENDER START");
        //console.log("State is: " + JSON.stringify(this.state));
        let cols = [
            {field: 'id', header: 'ID'},
            {field: 'name', header: 'Name'},
            {field: 'wmoCode', header: 'WMO code'},
            {field: 'longitude', header: 'Longitute'},
            {field: 'latitude', header: 'Latitude'},
            {field: 'phenomenon', header: 'Phenomenon'},
            {field: 'visibility', header: 'Visibility'},
            {field: 'precipitations', header: 'Precipitations'},
            {field: 'airPressure', header: 'Air pressure'},
            {field: 'relativeHumidity', header: 'Relative humidity'},
            {field: 'airTemperature', header: 'Air temperature'},
            {field: 'windDirection', header: 'Wind direction'},
            {field: 'windSpeed', header: 'Wind speed'},
            {field: 'windSpeedMax', header: 'Wind speed max'},
            {field: 'waterLevel', header: 'Water level'},
            {field: 'waterLevelEh2000', header: 'Water level EH2000'},
            {field: 'waterTemperature', header: 'Water temperature'},
            {field: 'uvIndex', header: 'UV index'},
            {field: 'windChillC', header: 'Wind chill C'},
            {field: 'windChillF', header: 'Wind chill F'},
            {field: 'windChillMaxC', header: 'Wind chill Max C'},
            {field: 'windChillMaxF', header: 'Wind chill Max F'}
        ];
        let dynamicColumns = cols.map((col, i) => {
            return <Column key={col.field} field={col.field} header={col.header} sortable="true"/>;
        });
        const isLoading = this.state.loading;
        console.log("isloading " + isLoading);

        const header = "Example header";
        const footer = "Example footer";

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome</h1>
                </header>
                <div hidden={isLoading}>
                    <h3>Dynamic Columns</h3>
                    <DataTable value={this.state.stations} header={header} footer={footer}>
                        {dynamicColumns}
                    </DataTable>
                </div>
                <Button label="Do something"/>
            </div>
        );
    }
}

export default App;