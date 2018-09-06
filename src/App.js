import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
import {WeatherService} from './service/WeatherService';
import {Button} from 'primereact/button';

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
        const isLoading = this.state.loading;
        console.log("isloading " + isLoading);
        
        let headerRow = <Row>
            <Column key={'name'} field={'name'} header={'Name'} sortable="true"/>
            <Column key={'longitude'} field={'longitude'} header={'Longitute'} sortable="true"/>
            <Column key={'latitude'} field={'latitude'} header={'Latitude'} sortable="true"/>
            <Column key={'phenomenon'} field={'phenomenon'} header={'Phenomenon'} sortable="true"/>
            <Column key={'visibility'} field={'visibility'} header={'Visibility'} sortable="true"/>
            <Column key={'precipitations'} field={'precipitations'} header={'Precipitations'} sortable="true"/>
            <Column key={'uvIndex'} field={'uvIndex'} header={'UV index'} sortable="true"/>
            <Column key={'wmoCode'} field={'wmoCode'} header={'WMO code'} sortable="true"/>
            <Column key={'airPressure'} field={'airPressure'} header={'Air pressure'} sortable="true"/>
            <Column key={'relativeHumidity'} field={'relativeHumidity'} header={'Relative humidity'} sortable="true"/>
            <Column key={'airTemperature'} field={'airTemperature'} header={'Air temperature'} sortable="true"/>
            <Column key={'waterLevel'} field={'waterLevel'} header={'Water level'} sortable="true"/>
            <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} header={'Water level EH2000'} sortable="true"/>
            <Column key={'waterTemperature'} field={'waterTemperature'} header={'Water temperature'} sortable="true"/>
            <Column key={'windDirection'} field={'windDirection'} header={'Wind direction'} sortable="true"/>
            <Column key={'windSpeed'} field={'windSpeed'} header={'Wind speed'} sortable="true"/>
            <Column key={'windSpeedMax'} field={'windSpeedMax'} header={'Wind speed max'} sortable="true"/>
            <Column key={'windChillC'} field={'windChillC'} header={'Wind chill C'} sortable="true"/>
            <Column key={'windChillF'} field={'windChillF'} header={'Wind chill F'} sortable="true"/>
            <Column key={'windChillMaxC'} field={'windChillMaxC'} header={'Wind chill Max C'} sortable="true"/>
            <Column key={'windChillMaxF'} field={'windChillMaxF'} header={'Wind chill Max F'} sortable="true"/>
        </Row>;

        let headerGroup =
            <ColumnGroup>
                <Row>
                    <Column header="" colSpan={1}/>
                    <Column header="Geo" colSpan={2}/>
                    <Column header="Info" colSpan={5}/>
                    <Column header="Air" colSpan={3}/>
                    <Column header="Water" colSpan={3}/>
                    <Column header="Wind" colSpan={7}/>
                </Row>
                {headerRow}
            </ColumnGroup>;

        let footerGroup =
            <ColumnGroup>
                <Row>
                    <Column footer="Averages:" colSpan={3}/>
                    <Column footer="~TODO1"/>
                    <Column footer="~TODO2..."/>
                </Row>
            </ColumnGroup>;

        let dataTable =
            <DataTable value={this.state.stations} resizableColumns={true} headerColumnGroup={headerGroup} footerColumnGroup={footerGroup}>
                <Column key={'name'} field={'name'} header={'Name'} sortable="true"/>
                <Column key={'longitude'} field={'longitude'} header={'Longitute'} sortable="true"/>
                <Column key={'latitude'} field={'latitude'} header={'Latitude'} sortable="true"/>
                <Column key={'phenomenon'} field={'phenomenon'} header={'Phenomenon'} sortable="true"/>
                <Column key={'visibility'} field={'visibility'} header={'Visibility'} sortable="true"/>
                <Column key={'precipitations'} field={'precipitations'} header={'Precipitations'} sortable="true"/>
                <Column key={'uvIndex'} field={'uvIndex'} header={'UV index'} sortable="true"/>
                <Column key={'wmoCode'} field={'wmoCode'} header={'WMO code'} sortable="true"/>
                <Column key={'airPressure'} field={'airPressure'} header={'Air pressure'} sortable="true"/>
                <Column key={'relativeHumidity'} field={'relativeHumidity'} header={'Relative humidity'} sortable="true"/>
                <Column key={'airTemperature'} field={'airTemperature'} header={'Air temperature'} sortable="true"/>
                <Column key={'waterLevel'} field={'waterLevel'} header={'Water level'} sortable="true"/>
                <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} header={'Water level EH2000'} sortable="true"/>
                <Column key={'waterTemperature'} field={'waterTemperature'} header={'Water temperature'} sortable="true"/>
                <Column key={'windDirection'} field={'windDirection'} header={'Wind direction'} sortable="true"/>
                <Column key={'windSpeed'} field={'windSpeed'} header={'Wind speed'} sortable="true"/>
                <Column key={'windSpeedMax'} field={'windSpeedMax'} header={'Wind speed max'} sortable="true"/>
                <Column key={'windChillC'} field={'windChillC'} header={'Wind chill C'} sortable="true"/>
                <Column key={'windChillF'} field={'windChillF'} header={'Wind chill F'} sortable="true"/>
                <Column key={'windChillMaxC'} field={'windChillMaxC'} header={'Wind chill Max C'} sortable="true"/>
                <Column key={'windChillMaxF'} field={'windChillMaxF'} header={'Wind chill Max F'} sortable="true"/>
            </DataTable>;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome</h1>
                </header>
                <div hidden={isLoading}>
                    <h3>Estonian weather stations weather data:</h3>
                    {dataTable}
                </div>
                <Button label="Do something"/>
            </div>
        );
    }
}

export default App;