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

const debug = false;

function getTabs() {
    return [
        {label: i18n.t('tabs.home'), icon: 'pi pi-fw pi-home'},
        {label: i18n.t('tabs.maps'), icon: 'pi pi-fw pi-globe', disabled: "true"},
        {label: i18n.t('tabs.statistics'), icon: 'pi pi-fw pi-pencil', disabled: "true"},
        {label: i18n.t('tabs.info'), icon: 'pi pi-fw pi-info', disabled: "true"},
        {label: i18n.t('tabs.settings'), icon: 'pi pi-fw pi-cog', disabled: "true"}];
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            tabs: getTabs()
        };
        translate.setI18n(i18n);
    }

    componentDidMount() {
        WeatherService.getStations().then(data => this.setState({loading: false, stations: data}));
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
                    <Column footer="TODO" colSpan={20}/>
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

        const weatherIconArray = {
            "Clear": ["wi-day-sunny", "wi-na", "wi-na"],
            "Few clouds": ["wi-day-cloudy", "wi-na", "wi-na"],
            "Variable clouds": ["wi-cloud-refresh", "wi-cloud-refresh", "wi-cloud-refresh"],
            "Cloudy with clear spells": "",
            "Overcast": ["wi-day-sunny-overcast", "wi-cloudy", "wi-night-alt-cloudy"],
            "Light snow shower": ["wi-na", "wi-na", "wi-na"],
            "Moderate snow shower": ["wi-na", "wi-na", "wi-na"],
            "Heavy snow shower": ["wi-na", "wi-na", "wi-na"],
            "Light shower": ["wi-na", "wi-na", "wi-na"],
            "Moderate shower": ["wi-na", "wi-na", "wi-na"],
            "Heavy shower": ["wi-na", "wi-na", "wi-na"],
            "Light rain": ["wi-raindrop", "wi-raindrop", "wi-raindrop"],
            "Moderate rain": ["wi-raindrops", "wi-raindrops", "wi-raindrops"],
            "Heavy rain": ["wi-rain", "wi-rain", "wi-rain"],
            "Glaze": ["wi-na", "wi-na", "wi-na"],
            "Light sleet": ["wi-day-sleet", "wi-sleet", "wi-night-alt-sleet"],
            "Moderate sleet": ["wi-na", "wi-na", "wi-na"],
            "Light snowfall": ["wi-na", "wi-na", "wi-na"],
            "Moderate snowfall": ["wi-na", "wi-na", "wi-na"],
            "Heavy snowfall": ["wi-na", "wi-na", "wi-na"],
            "Blowing snow": ["wi-na", "wi-na", "wi-na"],
            "Drifting snow": ["wi-na", "wi-na", "wi-na"],
            "Hail": ["wi-day-hail", "wi-hail", "wi-night-alt-hail"],
            "Mist": ["wi-day-fog", "wi-fog", "wi-night-fog"],
            "Fog": ["wi-day-fog", "wi-fog", "wi-night-fog"],
            "Thunder": ["wi-day-lightning", "wi-lightning", "wi-night-alt-lightning"],
            "Thunderstorm": ["wi-day-thunderstorm", "wi-thunderstorm", "wi-night-alt-thunderstorm"]
        };
        if (debug) {
            for (const key in weatherIconArray) {
                console.log("key " + key + " DAY: " + weatherIconArray[key][0] + " NEUTRAL: " + weatherIconArray[key][1] + " NIGHT: " + weatherIconArray[key][2]);
            }
        }
        const {t, i18n} = this.props;
        const changeLanguage = (lng) => {
            i18n.changeLanguage(lng);
            this.state.tabs = getTabs();
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
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('translations')(App);