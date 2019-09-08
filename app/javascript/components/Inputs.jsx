import React, {useState} from "react";
import CSVReader from 'react-csv-reader';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/core/Slider';

function SliderCustom(props){
  const {sldrLabel, ...sliderProps} = props;

  return (
    <React.Fragment>
      {sldrLabel} <Slider {...sliderProps}/>
    </React.Fragment>
  );
}

function Inputs(props){
  const {threshold, obsWindow, setState} = props;

  //Function to be called to update global state
  const mouseup = (ev, value, currVal) => {
    if(value !== Object.values(currVal)[0]){
      setState({[Object.keys(currVal)[0]]: value});
    }
  }

  const [sldrThrsh, setSldrThrsh] = useState(threshold);
  const [sldrWindow, setSldrWindow] = useState(obsWindow);

  const inputs = [
    {
      Component: CSVReader,
      cssClass: "csv-reader-input",
      label: "Import data ",
      onFileLoaded: (a) => {
        const data = a.map(val => {
          if(val && val.constructor === Array){
            if(val[1]){
              return Number(val[1]);
            }
            else{
              return Number(val[0]);
            }
          }
        });

        if(data){
          setState({data});
        }
      },
      onError: (e) => {
        console.log(e);
      },
      key: 'fileSelect'
    },
    {
      Component: SliderCustom,
      sldrLabel: 'Threshold (\u03C3) - ' + sldrThrsh,
      min: 1,
      max: 10,
      step: 1,
      value: sldrThrsh,
      onChange: (ev, value) => {setSldrThrsh(Number(value))},
      onChangeCommitted: (ev, value) => mouseup(ev, value, {threshold}),
      key: 'threshold'
    },
    {
      Component: SliderCustom,
      sldrLabel: 'Window (points) - ' + sldrWindow,
      min: 5,
      max: 101,
      step: 2,
      value: sldrWindow,
      onChange: (ev, value) => setSldrWindow(value % 2 == 0 ? value - 1 : value),
      onChangeCommitted: (ev, value) => mouseup(ev, value % 2 == 0 ? value - 1 : value, {obsWindow}),
      key: 'window'
    }
  ];

  return (
    <Card className="inputsCard">
      <Typography gutterBottom variant="h5" component="div">
        User inputs
      </Typography>
      { inputs.map(function(obj){
        const {Component, key, ...otherProps} = obj;

        return (
          <Typography key={key} gutterBottom variant="body1" component="div">
            <Component {...otherProps}/>
          </Typography>
        );
      }) }
    </Card>
  )
}

Inputs.propTypes = {
  threshold: PropTypes.number,
  window: PropTypes.number,
  setState: PropTypes.func,
};

export default Inputs