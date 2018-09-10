import React, {Component} from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
import {IndexService} from './service/IndexService';
import {ProgressSpinner} from 'primereact/progressspinner';
import {SelectButton} from 'primereact/selectbutton';
import {TabMenu} from 'primereact/tabmenu';
import {translate} from 'react-i18next';
import i18n from './translations/i18n';
import {Table} from 'reactstrap';
import 'react-icons-weather/lib/css/weather-icons.css';

const debug = true;

function getTabs() {
    return [
        {label: i18n.t('tabs.home'), icon: 'pi pi-fw pi-home'},
        {label: i18n.t('tabs.maps'), icon: 'pi pi-fw pi-globe', disabled: "true"},
        {label: i18n.t('tabs.statistics'), icon: 'pi pi-fw pi-pencil', disabled: "true"},
        {label: i18n.t('tabs.info'), icon: 'pi pi-fw pi-info', disabled: "true"},
        {label: i18n.t('tabs.settings'), icon: 'pi pi-fw pi-cog', disabled: "true"}];
}

function getStations(value) {
    if (value === undefined) {
        return [];
    }
    return value.stations;
}

function getStatistics(value) {
    if (value === undefined) {
        return [];
    }
    //console.log("getStatistics value is: " + JSON.stringify(value));
    console.log("getStatistics result " + JSON.stringify(value['statistics']));
    return value['statistics']; // value.statistics;
}

function getStatisticsVisibility(value) {
    if (value === undefined) {
        return [];
    }
    return value['statistics']['visibility'];
}

function getStatisticsAirPressure(value) {
    if (value === undefined) {
        return [];
    }
    console.log("getStatisticsAirPressure result " + JSON.stringify(value['statistics']['airPressure']));
    // this.state.airPressure = value['statistics']['airPressure'];
    //this.state.airPressure = value['statistics']['airPressure'];


}

// function getStatisticsFromState() {
//     if (this === undefined || this.state === undefined || this.state.statistics === undefined) {
//         return [];
//     }
//     console.log("getStatisticsFromState " + JSON.stringify(this.state.statistics));
//     console.log("getStatisticsFromState2 " + this.state['statistics']);
//     //return this.state.statistics;
//     return this.state['statistics'];
// }
// function getStatisticsVisibilityMin() {
//     if (this === undefined || this.state === undefined || this.state.statistics === undefined || this.state.statistics) {
//         return [];
//     }
//     console.log("getStatisticsFromState " + JSON.stringify(this.state.statistics));
//     console.log("getStatisticsFromState2 " + this.state['statistics']);
//     //return this.state.statistics;
//     return this.state.statistics['visibility']['min'];
// }

class App extends Component {
    constructor(props) {
        super(props);

        const lng = localStorage.getItem('SelectedLanguage') || 'en';
        i18n.changeLanguage(lng);

        console.log("i18n language is " + i18n.language);
        this.state = {
            loading: true,
            stations: [],
            statistics: {
                visibility: {},
                uvIndex: {},
                airPressure: {},
                humidity: {},
                airTemperature: {},
                windDirection: {},
                windSpeed: {},
                waterLevel: {},
                waterLevelEH2000: {},
                waterTemperature: {},
                windSpeedMax: {},
                windChillC: {},
                windChillMaxC: {},
                windChillF: {},
                windChillMaxF: {}
            },
            visibility: [],
            airPressure: [],
            tabs: getTabs()
        };
        translate.setI18n(i18n);
    }

    componentDidMount() {
        console.log("component did mount!");
        IndexService.getData().then(data => this.setState({
            loading: false,
            stations: getStations(data),
            statistics: getStatistics(data), // getStatistics(data)
            visibility: getStatisticsVisibility(data)
        })).then(data => getStatisticsAirPressure(data));

    }

