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
            <Column key={'airPressure'} field={'airPressure'} header={'Pressure'} sortable="true"/>
            <Column key={'relativeHumidity'} field={'relativeHumidity'} header={'Relative humidity'} sortable="true"/>
            <Column key={'airTemperature'} field={'airTemperature'} header={'Temperature'} sortable="true"/>
            <Column key={'waterLevel'} field={'waterLevel'} header={'Level'} sortable="true"/>
            <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} header={'Level EH2000'} sortable="true"/>
            <Column key={'waterTemperature'} field={'waterTemperature'} header={'Temp (C)'} sortable="true"/>
            <Column key={'windDirection'} field={'windDirection'} header={'Direction'} sortable="true"/>
            <Column key={'windSpeed'} field={'windSpeed'} header={'Speed (m/s)'} sortable="true"/>
            <Column key={'windSpeedMax'} field={'windSpeedMax'} header={'Speed max'} sortable="true"/>
            <Column key={'windChillC'} field={'windChillC'} header={'Chill (C)'} sortable="true"/>
            <Column key={'windChillF'} field={'windChillF'} header={'Chill (F)'} sortable="true"/>
            <Column key={'windChillMaxC'} field={'windChillMaxC'} header={'Chill Max (C)'} sortable="true"/>
            <Column key={'windChillMaxF'} field={'windChillMaxF'} header={'Chill Max (F)'} sortable="true"/>
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
                <Column key={'name'} field={'name'} header={'Name'} />
                <Column key={'longitude'} field={'longitude'} />
                <Column key={'latitude'} field={'latitude'} />
                <Column key={'phenomenon'} field={'phenomenon'} />
                <Column key={'visibility'} field={'visibility'} />
                <Column key={'precipitations'} field={'precipitations'} />
                <Column key={'uvIndex'} field={'uvIndex'} />
                <Column key={'wmoCode'} field={'wmoCode'} />
                <Column key={'airPressure'} field={'airPressure'} />
                <Column key={'relativeHumidity'} field={'relativeHumidity'} />
                <Column key={'airTemperature'} field={'airTemperature'} style={{fontWeight: "bold"}}/>
                <Column key={'waterLevel'} field={'waterLevel'} />
                <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} />
                <Column key={'waterTemperature'} field={'waterTemperature'} />
                <Column key={'windDirection'} field={'windDirection'} />
                <Column key={'windSpeed'} field={'windSpeed'} style={{fontWeight: "bold"}}/>
                <Column key={'windSpeedMax'} field={'windSpeedMax'} />
                <Column key={'windChillC'} field={'windChillC'} style={{fontWeight: "bold"}}/>
                <Column key={'windChillF'} field={'windChillF'} />
                <Column key={'windChillMaxC'} field={'windChillMaxC'} />
                <Column key={'windChillMaxF'} field={'windChillMaxF'} />
            </DataTable>;

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Estonian weather stations</h1>
                </header>
                <div hidden={isLoading}>
                    {dataTable}
                </div>
                <Button label="Do something"/>
            </div>
        );
    }
}

export default App;