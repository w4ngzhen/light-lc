import {TypeRenderer, TypeRendererContext} from "../TypeRenderer";
import React, {ReactNode} from "react";
import {Input} from "antd";

export class InputRenderer implements TypeRenderer{
    render(rendererContext: TypeRendererContext,
           childrenReactNode?: ReactNode[]): JSX.Element {
        return (
            <Input />
        )
    }
}
