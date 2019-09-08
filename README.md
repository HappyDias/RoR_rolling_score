# Ruby-on-Rails Event Detector

This project consists of a Ruby-on-Rails (RoR) backend and a React frontend that provides users with an API and an interface (respectively) to import and process data files to find data points that are considered anomalous using a rolling z-score threshold algorithm.

## Getting started

This project was created with RoR (2.5.5 | 6.0.0) in a Windows Operating System and was not tested outside of it. To start the server, clone this repository to your local system and install the back end dependencies:

```
bundle install
```

followed by installing the local dependencies:

```
yarn install
```

Afterwards, you should be able to start the server:

```
rails server # ruby bin\rails server on Windows
```

If no probems occurr, you should be able to access http://localhost:3000 to see the application in action

## Usage

This project provides two distinct resources:

1. A backed API with the endpoint `/api//api/anomalies` that is used to calculate the anomalous data points using the rolling z-score threshold algorithm,
2. A React interface where users can import CSV files with their data and manage the algorithm's parameters

### API

The only endpoint in this API, `/api//api/anomalies`, requires a JSON object with 3 parameters to be sent:

1. `data` : A numeric arrays. This array should be in the form `[y1, y2, y3, ...]`
2. `threshold` : An integer z-score threshold above which a data point is considered anomalous
3. `window` : An integer in number of data points that defines the size of the rolling window of the algorithm

#### Example data

```json
{
	"data" : [1,2,1,0,1,2,1,8,9,8,1,2,0,2,1,2,3,1,2,0,8,9,2,0,3,0,2,1,2,3,8,10,2,1,2,3,0,1,2,1,2,7,6,9,1,2,0,1,2,1],
	"threshold" : 1,
	"window": 13
}
```

### Interface

The interface is a simple react interface that provides the following:

1. A component to tweak the parameters of the algorithm (data, threhsold & window)
2. A component to plot the processed data

Data files provided by users should be in the form of single or double column CSV files, mimicking time series data with and without time stamps, respectively. For the purposes of this project, timestamps are ignored. Example data can be found in the `/data` folder.

## Bugs and Improvements

If you wish to report bugs or suggest improvements, please do so using github's interfaces. If you want to start a conversation, feel free to send an email to amcbd89@gmail.com 