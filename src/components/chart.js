import React from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src';

export default (props) => {
  return(
    <div>
      <ReactHighcharts config={props.config} />
    </div>
  );
}
