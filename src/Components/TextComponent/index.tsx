
import React from 'react';
import { Provider } from 'react-redux'
import { Store } from "redux";

import TextComponentWrapper from './Text.Container'

export class TextComponent extends React.Component {
    constructor(props: any) {
      super(props);      
    }
  
    render() {
      return (
        <Provider store={((window as any).ArtifiStore as Store )}>
          <TextComponentWrapper />
        </Provider>
      );
    }
  }