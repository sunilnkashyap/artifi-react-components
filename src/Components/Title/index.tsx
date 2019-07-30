
import React from 'react';
import Title from './Title.Container';
import { Provider } from 'react-redux'
import { Store } from "redux";

export class CanvasToolbar extends React.Component {
    constructor(props: any) {
      super(props);
    }
  
    render() {
      return (
        <Provider store={((window as any).ArtifiStore as Store )}>
            <Title />
        </Provider>
      );
    }
  }