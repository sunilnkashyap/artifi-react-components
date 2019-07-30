Artifi.TextEditorBaseController = createClass({

    Name: "TextBoxEditorController",
    allowAddText: false,
    selectedWidgetId: null,


    initialize: function (_model, _view) {
        _TextBoxEditorController = this;
        this.setProperty(_model, _view);
        this.appModel = main.getModel(Artifi.ModelConstant.APPLICATION_MODEL);
        this.initView();
        this.mergedPanelCaptionKey = "MERGED_PANEL_TEXT_AND_ARCTEXT";
        this.WidgetOrder = "WidgetOrder";

        setTimeout(function () {
            _TextBoxEditorController.initTextReactComponent();
        }, 2000)
        
    },
    /* Added function for handling view ready event. If view ready already fired, then we are calling function view ready from here for handling view ready.*/

    initView: function () {
        var editor = main.getModel(Artifi.ModelConstant.EDITOR_MODEL);
        if (this.appModel.isFirstViewReady()) {
            var viewDetails = {};
            viewDetails.detail = {};
            viewDetails.detail.viewId = editor.getActiveViewId();
            this._viewChanged(viewDetails);
        }
    },

    setProperty: function (_model, _view) {
        this.allowAddText = true;
        this.Name = "TextBoxEditorController";
        this.textModel = _model;
        this.textEditorView = _view;
        this.fontModelIns = main.getModel(Artifi.ModelConstant.FONT_MODEL);
        this.colorModelIns = main.getModel(Artifi.ModelConstant.COLOR_MODEL);
        this.editorModel = main.getModel(Artifi.ModelConstant.EDITOR_MODEL);
        this.constraintsModel = main.getModel(Artifi.ModelConstant.CONSTRAINTS_MODEL);
        this.textEditorView.init(this.fontModelIns, this.colorModelIns);

        $(ArtifiEventBus).onOff(Artifi.EventConstant.VIEW_READY, this.Name, this, this.viewChanged);/*Event Received From Editor*/
        //$(ArtifiEventBus).off(Artifi.EventConstant.VIEW_CHANGED + "." + this.Name).on(Artifi.EventConstant.VIEW_CHANGED + "." + this.Name, this.viewChanged);
        $(ArtifiEventBus).onOff(Artifi.EventConstant.WIDGET_REMOVED, this.Name, this, this.widgetRemoved);/*Event Received From Editor*/
        $(ArtifiEventBus).onOff(Artifi.EventConstant.WIDGET_ADDED, this.Name, this, this.widgetAddedOnEditor);/*Event Received From Editor*/
        $(ArtifiEventBus).onOff(Artifi.EventConstant.WIDGET_SELECTION_REMOVED, this.Name, this, this.widgetSelectionRemoved);/*Event Received From Editor*/
        $(ArtifiEventBus).onOff(Artifi.EventConstant.WIDGET_SELECTED, this.Name, this, this.widgetSelected);/*Event Received From Editor*/
        $(ArtifiEventBus).onOff(Artifi.EventConstant.WIDGET_UPDATED, this.Name, this, this.widgetUpdated);

        $(ArtifiEventBus).onOff(Artifi.EventConstant.TEXT_WIDGET_DATA_UPDATED, this.Name, this, this.sendUpdateTextWidgetEvt);/*Event Received From TextModel*/
        $(ArtifiEventBus).onOff(Artifi.EventConstant.UPDATE_TEXT_WIDGET, this.Name, this, this.updateTextWidgetData);/*Event Received From Text Editor View*/
        $(ArtifiEventBus).onOff(Artifi.EventConstant.ADD_TEXT_WIDGET, this.Name, this, this.addTextWidget);/*Event Received From Text Editor View*/
        $(ArtifiEventBus).onOff(Artifi.EventConstant.RELOAD_SNAPSHOT, this.Name, this, this.resetSelectedWidget);/*Event Received From Text Editor View*/
        $(ArtifiEventBus).onOff(Artifi.EventConstant.FONT_LOADED, this.Name, this, this.fontLoadedHnd);/*Event Received From Text Editor View*/
        $(ArtifiEventBus).onOff(Artifi.EventConstant.CHARACTER_LIMIT_ERROR, this.Name, this, this.showCharacterLimitError);/*Event Received From Save Controller_new*/
    },
    /*this method trigger select widget by id event and show error message*/
    showCharacterLimitError: function (e) {
        var _this = e.data._this;
        var data = e.detail.data;
        var event = jQuery.Event(Artifi.EventConstant.SELECT_WIDGET_BY_ID);
        event.detail = {
            data: data
        };
        $(ArtifiEventBus).trigger(event);

        var widgetConstraints = _this.editorModel.getWidgetDataById(e.detail.data);
        var characterLimit = widgetConstraints.DomConstraints.CharacterLimit;
        _this.textEditorView.showMinCharErrorMessage(characterLimit.Message, widgetConstraints.id);
    },
    /*Font loaded event handler*/
    fontLoadedHnd: function (e) {
        try {
            var _this = e.data._this;
            var constraints = _this.textEditorView.updatedConstraints;
            var activeWidget = "";
            var fontData = "";
            if (_this.editorModel.getCurrentActiveObject()) {
                activeWidget = _this.editorModel.getCurrentActiveObject();
            }
            if (constraints && activeWidget && activeWidget.type == Artifi.WidgetsConstant.TEXTBOX && activeWidget.id == constraints.id) {
                fontData = _this.textModel.setFontData(_this.fontModelIns.getFontList(), constraints);
                _this.textEditorView.setSelectedFontData(fontData);
                _this.textEditorView.setfontFamilyList();
                _this.textEditorView.disableFontListDropdown(false);
            }
        } catch (e) {
            console.log("Font loaded handler ,method = fontLoadedHnd ,exception :: ", e);
        }
    },
    viewChanged: function (e) {
        var _this = e.data._this;
        _this.textEditorView.selectedWidgetId = "";
        _this._viewChanged(e);
        _this.textEditorView.instantiateEffectRenderer();
    },
    /*Call this function when widget is selected from editor*/
    widgetRemoved: function (e) {
        var _this = e.data._this;
        _this._widgetRemoved(e);
    },

    widgetAddedOnEditor: function (e) {
        var _this = e.data._this;
        _this._widgetAddedOnEditor(e);
    },

    widgetSelectionRemoved: function (e) {
        var _this = e.data._this;
        _this._widgetSelectionRemoved(e);
    },

    /*Call this function when widget is selected from editor*/
    widgetSelected: function (e) {

        var _this = e.data._this;
        _this._widgetSelected(e);
    },

    widgetUpdated: function (e) {
        var _this = e.data._this;
        _this._widgetUpdated(e);
    },

    sendUpdateTextWidgetEvt: function (e) {
        var _this = e.data._this;
        _this._sendUpdateTextWidgetEvt(e);
    },

    updateTextWidgetData: function (e) {
        var _this = e.data._this;
        _this._updateTextWidgetData(e);
    },

    addTextWidget: function (e) {
        var _this = e.data._this;
        _this._addTextWidget(e);
    },
    _widgetSelected: function (e) {
        var _this = this;
        var widgetId = e.detail.activeWidgetVo.id;
        if (_this.selectedWidgetId != widgetId) {
            _this.renderSelectedTextWidget(e);
        }
    },

    renderSelectedTextWidget: function (e) {

        var _this = this;
        var widgetId = e.detail.activeWidgetVo.id;
        var ruleId = e.detail.activeWidgetVo.RuleId;
        _this.selectedWidgetId = widgetId;
        _this.textEditorView.setPreviousUpdatedText(e.detail.activeWidgetVo.text);
        try {
            var constraints = e.detail.activeWidgetVo;
            if (checkExist(constraints) && (constraints.type == Artifi.WidgetsConstant.TEXTBOX) && constraints.CanEdit == true && constraints.selectable == true) {
                _this.showORHideTextCont(true);
                _this.textEditorView.setColorPickerParent();
                /*If font data is yet to load than disabling font dropdown*/
                var fontList = _this.fontModelIns ? _this.fontModelIns.getFontList() : null;
                if (fontList && fontList.length == 0) {
                    _this.textEditorView.disableFontListDropdown(true);
                }
                _this.fontModelIns.getFontListByRuleId(ruleId, function (fontData) {
                    _this.textEditorView.setSelectedFontData(fontData.data);
                    _this.textEditorView.renderHTML(constraints);
                    _this.textEditorView.setFontFamilyColorSize(constraints);
                    _this.textEditorView.setSelectedProperties(constraints);                   
                    _this.textEditorView.makeEditableText();                    
                });
                _this.textModel.generateColorImagePath(constraints); /*Generating Color Image Paths*/

                _this.textEditorView.removeHTML(); /*Removed Previous HTML*/

                _this.textModel.setTextProperties(constraints);/*Set Basic Properties of text which are used for updating text*/

                _this.textModel.setConstraints(constraints);/*Set Constraints*/

                _this.setTextwidgets();/*Generating Text input areas On UI*/
                _this.textEditorView.setPropertyPanel(constraints); /*Generating Text Property Panel*/
                //    _this.textEditorView._updateCharacterCount(e.detail.activeWidgetVo.text, e.detail.activeWidgetVo.text); /*Updating Character Count when Widget is selected*/
                var id = e.detail.activeWidgetId;
                _this.textEditorView.textProperties = _this.textEditorView.setCharacterLimitProperty(_this.textEditorView, constraints.text.length, constraints.text);
                // Artifi.TextHelper.checkValidation(_this.textEditorView.textProperties);
                _this.textEditorView.makeEditableText(); /*Make text editable .i/e remove disabled attribute from current selected text*/

                _this.textEditorView.selectedWidgetId = e.detail.activeWidgetVo.id; /*setting active widget id because when user click on text area repetitively widget selected event fire*/
                _this.textEditorView.resetTextProperty(_this.textEditorView.selectedWidgetId, constraints["text"]); /*resets the text area present in right pane*/

            } else {

                _this.textEditorView.selectedWidgetId = e.detail.activeWidgetVo.id;
                _this._widgetSelectionRemoved();
            }
            /* If canEdit and canSelect is true, then only it will show text control panel */
            if (_this.isMergedTextAllowed() && constraints.CanEdit == true && constraints.selectable == true) {
                _this.textEditorView.showHideMergedTextControls(true);
            }
        } catch (exc) {
            console.log("Class:- _this   Method:- _this :- widgetSelected   " + exc.stack)

        }

    },

    _widgetUpdated: function (e) {
        var _this = this;
        try {
            if (e.detail.activeWidget.type === Artifi.WidgetsConstant.TEXTBOX) {
                _this.textEditorView.setPreviousUpdatedText(e.detail.activeWidget.text)
            }
        } catch (exc) {
            console.log("Class:- _this   Method:- templateRendered :- widgetSelected   " + exc.stack)

        }
        _this.renderEmbTextList(e);

    },

    templateRendered: function (e) {
        var _this = this;
        try {
            _this.selectedWidgetId = null;
            if (!$.isEmptyObject(_this.checkWidgetIsSelectedOrNot())) {
                var selectedObject = _this.checkWidgetIsSelectedOrNot();
                _this._widgetSelected(selectedObject); /*Generating Text areas*/

            } else {
                _this.setTextwidgets();
            }
        } catch (exc) {
            console.log("Class:- _this   Method:- templateRendered :- widgetSelected   " + exc.stack);

        }

    },
    checkWidgetIsSelectedOrNot: function () {
        var _this = this;
        var e = {};
        if (Artifi.Utils.checkExist(_this.editorModel.getActiveFabricEditor())) {
            var object = _this.editorModel.getActiveFabricEditor().getActiveObject();

            var detail = {};
            var activeWidgetVo = null;
            if (!$.isEmptyObject(object)) {
                if (object.type === Artifi.WidgetsConstant.TEXTBOX) {
                    var e = {};
                    var detail = {};
                    var activeWidgetVo = object;
                    detail["activeWidgetVo"] = activeWidgetVo;
                    e["detail"] = detail;
                }
                return e
            }
            else {
                return e
            }
        } else {

            return e
        }


    },
    /*This function is used to disable objects of editor and hide text container when widget selection removed*/
    _widgetSelectionRemoved: function (e) {

        var _this = this;
        _this.selectedWidgetId = null;
        _this.textEditorView.selectedWidgetId = null;
        _this.textEditorView.makeUnEditableText();
        _this.setApplicationCons(_this.activeViewId);
        _this.setTextwidgets(e);
        if (_this.isMergedTextAllowed()) {
            _this.textEditorView.showHideMergedTextControls(false);
        }

    },


    /*This function is set widgets on editor . THis function is called when user add widget on editor */
    _widgetAddedOnEditor: function (e) {
        var _this = this;
        var editorModel = main.getModel(Artifi.ModelConstant.EDITOR_MODEL);
        try {
            var objectsOfText = _this.getObjectsArray();
            var flag = _this.textModel.isTextPannelRequired(_this.allowAddText, objectsOfText.length);
            var widget = e.detail.widget;
            _this.textEditorView.showOrHideNoObjectMessage(flag, objectsOfText.length);
            _this.textEditorView.checkEmbroideryAndApply(widget.id);
            _this.textEditorView.checkTextureAndApply(widget.id);
            _this.templateRendered();
        } catch (e) {
            console.log("Class:- _this   Method:- templateRendered :- widgetSelected   " + e)

        }

    },

    /*This function is set widgets on editor . THis function is called when user Change the view */
    _viewChanged: function (e) {
        var _this = this;
        _this.activeViewId = e.detail.viewId;
        _this.setApplicationCons(e.detail.viewId);
        try {
            _this.templateRendered();
        } catch (e) {
            console.log("Class:- _this   Method:- templateRendered :- widgetSelected   " + e)

        }

    },

    setApplicationCons: function (id) {
        var _this = this;
        var appConst = _this.constraintsModel.getApplicationConstraints(id);
        if (!$.isEmptyObject(appConst)) {
            _this.showAndHideTextBtn(appConst.AllowTextWidget.UserDerived);
            var objectsOfText = _this.getObjectsArray();
            _this.textEditorView.textObjectArray = objectsOfText;
            var flag = _this.textModel.isTextPannelRequired(_this.allowAddText, objectsOfText);
            _this.textEditorView.showOrHideNoObjectMessage(flag, objectsOfText.length);
            _this.textEditorView.showTextListHideTextControl(flag);
        }

    },
  
    /*Setting image Widgets*/
    setTextwidgets: function () {
        var _this = this;
        var objectsOfText = null;
        if (_this.isMergedTextAllowed()) {
            objectsOfText = _this.textModel.getAllTextObjectsArray();
        } else {
            objectsOfText = _this.getObjectsArray();
        }
        _this.textEditorView.textObjectArray = objectsOfText;
        var flag = _this.isUIPanelRequired(objectsOfText);
        _this.textEditorView.addPagination(objectsOfText, flag);
        _this.textEditorView.setTextWidgets(objectsOfText, flag, _this.allowAddText);
        if (_this.isMergedTextAllowed()) {
            _this.textEditorView.showHideMergedTextControls(!flag);
        }
    },

    isUIPanelRequired: function (objectsOfText) {
        var result;
        if (this.isMergedTextAllowed()) {
            result = this.textModel.isTextPannelRequired(this.allowAddText || this.textEditorView.isCircleTextWidgetAllowed(), objectsOfText);
        }
        else {
            result = this.textModel.isTextPannelRequired(this.allowAddText, objectsOfText);
        }
        return result;
    },

    isMergedTextAllowed: function () {
        return this.appModel.getCaptionIsRequiredByKey(this.mergedPanelCaptionKey);
    },
    /*getting object arrays from editor*/
    getObjectsArray: function () {
        var _this = this;
        var objectArray = new Array();
        var objects = {};
        if (Artifi.Utils.checkExist(_this.editorModel.getActiveFabricEditor())) {
            objects = _this.editorModel.getAllowedObjects();
            $.each(objects, function (key, val) {
                if (val.type == Artifi.WidgetsConstant.TEXTBOX) {

                    if (Artifi.Utils.stringTobool(val.selectable)) {
                        objectArray.push(val);
                    }
                }
            })
        }
        return sortBy(objectArray, this.WidgetOrder);
    },

    /*This function is used for Removing Previous HTML Code From template Part
    *data: event
    */
    removePrvHTMLview: function (e) {
        var _this = this;
        _this.textEditorView.removeHTML();
        _this.setTextwidgets();
    },

    updateTextContainer: function (e) {

        var _this = this;
        _this.showORHideTextCont(e.detail.status)


    },
    /*Show and hide text container 
    *data: status, value:- true or False
    */
    showORHideTextCont: function (status) {
        var _this = this;
        _this.textEditorView.showORHideCON(status);

    },

    /*Show and hide text button 
    *data: status, value:- true or False
    */
    showAndHideTextBtn: function (status) {
        var _this = this;
        _this.allowAddText = status;
        if (_this.isMergedTextAllowed()) {
            _this.textEditorView.showOrHideAddTextBtn(_this.allowAddText || _this.textEditorView.isCircleTextWidgetAllowed());
        }
        else {
            _this.textEditorView.showOrHideAddTextBtn(status);
        }

    },
    /*Used for updating text need Event */
    _updateTextWidgetData: function (e) {
        var _this = this;
        _this.textModel.updateTextWidget(e.detail.data, e.detail.widgetId);

    },
    /*Used for adding  text on editor*/
    _addTextWidget: function (e) {
        var _this = this;
        _this.textModel.addTextWidget();

    },
    /*Send Data for updating Widget*/
    _sendUpdateTextWidgetEvt: function (e) {
        var _this = this;
        var viewId = _this.editorModel.getActiveViewId();
        var event = jQuery.Event(Artifi.EventConstant.UPDATE_WIDGET);
        var updatedWidgetData = e.detail.widgetData;
        updatedWidgetData.viewId = viewId;
        updatedWidgetData.callback = function (widgetId) {
            _this.textEditorView.resetTextFamily(widgetId);
        };
        event.detail = {
            data: updatedWidgetData
        };
        $(ArtifiEventBus).trigger(event);


    },

    _widgetRemoved: function (e) {
        var _this = this;
        var widgetId = e.detail.widgetId;
        var widgetType = e.detail.widgetType;
        var objectsOfText = _this.getObjectsArray();
        var flag = _this.textModel.isTextPannelRequired(_this.allowAddText, objectsOfText.length);
        _this.textEditorView.showOrHideNoObjectMessage(flag, objectsOfText.length);
        if (widgetType === Artifi.WidgetsConstant.TEXTBOX && !flag && !objectsOfText.length) {
            _this.triggerSelectFirstTabEvent();
        }
        _this.textEditorView.removeTextWrapperById(widgetId);
    },

    triggerSelectFirstTabEvent: function () { 
        var event = jQuery.Event(Artifi.EventConstant.SELECT_FIRST_TAB);
        $(ArtifiEventBus).trigger(event);
    },

    //this will reset the selected widget id
    resetSelectedWidget: function (e) {
        var _this = e.data._this;
        _this.textEditorView.resetSelectedWidgetId();
    },

     /**
     * Function is used to render the object list with the embroidery details on load
     * @param {object} e
     */
    renderEmbTextList: function (e) {
        var _this = e.data._this;
        _this.textEditorView.showEmbLinkForTextWidget(e.detail.activeWidget);
    },


    /**
     * Function is used to init react component
     */
    initTextReactComponent: function () {
        console.log('sunil kashyap');
        var _this = this;
        /* Setting configurations
         *
         */

         window.ReactArtifiDispatchers = {
            CHANGE_LABEL: '[TextComponent] CHANGE_LABEL',
            CHANGE_SETTINGS: '[TextComponent] CHANGE_SETTINGS',
            ADD_TEXT_WIDGET: '[TextComponent] ADD_TEXT_WIDGET',
            UPDATE_TEXT_WIDGET_LIST: '[TextComponent] UPDATE_TEXT_WIDGET_LIST'
        }
        
        var allowAddText = _this.constraintsModel.getApplicationConstraints(_this.activeViewId).AllowTextWidget.UserDerived;
        var TextComponentSettings = {
            label: {
                lblTitle: allowAddText ? Artifi.Localization.ADD_EDIT_TEXT : Artifi.Localization.EDIT_TEXT,
                lblBtnAdd: Artifi.Localization.ADD_TEXT
            },
            isAllowAddText: allowAddText
        };

        ReactDOM.render(React.createElement(TextComponent.TextComponent), document.getElementById('artifi-text-component'));

        ArtifiStore.dispatch({
            type: '[TextComponent] CHANGE_SETTINGS',
            payload: TextComponentSettings
        });
        
        ArtifiStore.subscribe(function () {
            lastActionType = ArtifiStore.getState().lastAction.type;
            switch (lastActionType) {
                case '[TextComponent] ADD_TEXT_WIDGET':
                    _this._addTextWidget(); // existing add  text function
                    break;
            }
        })

        console.log('test');

        console.log(_this.textEditorView.textObjectArray);

        var listObjects = [];
        for(var i in _this.textEditorView.textObjectArray){
	       listObjects.push(Object.assign({}, _this.textEditorView.textObjectArray[i]));
        }
        
        ArtifiStore.dispatch({
            type: ReactArtifiDispatchers.UPDATE_TEXT_WIDGET_LIST,
            payload: listObjects
        });

    },
})