    render() {
        if (debug) console.log("State is: " + JSON.stringify(this.state));
        const isLoading = this.state.loading;
        let headerRow = <Row>
            <Column key={'name'} field={'name'} header={'Name'} sortable="true"/>
            <Column key={'longitude'} field={'longitude'} header={'Longitute'} sortable="true"/>
            <Column key={'latitude'} field={'latitude'} header={'Latitude'} sortable="true"/>
            <Column key={'phenomenon'} field={'phenomenon'} header={'Phenomenon'} sortable="true"/>
            <Column key={'visibility'} field={'visibility'} header={'Visibility (km)'} sortable="true"/>
            <Column key={'precipitations'} field={'precipitations'} header={'Precipitations'} sortable="true"/>
            <Column key={'uvIndex'} field={'uvIndex'} header={'UV index'} sortable="true"/>
            <Column key={'wmoCode'} field={'wmoCode'} header={'WMO code'} sortable="true"/>
            <Column key={'airPressure'} field={'airPressure'} header={'Pressure (hPa)'} sortable="true"/>
            <Column key={'relativeHumidity'} field={'relativeHumidity'} header={'Relative humidity (%)'} sortable="true"/>
            <Column key={'airTemperature'} field={'airTemperature'} header={'Temperature (°C)'} sortable="true"/>
            <Column key={'waterLevel'} field={'waterLevel'} header={'Level (cm)'} sortable="true"/>
            <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} header={'Level EH2000 (cm)'} sortable="true"/>
            <Column key={'waterTemperature'} field={'waterTemperature'} header={'Temp (°C)'} sortable="true"/>
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
                    <Column footer="Averages:" colSpan={1}/>
                    <Column footer="" colSpan={2}/>
                    <Column footer="" colSpan={2}/>
                    <Column footer="" colSpan={16}/>
                </Row>
            </ColumnGroup>;

        let dataTable =
            <DataTable value={this.state.stations} resizableColumns={true} headerColumnGroup={headerGroup} footerColumnGroup={footerGroup}
                       scrollable={true} scrollHeight="400px" emptyMessage={"No data found, try again later."}>
                <Column key={'name'} field={'name'}/>
                <Column key={'longitude'} field={'longitude'}/>
                <Column key={'latitude'} field={'latitude'}/>
                <Column key={'phenomenon'} field={'phenomenon'}/>
                <Column key={'visibility'} field={'visibility'}/>
                <Column key={'precipitations'} field={'precipitations'}/>
                <Column key={'uvIndex'} field={'uvIndex'}/>
                <Column key={'wmoCode'} field={'wmoCode'}/>
                <Column key={'airPressure'} field={'airPressure'}/>
                <Column key={'relativeHumidity'} field={'relativeHumidity'}/>
                <Column key={'airTemperature'} field={'airTemperature'} style={{fontWeight: "bold"}}/>
                <Column key={'waterLevel'} field={'waterLevel'}/>
                <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'}/>
                <Column key={'waterTemperature'} field={'waterTemperature'}/>
                <Column key={'windDirection'} field={'windDirection'}/>
                <Column key={'windSpeed'} field={'windSpeed'} style={{fontWeight: "bold"}}/>
                <Column key={'windSpeedMax'} field={'windSpeedMax'}/>
                <Column key={'windChillC'} field={'windChillC'} style={{fontWeight: "bold"}}/>
                <Column key={'windChillF'} field={'windChillF'}/>
                <Column key={'windChillMaxC'} field={'windChillMaxC'}/>
                <Column key={'windChillMaxF'} field={'windChillMaxF'}/>
            </DataTable>;

        function getWeatherIconArrayValue(value) {
            if (value !== undefined && weatherIconArray[value] !== undefined) {
                return weatherIconArray[value].day;
            }
        }

