import React, { Component } from 'react';

const getFieldName = (inputName) => inputName || 'Nome do campo'

class BuildField extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
      }
    
      handleInputChange = (event) => {
        this.props.onFieldChange("actionMapper", event.target.innerHTML);
      };
    
      preventCursorInsideDiv = (event) => {
        if (event.target.classList.contains("highlighted")) {
          event.preventDefault(); // Impede que o cursor entre na div
          this.inputRef.current.focus(); // Mantém o foco no contentEditable
        }
      };
    
      componentDidUpdate(prevProps) {
        if (prevProps.actionMapper !== this.props.actionMapper) {
          this.moveCursorToEnd();
        }
      }
    
      moveCursorToEnd = () => {
        const el = this.inputRef.current;
        if (!el) return;
    
        const range = document.createRange();
        const sel = window.getSelection();
        
        // Move o cursor para o final do contentEditable
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      };

    render() {
        return (
            <div className="action-field" id="fieldContainer">
                <div className="field-header">
                    <span className="field-name">{getFieldName(this.props.actionField)}{"\u00A0"}</span>
                    <span className={`field-required${this.props.requiredFlag ? ' isreq' : ''}`}>
                        {this.props.requiredFlag ? '(obrigatório)' : '(opcional)'}
                    </span>
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" data-testid="tooltip" class="izinho" height="1em" width="1em"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path><path d="M12 9h.01"></path><path d="M11 12h1v4h1"></path></svg>
                </div>
                <div className="field-input">
                    <div
                        ref={this.inputRef}
                        className="fake-input-box"
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={this.handleInputChange}
                        onMouseDown={this.preventCursorInsideDiv} // Evita cursor dentro da div
                        onKeyDown={this.preventCursorInsideDiv} // Bloqueia tecla dentro da div
                        dangerouslySetInnerHTML={{ __html: this.props.actionMapper }}
                    />
                </div>
            </div>
        )
    }
}

export default BuildField;
