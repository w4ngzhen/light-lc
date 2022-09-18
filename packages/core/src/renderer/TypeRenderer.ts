import {ReactNode} from "react";
import {ElementNode} from "./ElementNode";

/**
 * 渲染器渲染上下文，至少包含ElementNode的相关数据
 */
export interface TypeRendererContext {
    /**
     * path：让每个TypeRenderer知道当前渲染的元素所在的路径
     */
    path: string;
    elementNode: Omit<ElementNode, ''>;
}

/**
 * 绑定Type的渲染器
 */
export interface TypeRenderer {
    /**
     * 根据ElementNode上下文信息，得到JXS.Element，供React渲染
     * @param rendererContext 渲染器接受的数据上下文
     * @param childrenReactNode 已经完成渲染的子节点的ReactNode
     */
    render(
        rendererContext: TypeRendererContext,
        childrenReactNode?: ReactNode[],
    ): JSX.Element;
}

/**
 * TypeRenderer构造函数类型
 */
export type TypeRendererConstructor = new (args: any) => TypeRenderer;
