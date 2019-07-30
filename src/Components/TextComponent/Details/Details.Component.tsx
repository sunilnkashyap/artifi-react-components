import * as React from 'react'
import { PhotoshopPicker } from 'react-color';


interface Props {
  textComponent: any,
  constants: any,
  updateTextarea: (value: any) => void,
  updateDefaultFontFamily: (value: any) => void,
  updateFontSize: (value: number) => void,
  handleBoldClick: () => void,
  handleItalicClick: () => void,
  handleAlignClick: (value: string) => void,
  handleVAlignClick: (value: string) => void
}

interface State {
  textareaValue?: string,
  textErrorMsg?: string
}

export default class DetailsTextComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      textareaValue : this.props.textComponent.details.data.text,
      textErrorMsg : '' 
    }

    this.setDefaultFontFamily = this.setDefaultFontFamily.bind(this);
    this._handlerTextareaKeyUp = this._handlerTextareaKeyUp.bind(this);
    this._updateTextButton = this._updateTextButton.bind(this);
    this._textValidations = this._textValidations.bind(this);
    this.__allowedTextLine = this.__allowedTextLine.bind(this);
    this.__allowedTextChar = this.__allowedTextChar.bind(this);
    this.__textValidation = this.__textValidation.bind(this);
    this.fontSize = this.fontSize.bind(this);
    this.changeFontSize = this.changeFontSize.bind(this);

    this.setDefaultFontFamily();
  }

  setDefaultFontFamily(data = null){
    console.log('setDefaultFontFamily ===>>> ', data);
    let defaultFontFamily;      
      if(typeof this.props.textComponent.details.fontFamily != 'undefined' && typeof this.props.textComponent.details.data.DomConstraints.fontFamily.DefaultValue != 'undefined'){
        defaultFontFamily = this.props.textComponent.details.fontFamily.filter((res: any) => {
          return res.Name == this.props.textComponent.details.data.DomConstraints.fontFamily.DefaultValue;
        })
        defaultFontFamily = data != null ? data : defaultFontFamily[0];
        this.props.updateDefaultFontFamily(defaultFontFamily);
      } 
  }

  fontFamily(){
    let data = this.props.textComponent;
    let fontFamilyHtml;
    let fontFamilyOptions = [];
    if(typeof this.props.textComponent.details.fontFamily){
      
      for (let i in data.details.fontFamily) {
        let singleRow = data.details.fontFamily[i];
        fontFamilyOptions.push(
        <li title={singleRow.Name} >
          <input type="radio" name="font-family-options" value={singleRow.Name} />
            <label onClick={ () => { console.log('selected this fonts', singleRow); this.setDefaultFontFamily(singleRow) } } className="art-dd-content">
              <div className="art-dd-opt-img">
                <img className="atf-custom-img" src={this.props.constants.fontImageBaseUrl + singleRow.ImageName} alt={singleRow.Name} />
              </div>
            </label>
        </li>
        )        
      }

      if(typeof this.props.textComponent.details.defaultFontFamily != 'undefined' && typeof this.props.textComponent.details.defaultFontFamily.Name != 'undefined'){
        fontFamilyHtml = <div className="col-xs-7 no-padding">
                          <label data-test-selector="lblFontFamily">{data.label.lblFontFamily}</label>
                          <div className="art-dropdown btn-group" title={data.label.lblFontFamily}>
                            <button data-test-selector="btnFontFamily" data-toggle="art-dropdown" className="btn btn-inverse art-dd-field dropdown-toggle">
                              <div className="art-dd-opt-img">
                                <img className="atf-custom-img" src={this.props.constants.fontImageBaseUrl + this.props.textComponent.details.defaultFontFamily.ImageName} alt={this.props.textComponent.details.defaultFontFamily.Name} />
                              </div>
                              <span className="caret"></span>
                            </button>
                              <ul className="dropdown-menu art-dd-option">
                                {fontFamilyOptions}
                              </ul>
                          </div>
                        </div>
      }
    }
    return fontFamilyHtml
  }

  componentDidUpdate(prevProps: Props){
    if(this.props.textComponent.details.fontFamily.length > 0){
      if(typeof prevProps.textComponent.details.defaultFontFamily == 'undefined' || this.props.textComponent.details.defaultFontFamily != prevProps.textComponent.details.defaultFontFamily){
        this.setDefaultFontFamily();
      }
    }

    console.log('componentDidUpdate :: SKCHK :: ', this.props.textComponent.details.data.text != this.state.textareaValue, this.props.textComponent.details.data.text , this.state.textareaValue)
    if(this.props.textComponent.details.data.text != this.state.textareaValue) {
      this.setState({textareaValue: this.props.textComponent.details.data.text})
    }
  }


  fontSize(){
    let availableFontSize = [];
    let data = this.props.textComponent.details.data;
    for(var i in data.availableFontSizes){
      const fSize = data.availableFontSizes[i];
      availableFontSize.push(
        <li  title={fSize + "px" }>
          <input type="radio" name="font-size-item" value={fSize} />
          <div onClick={ () => { this.changeFontSize(fSize) } } className="art-dd-opt-label art-dd-content">{fSize} px</div>
        </li>
      )

    }

    return  <div className="col-xs-4 col-xs-offset-1 no-padding">
              <label data-test-selector="lblFontSize">Font Size</label>
              <div className="art-dropdown btn-group" title="Font Size">
                <button data-test-selector="btnFontSize" data-toggle="art-dropdown" className="btn btn-inverse art-dd-field dropdown-toggle">
                  <span className="art-dd-opt-label" title={ this.props.textComponent.details.data.fontSize+'px'}>{ this.props.textComponent.details.data.fontSize }px</span>
                  <span className="caret"/>
                </button>
                <ul className="dropdown-menu art-dd-option">
                  { availableFontSize }
                </ul>
              </div>
            </div>
  }

  changeFontSize(fontSize: number){
    this.props.updateFontSize(fontSize);
  }

  _handlerTextareaKeyUp(e: React.ChangeEvent<HTMLTextAreaElement>) {
    var newValue = e.currentTarget.value
    let type = this.props.textComponent.details.data.TextValidation;
    switch(type){
      case 'AutoUpper': {
        newValue = newValue.toUpperCase();
        break;
      }
      case 'AutoLower': {
        newValue = newValue.toLowerCase();
        break;
      }
    }
    if(this._textValidations(newValue)){
      this.setState({textareaValue: e.currentTarget.value}, () => {
      
        this.props.updateTextarea({ value: newValue, widget_id: this.props.textComponent.details.data.id });
      })
    } else {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    }
    
        
  }

  /* todo >> need to verify & validations */
  _updateTextButton(e: React.MouseEvent<HTMLElement>) {
    // if(this._textValidations()){
      this.props.updateTextarea(this.state.textareaValue);
    // }
  }

  _textValidations(value = this.state.textareaValue){
    let text = value;
    if(typeof text != 'undefined'){
      console.log(this.__allowedTextLine(text), this.__allowedTextChar(text))
      if(this.__allowedTextChar(text) && this.__allowedTextLine(text) && this.__textValidation(text)) {
        console.log('###### valid Text ######')
        this.setState({textErrorMsg : ''});
        return true;
      } else {
        return false;
      }
    }
  }

  /*
  ** validate Text Max Allowed Lines
  */
  __allowedTextLine(text: string){
    let isValid = false;
    let noOfTextLineEntered = 0;
    noOfTextLineEntered = text.split("\n").length;
    let allowedTextLine = this.props.textComponent.details.data.NumberOfTextLines;
    if (noOfTextLineEntered > allowedTextLine && allowedTextLine > 0) {
      this.setState({textErrorMsg : this.props.textComponent.label.msgTextLineError});
      isValid = false
    } else {
      isValid = true
    }
    return isValid
  }

  /*
  ** validate Text Lines Character
  */
  __allowedTextChar(text: string){
    let isValid = false
    let allowedCharPerLine = parseInt(this.props.textComponent.details.data.CharacterLimit)
        if(allowedCharPerLine > 0){
          if(text.split('\n').map((ref)=>{
            return(ref.trim().length > allowedCharPerLine)
            }).includes(true)){
              this.setState({textErrorMsg : this.props.textComponent.label.msgTextCharLimitError});
              isValid = false
            } else {
              isValid = true
            }
        } else {
          isValid = true
        }
        return isValid
  }

  /*
  ** validate Text Char Formatting
  */
  __textValidation(text: string){
    let type = this.props.textComponent.details.data.TextValidation;
    let newText = '';
    let isValid = false;
    switch(type){
      case 'AutoUpper': {
        newText = text.toUpperCase();
        isValid = true;
        break;
      }
      case 'AutoLower': {
        newText = text.toLowerCase();
        isValid = true;
        break;
      }
      case 'A-Z': {
        if(text == text.toUpperCase()){
          isValid = true;
        } else {
          this.setState({textErrorMsg : 'Only A-Z Characters are allowed.'});
        }        
        break;
      }
      case 'a-z': {
        if(text == text.toLowerCase()){
          isValid = true;
        } else {
          this.setState({textErrorMsg : 'Only a-z Characters are allowed.'});
        }
        break;
      }
      case '0-9': {
        if(/\a/.test(text)){
          this.setState({textErrorMsg : 'Only 0-9 Characters are allowed.'});
        } else {
          isValid = true;
        }
        break;
      }
    }
    if(newText != ''){
      this.setState({textareaValue: newText}, () => {
        // this.props.updateTextarea(newText); // this function will update props
      })
    }
    return isValid;
  }

  render() {

    let updateBtnHtml;
    let data = this.props.textComponent;
    let widgetData = this.props.textComponent.details.data;

    if(data.details.showUpdateTextBtn){
      updateBtnHtml = <button onClick={(e) => {this._updateTextButton(e)}} className="btn btn-primary pull-right" >Update Text</button>
    }

    return (
      
        <>
          <div className="col-xs-12 no-padding">
              <label data-test-selector="lblTextarea" className="pull-left">{widgetData.caption}</label>
              <div className="pull-left text-update"></div>
          </div>
          <div className="col-xs-12 no-padding display-flex">
              <textarea onChange={ (e) => { this._handlerTextareaKeyUp(e) } } value={this.state.textareaValue} data-test-selector={widgetData.id} placeholder={widgetData.placeholderText} spellCheck={widgetData.AllowSpellcheck} tabIndex={1} className="form-control selected"></textarea>
              { updateBtnHtml }
          </div>
          {/* <div className="disable-overlay"></div> */}
          {
            typeof this.state.textErrorMsg != 'undefined' && this.state.textErrorMsg.length > 0 ? <div className="text-validation-error-msg">{this.state.textErrorMsg}</div> : ''
          }
          
          <div className="col-xs-12 no-padding"></div>

          <div className="txt-control-wgt margin-top-10">
            <div className="col-xs-12 no-padding">

              {this.fontFamily()}
              
              {this.fontSize()}

            </div>

            <div className="col-xs-12 no-padding">
              <label></label>
              <div className="art-text-control">
              {
                widgetData.AllowBold ? 
                  <button onClick={()=>{this.props.handleBoldClick();}} type="button" title="Bold" className={ widgetData.fontWeight == 'normal' ? 'btn btn-default' : 'selected btn btn-default'} >
                    <i className="atf-bold2 font-icon"></i>
                  </button>
                : ''
              }
                
              {
                widgetData.AllowItalic ?
                <button onClick={()=>{this.props.handleItalicClick();}} type="button" title="Italic" className={ widgetData.fontStyle == 'normal' ? 'btn btn-default' : 'selected btn btn-default'} >
                  <i className="atf-italic2 font-icon"/>
                </button>
                : ''
              }
                
              {
                widgetData.AllowTextAlign ?
                <div className="btn-group">
                  <button data-test-selector="btnHorizontalAlign" type="button" title="Horizontal Align" className="btn btn-default dropdown-toggle" data-toggle="art-dropdown">
                    <i data-art-selector="appliedTextAlignment" className="atf-paragraph-left font-icon selected"/>
                    <span className="caret-right-corner"></span>
                  </button>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      <button onClick={()=>{this.props.handleAlignClick('left');}} type="button" data-test-selector="btnLeftAlign" title="Left Align" className={ widgetData.textAlign == 'left' ? 'btn btn-default selected' : ' btn btn-default'} >
                        <i data-art-value="left" className="atf-paragraph-left font-icon selected"/>
                      </button>
                    </li>
                    <li>
                      <button onClick={()=>{this.props.handleAlignClick('center');}} type="button" data-test-selector="btnCenterAlign" title="Center Align" className={ widgetData.textAlign == 'center' ? 'btn btn-default selected' : ' btn btn-default'} >
                        <i data-art-value="center" className="atf-center-align2 font-icon"/>
                      </button>
                    </li>
                    <li>
                      <button onClick={()=>{this.props.handleAlignClick('right');}} type="button" data-test-selector="btnRightAlign" title="Right Align" className={ widgetData.textAlign == 'right' ? 'btn btn-default selected' : 'btn btn-default'}>
                        <i data-art-value="right" className=" atf-paragraph-right font-icon"/>
                      </button>
                    </li>
                  </ul>
                </div>
                : ''
              }
                
                {
                  widgetData.AllowVerticalTextAlign ?
                  <div className="btn-group">
                    <button data-test-selector="btnVerticalAlign" type="button" title="Vertical Align" className="btn btn-default dropdown-toggle" data-toggle="art-dropdown">
                      <i data-art-selector="appliedVerticalAlignment" className="atf-align-vertical-middle font-icon selected"/>
                      <span className="caret-right-corner"/>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                      <li>
                        <button onClick={()=>{this.props.handleVAlignClick('top');}} type="button" data-test-selector="btnTopAlign" title="Top Align" className={ widgetData.vAlign == 'top' ? 'btn btn-default selected' : 'btn btn-default'}>
                          <i data-art-value="top" className="atf-align-top font-icon"/>
                        </button>
                      </li>
                      <li>
                        <button onClick={()=>{this.props.handleVAlignClick('middle');}} type="button" data-test-selector="btnMiddleAlign" title="Center Align" className={ widgetData.vAlign == 'middle' ? 'btn btn-default selected' : 'btn btn-default'}>
                          <i data-art-value="middle" className="atf-align-vertical-middle font-icon selected"/>
                        </button>
                      </li>
                      <li>
                        <button onClick={()=>{this.props.handleVAlignClick('bottom');}} type="button" data-test-selector="btnBottomAlign" title="Bottom Align" className={ widgetData.vAlign == 'bottom' ? 'btn btn-default selected' : 'btn btn-default'}>
                          <i data-art-value="bottom" className="atf-align-bottom font-icon"/>
                        </button>
                      </li>
                    </ul>
                  </div>
                  : ''
                }
                
                
                {/* <span className="art-color-swatch-btn" data-art-id="colorSelector" data-rule-id="223102" data-art-text-prop="fill" data-art-color-selector="textColor" data-art-color-advancecolorpicker-id="#advance-color-link" data-art-color-swatch-id="#color-swatch" data-art-color-swatch-wrapper-id="#text-control-colors" title="Color" data-art-property="fill" style={{background: 'rgb(0, 0, 0)'}}>
                  <button type="button" className="btn btn-default">
                    <i className="atf-font font-icon"/>
                  </button>
                </span> */}
                
              </div>
            </div>

          </div>

        </>
    )
  }
}













