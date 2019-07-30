import { DRAG_TOOLBAR } from "../../Store/actions";

export const DragToolbar = (message: string) => ({
    type: DRAG_TOOLBAR,
    message
});