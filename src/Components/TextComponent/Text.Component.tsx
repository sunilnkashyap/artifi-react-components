
import React from 'react';

import HeaderTextComponent from './Header/Header.Container'
import ListTextComponent from './List/List.Container'
import DetailsTextComponent from './Details/Details.Container'
import { TextModel } from './Text.Types';

interface Props {
  textComponent: any
}

export default class TextComponent extends React.Component<Props, TextModel> {
    constructor(props: Props) {
      super(props);
    }

    render() {

      let infoMsg;
      let data = this.props.textComponent;

      if(Object.keys(data.list).length <= 0){
        infoMsg = <p className="bg-info">{ data.label.lblMsgTxtNotAvailable }</p>
      }

      return (
            <div className="add-text-controls" >

              <HeaderTextComponent />
              
              <section className="content-area text-control-area content-padding">
               
                { infoMsg }

                <div className="clearfix">
                  {
                    Object.keys(data.selectedWidget).length <= 0 ?
                    <ListTextComponent /> :
                    <DetailsTextComponent />                    
                  }
                  
                </div>
                {
                  /* <div className="clearfix">
                    <div className="col-xs-12 no-padding">
                        <label data-test-selector="lblTextarea" className="pull-left">Text</label>
                        <div className="pull-left text-update"></div>
                    </div>
                    <div className="col-xs-12 no-padding display-flex">
                        <textarea value={this.state.value} onChange={this.handleChange} data-test-selector="text_3" placeholder="Placeholder Text" spellCheck={false} tabIndex={1} className="form-control selected">Add Text Here</textarea>
                        <button className="btn btn-primary pull-right" >Update Text</button>
                    </div>
                    <div className="disable-overlay" data-art-container="overlay" data-art-id="text_3"> </div>
                    <div className="text-validation-error-msg">Text content is required</div>
                    <div className="col-xs-12 no-padding"></div>
                  </div> */
                }
            </section>
          </div>
      );
    }
  }