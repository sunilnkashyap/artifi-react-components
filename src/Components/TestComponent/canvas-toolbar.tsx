import * as React from "react";
import { ToolbarPropTypes } from "./toolbar-types";
import { Store } from "redux";
import { DragToolbar } from "./Test.Actions";
import { connect, Provider } from "react-redux";

export class CanvasToolbar extends React.Component<ToolbarPropTypes> {
  constructor(props: any) {
    super(props);
    console.log(1, { props });
  }

  onDubleClick = (event: any) => {
    console.log(event.target.id, this.props);
    ((window as any).afrifiStore as Store).dispatch(DragToolbar(event.target.id));
  };

  render() {
    return (
      <Provider store={(window as any).afrifiStore}>
        <div>
          <table style={{ border: 1, borderStyle: "solid" }}>
            <tbody>
              <tr>
                <td
                  id={"rectangle"}
                  onDoubleClick={this.onDubleClick}
                  style={{ border: 1, borderStyle: "solid" }}
                >
                  Rectangle
                </td>
                <td
                  id={"circle"}
                  onDoubleClick={this.onDubleClick}
                  style={{ border: 1, borderStyle: "solid" }}
                >
                  Circle
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Provider>
    );
  }
}

export default connect()(CanvasToolbar);

// export default CanvasToolbar;
// const mapStateToProps = (state: ToolbarPropTypes) => ({
//   dragToolbar: state.dragToolbar
// });

// export default connect(
//   mapStateToProps,
//   { DragToolbar }
// )(CanvasToolbar);
