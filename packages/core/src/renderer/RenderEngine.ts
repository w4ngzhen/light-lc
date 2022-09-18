import {ElementNode} from "./ElementNode";
import {TypeRendererManager} from "./TypeRendererManager";

/**
 * 渲染引擎
 */
export class RenderEngine {

    /**
     * 构建：通过传入ElementNode信息，得到该节点对应供React渲染的ReactNode
     * @param rootEleNode
     */
    build(rootEleNode: ElementNode): JSX.Element | undefined {
        return this.innerBuild(rootEleNode);
    }

    /**
     * 构建：通过传入ElementNode信息，得到该节点对应供React渲染的ReactNode
     * @param rootEleNode
     */
    private innerBuild(rootEleNode: ElementNode): JSX.Element | undefined {
        if (!rootEleNode) {
            return undefined;
        }
        const {type, children} = rootEleNode;
        // 通过 typeRendererManager 来统一查找对应ElementType的Renderer
        const typeRenderer = TypeRendererManager.getInstance().getTypeRenderer(type);
        if (!typeRenderer) {
            console.warn(`找不到type="${type}"的renderer`)
            return undefined;
        }
        // 递归调用自身，获取子元素处理后的ReactNode
        const childrenReactNode =
            (children || []).map((childEleNode) => {
                return this.innerBuild(childEleNode)
            });
        const reactNode = typeRenderer.render(
            {elementNode: rootEleNode},
            childrenReactNode
        )
        return reactNode;
    }
}
