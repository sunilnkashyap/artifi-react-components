export interface TitleModel {
    
    titleText: string;
    isAllowText: boolean;
    btnText: string;
    
    containerClass?: string;
    btnClass?: string;
    titleExtra?: any;
}

// Define our initialState
export const TitleInitialState: TitleModel = {
    titleText: 'Add/Edit Text',
    isAllowText: true,
    btnText: 'Add Text'
}

export interface TitleEvent {
    evtName: string,
    evtPayload?: any
}


export const TitleActionTypes = {
    UPDATE_SETTINGS : (window as any).RxArtifiConstants.TEXT_UPDATE_SETTINGS,
    TRIGGER_EVENT : (window as any).RxArtifiConstants.TEXT_TRIGGER_EVENT,
    EVT_CLICK_ADD_BUTTON : (window as any).RxArtifiConstants.TEXT_EVT_CLICK_ADD_BUTTON
}


export const Constants = {
    moduleTag : (window as any).RxArtifiConstants.MODULE_TAG_NAME,
    outsideEvents : (window as any).RxArtifiConstants.OUTSIDE_EVENT_NAME
}