        const weatherIconArray = {
            "Clear": {day: "wi-day-sunny", neutral: "wi-na", night: "wi-na"},
            "Few clouds": {day: "wi-day-cloudy", neutral: "wi-na", night: "wi-na"},
            "Variable clouds": {day: "wi-cloud-refresh", neutral: "wi-cloud-refresh", night: "wi-cloud-refresh"},
            "Cloudy with clear spells": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Overcast": {day: "wi-day-sunny-overcast", neutral: "wi-cloudy", night: "wi-night-alt-cloudy"},
            "Light snow shower": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Moderate snow shower": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Heavy snow shower": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Light shower": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Moderate shower": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Heavy shower": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Light rain": {day: "wi-raindrop", neutral: "wi-raindrop", night: "wi-raindrop"},
            "Moderate rain": {day: "wi-raindrops", neutral: "wi-raindrops", night: "wi-raindrops"},
            "Heavy rain": {day: "wi-rain", neutral: "wi-rain", night: "wi-rain"},
            "Glaze": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Light sleet": {day: "wi-day-sleet", neutral: "wi-sleet", night: "wi-night-alt-sleet"},
            "Moderate sleet": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Light snowfall": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Moderate snowfall": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Heavy snowfall": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Blowing snow": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Drifting snow": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
            "Hail": {day: "wi-day-hail", neutral: "wi-hail", night: "wi-night-alt-hail"},
            "Mist": {day: "wi-day-fog", neutral: "wi-fog", night: "wi-night-fog"},
            "Fog": {day: "wi-day-fog", neutral: "wi-fog", night: "wi-night-fog"},
            "Thunder": {day: "wi-day-lightning", neutral: "wi-lightning", night: "wi-night-alt-lightning"},
            "Thunderstorm": {day: "wi-day-thunderstorm", neutral: "wi-thunderstorm", night: "wi-night-alt-thunderstorm"}
        };
        // if (debug) {
        //     for (const key in weatherIconArray) {
        //         console.log("key " + key + " DAY: " + weatherIconArray[key][0] + " NEUTRAL: " + weatherIconArray[key][1] + " NIGHT: " + weatherIconArray[key][2]);
        //     }
        // }
        const {t, i18n} = this.props;
        const changeLanguage = (lng) => {
            i18n.changeLanguage(lng);
            this.setState({tabs: getTabs()});
            localStorage.setItem('SelectedLanguage', lng);
        };
        const langSelectItems = [
            {label: 'English', value: 'en'},
            {label: 'Eesti', value: 'et'}
        ];
        let stats = this.state.statistics;
        let visibility = stats['visibility'];
        let uvIndex = stats['uvIndex'];
        let airPressure = stats['airPressure'];
        let humidity = stats['humidity'];
        let airTemp = stats['airTemperature'];
        let windDir = stats['windDirection'];
        let windSpeed = stats['windSpeed'];
        let windSpeedMax = stats['windSpeedMax'];
        let waterLevel = stats['waterLevel'];
        let waterLevelEH2000 = stats['waterLevelEH2000'];
        let waterTemp = stats['waterTemperature'];
        let windChillC = stats['windChillC'];
        let windChillF = stats['windChillF'];
        let windChillMaxC = stats['windChillMaxC'];
        let windChillMaxF = stats['windChillMaxF'];

        function getMin(obj) {
            if (obj !== undefined) {
                return obj.min;
            }
        }

        function getMax(obj) {
            if (obj !== undefined) {
                return obj.max;
            }
        }

        function getAvg(obj) {
            if (obj !== undefined) {
                return obj.average;
            }
        }

        function getCount(obj) {
            if (obj !== undefined) {
                return obj.count;
            }
        }

