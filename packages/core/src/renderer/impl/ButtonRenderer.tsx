import {TypeRenderer, TypeRendererContext} from "../TypeRenderer";
import React, {ReactNode} from "react";
import {Button} from "antd";

export class ButtonRenderer implements TypeRenderer {

    render(rendererContext: TypeRendererContext,
           childrenReactNode?: ReactNode[]): JSX.Element {
        const {path, elementNode = {}} = rendererContext;
        const {text = 'button'} = elementNode;
        return (
            <Button
                key={path}
                type='primary'>
                {text}
            </Button>
        )
    }

}
