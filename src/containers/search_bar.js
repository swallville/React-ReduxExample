import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
      super(props);

      this.state = { term: '' };
      // Get the fucntion onInputChange, bind to this instance of
      // SearchBar and replace it.
      this.onInputChange = this.onInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchWeather(this.state.term);
    this.setState( {term: ''} );
  }

  render(){
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="container">
            <div className="navbar-header">
              <a className="github-fork-ribbon" href="https://github.com/StephenGrider" title="Fork me on GitHub">Fork me on GitHub</a>
              <a className="navbar-brand" href="http://openweathermap.org">
                <img src="https://pbs.twimg.com/profile_images/720298646630084608/wb7LSoAc.jpg"
                width="50" height="50" title="Course's github" className="d-inline-block align-top" alt="Home"/>
              </a>
            </div>
            <form onSubmit={this.onFormSubmit} className="navbar-form navbar-left form-inline" role="search">
              <div className="form-group">
                <input type="text"
                  autoFocus
                  className="form-control"
                  placeholder="Search for a city..."
                  value={this.state.term}
                  onChange={this.onInputChange}
                />
                <button type="submit"
                  title="Search the city's weather"
                  className="btn btn-secondary navbar-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch) {
  // Whenever the function fetchWeather() is called, the result should be passed
  // to all of our reducers thanks to dispatch
  return bindActionCreators({ fetchWeather }, dispatch);
}
// Connecting mapDispatchToProps to SearchBar.
// Now we can use our action fetchWeather!
// Dark magic
export default connect(null, mapDispatchToProps)(SearchBar);
