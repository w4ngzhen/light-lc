import {RenderEngine} from "@light-lc/core";
import {ChangeEvent, useState} from "react";
import {Input} from "antd";

const renderEngine = new RenderEngine();

export function SimpleExample() {
    const [elementNodeJson, setElementNodeJson] = useState(JSON.stringify({
        "type": "page",
        "backgroundColor": "pink", // page的 backgroundColor 配置
        "children": [
            {
                "type": "button",
                "size": "blue" // button的size配置
            },
            {
                "type": "input"
            }
        ]
    }, null, 2))

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setElementNodeJson(value);
    }

    let reactNode;
    try {
        const eleNode = JSON.parse(elementNodeJson);
        reactNode = renderEngine.build(eleNode);
    } catch (e) {
        reactNode = <div>JSON格式出错</div>
    }

    return (
        <div style={{width: '100%', height: '100%', padding: '10px'}}>
            <div style={{width: '100%', height: 'calc(50%)'}}>
                <Input.TextArea
                    autoSize={{minRows: 2, maxRows: 10}}
                    value={elementNodeJson} onChange={onChange}/>
            </div>
            <div style={{width: '100%', height: 'calc(50%)', border: '1px solid gray'}}>
                {reactNode}
            </div>
        </div>
    );
}
