import {TypeRenderer, TypeRendererContext} from "../TypeRenderer";
import React, {CSSProperties, ReactNode} from "react";

export class PageRenderer implements TypeRenderer {

    render(rendererContext: TypeRendererContext,
           childrenReactNode?: ReactNode[]): JSX.Element {
        const style: CSSProperties = {
            width: '100%',
            height: '100%',
            padding: '10px'
        }
        return (
            <div style={style}>
                {childrenReactNode}
            </div>
        )
    }
}
