import React from "react";
import PropTypes from "prop-types";
import Plot from 'react-plotly.js';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function ShowPlot(props){
  const {data, anomalies} = props;

  const plotProps = data ? {
    data: [
      {
        x: data.map((val, idx) => idx+1),
        y: data,
        type: 'scatter',
        mode: 'lines+points',
        marker: {color: 'blue'},
        name: 'Data'
      },
      anomalies ? {
        x: anomalies.map((val, idx) => idx+1),
        y: anomalies.map((val, idx) => val === 1 ? data[idx] : null),
        type: 'scatter',
        mode: 'markers',
        marker: {color: 'red'},
        name: 'Events'
      } : {},
    ],
    layout: { 
      margin: {l: 25, r: 0, b: 25, t: 10, pad: 10}
    },
    useResizeHandler: true,
    style:{ width: '100%', height: '100%', minHeight: '200px' },
    config:{"displayModeBar": false} //Remove plotly's toolbar - some buttons make the container buggy
  } : null;

  return data ?
    <Card style={{padding: '10px'}}>
      <Typography gutterBottom variant="h5" component="h2">
        Event Detection
      </Typography>
      <Plot {...plotProps}/> 
    </Card> :
    null;
}

ShowPlot.propTypes = {
  data: PropTypes.array,
  anomalies: PropTypes.array
};

export default ShowPlot;