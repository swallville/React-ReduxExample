import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  renderWeather(cityData){
    const weat = cityData.list.map((data) => data.weather.map((rain) => rain.description));
    const merged = [].concat.apply([], weat);
    const temps = cityData.list.map((weather) => [(weather.dt * 1000),
      parseFloat((weather.main.temp - 273.15).toFixed(2))]);
    const press = cityData.list.map((weather) => [(weather.dt * 1000),
      parseFloat(weather.main.pressure)]);
    const humi = cityData.list.map((weather) => [(weather.dt * 1000),
      parseFloat(weather.main.humidity)]);
    console.log(merged);

    const config_temp = {
      colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
             '#FF9655', '#FFF263', '#6AF9C4'],
      isPureConfig: true,
      chart: {
        zoomType: 'x',
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(240, 240, 255)']
                ]
        },
        renderTo: 'container',
        borderWidth: 2,
        plotBackgroundColor: 'rgba(255, 255, 255, .9)',
        plotShadow: true,
        plotBorderWidth: 1
      },
      rangeSelector: {
        selected: 1
      },
      title: {
        style: {
            color: '#000',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        },
        text: `${cityData.city.name}'s Temperature`
      },
      series: [{
        name: 'Temperature (°C)',
        data: temps,
        tooltip: {
          crosshairs: true,
          shared: true,
          valueDecimals: 2
        }
      }],
      subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },

      legend: {
          itemStyle: {
              font: '9pt Trebuchet MS, Verdana, sans-serif',
              color: 'black'
          },
          itemHoverStyle:{
              color: 'gray'
          }
      },
      subtitle: {
          text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      yAxis: {
          title: {
              text: 'Temperature (°C)'
          },
          labels: {
            formatter: function () {
                return this.value + '°';
            }
          }
      }
    };

    const config_press = {
      colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
             '#FF9655', '#FFF263', '#6AF9C4'],
      isPureConfig: true,
      chart: {
        zoomType: 'x',
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(240, 240, 255)']
                ]
        },
        renderTo: 'container',
        borderWidth: 2,
        plotBackgroundColor: 'rgba(255, 255, 255, .9)',
        plotShadow: true,
        plotBorderWidth: 1
      },
      rangeSelector: {
        selected: 1
      },
      title: {
        style: {
            color: '#000',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        },
        text: `${cityData.city.name}'s Pressure`
      },
      series: [{
        name: 'Pressure (hPa)',
        data: press,
        tooltip: {
          crosshairs: true,
          shared: true,
          valueDecimals: 2
        }
      }],
      subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },

    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: 'gray'
        }
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    yAxis: {
        title: {
            text: 'Pressure (hPa)'
        },
        labels: {
          formatter: function () {
              return this.value + 'hPa';
          }
        }
    }
    };

    const config_humi = {
      colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
             '#FF9655', '#FFF263', '#6AF9C4'],
      isPureConfig: true,
      chart: {
        zoomType: 'x',
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(240, 240, 255)']
                ]
        },
        renderTo: 'container',
        borderWidth: 2,
        plotBackgroundColor: 'rgba(255, 255, 255, .9)',
        plotShadow: true,
        plotBorderWidth: 1
      },
      rangeSelector: {
        selected: 1
      },
      title: {
        style: {
            color: '#000',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        },
        text: `${cityData.city.name}'s Humidity`
      },
      series: [{
        name: 'Humidity(%)',
        data: humi,
        tooltip: {
          crosshairs: true,
          shared: true,
          valueDecimals: 2
        }
      }],
      subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },

    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: 'gray'
        }
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    yAxis: {
        title: {
            text: 'Humidity (%)'
        },
        labels: {
          formatter: function () {
              return this.value + '%';
          }
        }
    },
  };

    return (
      <tr key={cityData.city.id}>
        <td width={150} height={120}>
          <GoogleMap data={cityData.city.coord} />
        </td>
        <td width={180} height={120}>
          <Chart config={config_temp} />
        </td>
        <td width={180} height={120}>
          <Chart config={config_press} />
        </td>
        <td width={180} height={120}>
          <Chart config={config_humi} />
        </td>
      </tr>
    );
  }

  render (){
    return(
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-sm table-hover table-condensed">
          <thead className="thead-default">
            <tr>
              <th>City</th>
              <th>Temperature (°C)</th>
              <th>Pressure (hPa)</th>
              <th>Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.weather.map(this.renderWeather)}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStatetoProps( { weather } ) {
  return { weather };
}

export default connect(mapStatetoProps)(WeatherList);
