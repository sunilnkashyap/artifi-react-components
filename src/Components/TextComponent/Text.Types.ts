export interface TextModel {
    label?: any,
    isAllowAddText?: boolean,
    list?: any,
    selectedWidget?: object,
    details?: {
        showUpdateTextBtn?: boolean,
        defaultFontFamily?: any,
        fontFamily?:any,
        data?: any
    }
}

// Define our initialState
export const TextInitialState: TextModel = {
    label: {
        lblTitle: 'Add/Edit Text',
        lblBtnAdd: 'Add Text',
        lblMsgTxtNotAvailable: "Plaese click 'Add Text' for text editing options.",
        msgTextLineError: "Text lines exceeds number of allowed lines",
        msgTextCharLimitError: "You have exceeded the maximum character limit. Please reduce the number of characters to update text.",
        msgInvalidChar: "Invalid Character entered",
        lblFontFamily: "Font Family"
    },
    isAllowAddText: true,
    list: [],
    selectedWidget: {},
    details: {
        showUpdateTextBtn: false,
        defaultFontFamily: {
            "Name": "Arial",
            "Label": "Arial",
            "Regular": true,
            "Bold": true,
            "Italic": true,
            "BoldItalic": true,
            "IsPublic": true,
            "Code": "F1",
            "ImageName": "7817cac4-1b18-4568-990d-7471bb120f31.png",
            "FontType": "TypeA",
            "DisplayOrder": null,
            "FontVersionCounter": 0,
            "GlobalFontSetId": 0,
            "Id": 13
          },
        fontFamily: [],
        data: {            
            text: ''
        }
    }
}


export const TextActionTypes = {
    CHANGE_LABEL: '[TextComponent] CHANGE_LABEL',
    CHANGE_SETTINGS: '[TextComponent] CHANGE_SETTINGS',
    ADD_TEXT_WIDGET: '[TextComponent] ADD_TEXT_WIDGET',
    UPDATE_TEXT_WIDGET_LIST: '[TextComponent] UPDATE_TEXT_WIDGET_LIST',
    SELECT_TEXT_WIDGET: '[TextComponent] SELECT_TEXT_WIDGET',
    UPDATE_TEXTAREA_VALUE: '[TextComponent] UPDATE_TEXTAREA_VALUE',
    UPDATE_FONT_FAMILY_LIST: '[TextComponent] UPDATE_FONT_FAMILY_LIST',
    UPDATE_DEFAULT_FONT_FAMILY: '[TextComponent] UPDATE_DEFAULT_FONT_FAMILY',
    UPDATE_FONT_SIZE: '[TextComponent] UPDATE_FONT_SIZE',
    BTN_CLICK_BOLD: '[TextComponent] BTN_CLICK_BOLD',
    BTN_CLICK_ITALIC: '[TextComponent] BTN_CLICK_ITALIC',
    BTN_CLICK_ALIGN: '[TextComponent] BTN_CLICK_ALIGN',
    BTN_CLICK_VALIGN: '[TextComponent] BTN_CLICK_VALIGN',
    REMOVE_SELECTION: '[TextComponent] REMOVE_SELECTION'
}


export interface TextEvent {
    evtName: string,
    evtPayload?: any
}

