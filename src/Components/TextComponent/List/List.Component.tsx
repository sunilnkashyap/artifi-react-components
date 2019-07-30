import * as React from 'react'
import { TextModel } from '../Text.Types';

interface Props {
  textComponent: any,
  handleSelectWidget: (value: any) => void
}


export default class ListTextComponent extends React.Component<Props, TextModel> {
  constructor(props: Props) {
    super(props)
    this.state = this.props.textComponent;
    this._handleListClick = this._handleListClick.bind(this)
  }


  componentDidUpdate(previousProps: Props, previousState:TextModel) {
    if (previousProps.textComponent !== this.props.textComponent) {
      this.setState(this.props.textComponent)
    }
  }

  _handleListClick(object: any) {
    this.props.handleSelectWidget(object)
  }


  render() {

    let _this = this;
    let listObjects = this.state.list;
    let listHtml = [];

    function listRow(object: any, index: any){
      return <li key={object.id} className="text-inner-textbox">
              <label data-test-selector="lblCaption">{ object.caption }</label>
              <div className="custom-disable-overlay">
                <div className="input-group col-xs-12">
                  <textarea data-test-selector="text_3" defaultValue={ object.text } placeholder={ object.placeholderText } spellCheck={false} tabIndex={index++} className="form-control" disabled={true} style={{maxHeight:'30px'}}></textarea>
                  <div onClick={ () => { _this._handleListClick(object) } } className="disable-overlay"></div>
                  <span className="input-group-addon">
                    <i data-test-selector="btnEditText" className="atf-edit" style={{ color:'#27B2EA' }} />
                  </span>
                </div>
              </div>
              <div className="txt-update-ctr action" ></div>
            </li>
    }

    if(Object.keys(listObjects).length > 0){
      for(var i in listObjects){
        listHtml.push(listRow(listObjects[i], i));
      }
    }

    return (
      <ul className="add-text-container">
        
        { listHtml }

      </ul>
    )
  }
}













