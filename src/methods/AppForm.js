import React, { Component } from 'react';
import colorMap from '../shared/colorMap'

class AppForm extends Component {
  state = {
    inputValue: this.props.actionMapper || '',
    sourceApp: 'plugcrm',
    isCustomField: false,
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSelectChange = (event) => {
    console.log(123);
    this.setState({ sourceApp: event.target.value });
    console.log(this.state)
    console.log(event.target.value)
    console.log(456);
    this.props.onFieldChange('sourceApp', event.target.value)
  };


  handleAddClick = () => {
    const appColor = colorMap[this.state.sourceApp]

    this.props.onAddDiv(this.state.inputValue, appColor, this.state.isCustomField); // Envia o texto para o App.js
    this.setState({ inputValue: "" }); // Limpa o input após enviar
  };

  render() {
    return <div className="formParent">
      <div className="form-field form-action-field">
        <label for="actionfield">Digite o nome do campo</label>
        <input name="actionfield" placeholder="Digite um campo" onChange={(e) => this.props.onFieldChange('actionField', e.target.value)}></input>
        <div className="boolean-flag">
          <label className="checkbox">
            <input
              type="checkbox"
              onChange={(e) => this.props.onFieldChange('required', e.target.checked)}
            />
            Obrigatório
          </label>
        </div>
      </div>
      <div className="form-field target-app">
        <label for="source">Selecione a ferramenta de origem</label>
        <select name="source" id="source" onChange={this.handleSelectChange}>
          <option value="plugcrm">RD CRM</option>
          <option value="google_calendar">Google Calendar</option>
        </select>
      </div>
      <div className="form-field form-trigger-field">
        <label for="triggerfield">Adicione um atributo</label>
        <input
          name="triggerfield"
          placeholder="Digite o nome do atributo"
          onChange={this.handleInputChange}
          value={this.state.inputValue}
        />
        <div className="boolean-flag">
          <label className="checkbox">
            <input type="checkbox" onChange={(e) => this.setState({ isCustomField: e.target.checked })} />Personalizado
          </label>
        </div>
        <button className="add-field" type="button" onClick={this.handleAddClick}>ADICIONAR</button>
      </div>
    </div>
  }
}

export default AppForm