        return (
            <div className="App">
                <SelectButton value={i18n.language} options={langSelectItems} onChange={(e) => changeLanguage(e.value)} style={{float: "right"}}/>
                <div id="floating-box-main" className="floating-box">
                    <TabMenu id={"navigation-tabs"} model={this.state.tabs} activeItem={this.state.activeItem}
                             onTabChange={(e) => this.setState({activeItem: e.value})}/>
                    <div className={"title-and-main"}>
                        <header>
                            <p className="unselectable title-big">{t('title.main')}</p>
                        </header>
                        <div hidden={!isLoading}>
                            <ProgressSpinner/>
                        </div>
                        <div hidden={isLoading}>
                            {dataTable}
                        </div>

                        <br/>
                        <h2>Units:</h2>
                        <h2>Average values:</h2>
                        <table>
                            <tbody>

                            </tbody>
                        </table>
                        <table>
                            <thead>
                            <tr>
                                <td>UNIT</td>
                                <td>{t('station.full.visibility')}</td>
                                <td>{t('station.full.uvIndex')}</td>
                                <td>{t('station.full.airPressure')}</td>
                                <td>{t('station.full.relativeHumidity')}</td>
                                <td>{t('station.full.airTemperature')}</td>
                                <td>{t('station.full.windDirection')}</td>
                                <td>{t('station.full.windSpeed')}</td>
                                <td>{t('station.full.windSpeedMax')}</td>
                                <td>{t('station.full.waterLevel')}</td>
                                <td>{t('station.full.waterLevelEh2000')}</td>
                                <td>{t('station.full.waterTemperature')}</td>
                                <td>{t('station.full.windChillC')}</td>
                                <td>{t('station.full.windChillF')}</td>
                                <td>{t('station.full.windChillMaxC')}</td>
                                <td>{t('station.full.windChillMaxF')}</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>MIN</td>
                                <td>{getMin(visibility)}</td>
                                <td>{getMin(uvIndex)}</td>
                                <td>{getMin(airPressure)}</td>
                                <td>{getMin(humidity)}</td>
                                <td>{getMin(airTemp)}</td>
                                <td>{getMin(windDir)}</td>
                                <td>{getMin(windSpeed)}</td>
                                <td>{getMin(windSpeedMax)}</td>
                                <td>{getMin(waterLevel)}</td>
                                <td>{getMin(waterLevelEH2000)}</td>
                                <td>{getMin(waterTemp)}</td>
                                <td>{getMin(windChillC)}</td>
                                <td>{getMin(windChillF)}</td>
                                <td>{getMin(windChillMaxC)}</td>
                                <td>{getMin(windChillMaxF)}</td>
                            </tr>
                            <tr>
                                <td>MAX</td>
                                <td>{getMax(visibility)}</td>
                                <td>{getMax(uvIndex)}</td>
                                <td>{getMax(airPressure)}</td>
                                <td>{getMax(humidity)}</td>
                                <td>{getMax(airTemp)}</td>
                                <td>{getMax(windDir)}</td>
                                <td>{getMax(windSpeed)}</td>
                                <td>{getMax(windSpeedMax)}</td>
                                <td>{getMax(waterLevel)}</td>
                                <td>{getMax(waterLevelEH2000)}</td>
                                <td>{getMax(waterTemp)}</td>
                                <td>{getMax(windChillC)}</td>
                                <td>{getMax(windChillF)}</td>
                                <td>{getMax(windChillMaxC)}</td>
                                <td>{getMax(windChillMaxF)}</td>
                            </tr>
                            <tr>
                                <td>AVERAGE</td>
                                <td>{getAvg(visibility)}</td>
                                <td>{getAvg(uvIndex)}</td>
                                <td>{getAvg(airPressure)}</td>
                                <td>{getAvg(humidity)}</td>
                                <td>{getAvg(airTemp)}</td>
                                <td>{getAvg(windDir)}</td>
                                <td>{getAvg(windSpeed)}</td>
                                <td>{getAvg(windSpeedMax)}</td>
                                <td>{getAvg(waterLevel)}</td>
                                <td>{getAvg(waterLevelEH2000)}</td>
                                <td>{getAvg(waterTemp)}</td>
                                <td>{getAvg(windChillC)}</td>
                                <td>{getAvg(windChillF)}</td>
                                <td>{getAvg(windChillMaxC)}</td>
                                <td>{getAvg(windChillMaxF)}</td>
                            </tr>
                            <tr>
                                <td>COUNT</td>
                                <td>{getCount(visibility)}</td>
                                <td>{getCount(uvIndex)}</td>
                                <td>{getCount(airPressure)}</td>
                                <td>{getCount(humidity)}</td>
                                <td>{getCount(airTemp)}</td>
                                <td>{getCount(windDir)}</td>
                                <td>{getCount(windSpeed)}</td>
                                <td>{getCount(windSpeedMax)}</td>
                                <td>{getCount(waterLevel)}</td>
                                <td>{getCount(waterLevelEH2000)}</td>
                                <td>{getCount(waterTemp)}</td>
                                <td>{getCount(windChillC)}</td>
                                <td>{getCount(windChillF)}</td>
                                <td>{getCount(windChillMaxC)}</td>
                                <td>{getCount(windChillMaxF)}</td>
                            </tr>
                            </tbody>
                        </table>
                        <br/>
                        <h1>ReactStrap:</h1>
                        <div>
                            <Table style={{padding: "20px"}}>
                                <thead style={{fontWeight: "bolder"}}>
                                <tr>
                                    <td>{t('station.full.name')}</td>
                                    <td>{t('station.full.longitude')}</td>
                                    <td>{t('station.full.latitude')}</td>
                                    <td>{t('station.full.phenomenon')}</td>
                                    <td>{t('station.full.visibility')}</td>
                                    <td>{t('station.full.precipitations')}</td>
                                    <td>{t('station.full.uvIndex')}</td>
                                    <td>{t('station.full.wmoCode')}</td>
                                    <td>{t('station.full.airPressure')}</td>
                                    <td>{t('station.full.relativeHumidity')}</td>
                                    <td>{t('station.full.airTemperature')}</td>
                                    <td>{t('station.full.waterLevel')}</td>
                                    <td>{t('station.full.waterLevelEh2000')}</td>
                                    <td>{t('station.full.waterTemperature')}</td>
                                    <td>{t('station.full.windDirection')}</td>
                                    <td>{t('station.full.windSpeed')}</td>
                                    <td>{t('station.full.windSpeedMax')}</td>
                                    <td>{t('station.full.windChillC')}</td>
                                    <td>{t('station.full.windChillF')}</td>
                                    <td>{t('station.full.windChillMaxC')}</td>
                                    <td>{t('station.full.windChillMaxF')}</td>
                                </tr>

                                </thead>
                                <tbody>
                                {this.state.stations.map(function (item, key) {
                                    return (
                                        <tr key={key}>
                                            <td style={{textAlign: "left"}}>{item.name}</td>
                                            <td>{item.longitude}</td>
                                            <td>{item.latitude}</td>
                                            <td>
                                                <div style={{textAlign: "left"}}>
                                                    <div className="icon-wrap" style={{display: "inline-block"}}>
                                                        <i className={"wi " + getWeatherIconArrayValue(item.phenomenon)}/>
                                                    </div>
                                                    <div style={{display: "inline-block"}}>
                                                        {item.phenomenon}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.visibility}</td>
                                            <td>{item.precipitations}</td>
                                            <td>{item.uvIndex}</td>
                                            <td>{item.wmoCode}</td>
                                            <td>{item.airPressure}</td>
                                            <td>{item.relativeHumidity}</td>
                                            <td>{item.airTemperature}</td>
                                            <td>{item.waterLevel}</td>
                                            <td>{item.waterLevelEh2000}</td>
                                            <td>{item.waterTemperature}</td>
                                            <td>{item.windDirection}</td>
                                            <td>{item.windSpeed}</td>
                                            <td>{item.windSpeedMax}</td>
                                            <td>{item.windChillC}</td>
                                            <td>{item.windChillF}</td>
                                            <td>{item.windChillMaxC}</td>
                                            <td>{item.windChillMaxF}</td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td>
                                        <b>AVERAGES</b>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('translations')(App);