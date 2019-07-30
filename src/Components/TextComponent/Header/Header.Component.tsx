import * as React from 'react'
import { TextModel } from '../Text.Types';

interface Props {
  textComponent: any,
  updateSettingClick: (value: TextModel) => void,
  handleAddTextWidget: (value: TextModel) => void
}


export default class HeaderTextComponent extends React.Component<Props, TextModel> {
  constructor(props: Props) {
    super(props)
    this.state = this.props.textComponent;
    this._handleAddBtnClick = this._handleAddBtnClick.bind(this)
  }


  componentDidUpdate(previousProps: Props, previousState:TextModel) {
    if (previousProps.textComponent !== this.props.textComponent) {
      this.setState(this.props.textComponent)
    }
  }

  _handleAddBtnClick(event: React.MouseEvent) {
    this.props.handleAddTextWidget({})
  }


  render() {
    
    let addButtonJSX;
    if(this.state.isAllowAddText){
      addButtonJSX = <button
                        onClick={this._handleAddBtnClick}
                        className="btn btn-primary pull-right"
                        title={ this.state.label.lblBtnAdd }
                      >
                        { this.state.label.lblBtnAdd }
                      </button>
    }

    return (
        <header className="content-padding clearfix tab-heading">
            <h3 className="pull-left">
                { this.state.label.lblTitle }
            </h3>
            { addButtonJSX }
        </header>
    )
  }
}













