import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import ShowPlot from './ShowPlot';
import Inputs from './Inputs';
import './MainApp.css';

function MainApp(props){

  const reducer = (prevState, newState) => ({...prevState, ...newState,});
  const initState = {
    data: null,
    loading: false,
    threshold: 1,
    obsWindow: 13,
    anomalies: null
  };
  const [state, setState] = useReducer(reducer, initState);

  const fileProps = {setState};
  const plotProps = {
    data: state.data,
    anomalies: state.anomalies
  };
  const inputProps = {
    obsWindow: state.obsWindow,
    threshold: state.threshold,
    setState
  };

  //Create an object with the variable changes to be listened to
  const {loading, anomalies, ...toListen} = state;

  //Function to be called when
  //one relevant parameter changes
  useEffect(()=>{
    async function getData(){
      const url = "/api/anomalies";
      const info = {
        data: state.data,
        window: state.obsWindow,
        threshold: state.threshold
      };
      const options = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };
      let resp = null
      let result = null;

      if(state.data){
        try{
          setState({loading: true, anomalies: null});
          resp = await window.fetch(url, options);
          if(resp.ok){
            result = await resp.json();
            if(result && result.constructor === Array){
              setState({anomalies: result, loading: false});
            }
          }
          else{
            setState({loading:false});
            throw('Bad request')
          }
        }
        catch(e){
          console.log(e);
        }
      }
    }

    getData();

  }, Object.values(toListen));

  return (
    <div className="container">
      <Inputs {...inputProps}/>
      <ShowPlot {...plotProps}/>
    </div>
  );
}

export default MainApp
