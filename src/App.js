// App.js

import React, { Component } from 'react';
import './App.css';
import BuildField from './methods/BuildField'
import AppForm from './methods/AppForm'

class App extends Component {
  state = {
    sourceApp: 'plugcrm',
    required: false,
    actionField: '',
    actionMapper: '',
  }

  handleFieldChange = (key, value) => {
    this.setState({ [key]: value });
  };

  addFormattedDiv = (text, appColor, isCustomField) => {
    if (!text.trim()) return; 

const appLogoUrl = `https://assets.pluga.co/apps/icons/${this.state.sourceApp}/${this.state.sourceApp}-icon.svg`

const customFieldColor = "rgb(207, 175, 80)"
const fieldColor = isCustomField ? customFieldColor : appColor

    const newContent = `${this.state.actionMapper} <div class="trigger-field" contenteditable="false" style="background-color: ${fieldColor}">
    <img src="${appLogoUrl}" class="trigger-field-logo" style="background-color: ${appColor}"/>
    <span class="trigger-field-name">
    ${text}
    </span>
    <button type="button" class="delete-button">
    <div class="delete-div"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></div>
    </button>
    </div>&nbsp;`
    this.setState({ actionMapper: newContent });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="image" id="imageContainer">
          <h1>Gerador de prints de mapeamento</h1>

            <BuildField onFieldChange={this.handleFieldChange} sourceApp={this.state.sourceApp} requiredFlag={this.state.required} actionMapper={this.state.actionMapper}
            actionField={this.state.actionField} /></div>
          <div className="form" id="formContainer" ><AppForm onFieldChange={this.handleFieldChange} onAddDiv={this.addFormattedDiv} /></div>
        </div>
      </div>
    );
  }
}

export default App;
