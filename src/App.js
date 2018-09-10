import React, {Component} from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
import {WeatherService} from './service/WeatherService';
import {ProgressSpinner} from 'primereact/progressspinner';
import {SelectButton} from 'primereact/selectbutton';
import {TabMenu} from 'primereact/tabmenu';
import {translate} from 'react-i18next';
import i18n from './translations/i18n';
import {Table} from 'reactstrap';

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
    return value.statistics;
}

function getStatisticsFromState() {
    if (this === undefined || this.state === undefined || this.state.statistics === undefined) {
        return [];
    }
    console.log("LALALA " + JSON.stringify(this.state.statistics));
    return this.state.statistics;
}

class App extends Component {
    constructor(props) {
        super(props);

        const lng = localStorage.getItem('SelectedLanguage') || 'en';
        i18n.changeLanguage(lng);

        console.log("i18n language is " + i18n.language);
        this.state = {
            loading: true,
            stations: [],
            statistics: [],
            tabs: getTabs()
        };
        translate.setI18n(i18n);
    }

    componentDidMount() {
        WeatherService.getData().then(data => this.setState({loading: false, stations: getStations(data), statistics: getStatistics(data)}));
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
        if (debug) {
            for (const key in weatherIconArray) {
                console.log("key " + key + " DAY: " + weatherIconArray[key][0] + " NEUTRAL: " + weatherIconArray[key][1] + " NIGHT: " + weatherIconArray[key][2]);
            }
        }
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
                        <h2>Average values:</h2>
                        <table>
                            <thead>
                            <tr>
                                <td>Visibility</td>
                                <td>Air pressure</td>
                                <td>Humidity</td>
                                <td>Air temperature</td>
                                <td>Wind direction</td>
                                <td>Wind speed</td>
                                <td>Water level</td>
                                <td>Wind chill (C)</td>
                                <td>Wind chill max (C)</td>
                                <td>Wind chill (F)</td>
                                <td>Wind chill max (F)</td>
                            </tr>
                            </thead>
                            <tbody>
                            {getStatisticsFromState().map(function (item, key) {
                                return (
                                    <tr key={key}>
                                        <td>{key} {item}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <br/>
                        <h1>ReactStrap:</h1>
                        <div>
                            <Table>
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
                                            <td>{item.name}</td>
                                            <td>{item.longitude}</td>
                                            <td>{item.latitude}</td>
                                            <td>
                                                <div>
                                                    <i className={"pi " + getWeatherIconArrayValue(item.phenomenon) + "::before"}></i>{item.phenomenon}
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
                                        TODO
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <i className="pi pi-globe"></i>
                            <i className="pi pi-globe" style={{fontSize: "3em", display: "inline", float: "right"}}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('translations')(App);