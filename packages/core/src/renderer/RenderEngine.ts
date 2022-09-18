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
        // 起始节点，需要构造一个起始path传入innerBuild
        // 注意，根节点由于不属于某一个父级的子元素，所以不存在'@${index}'
        return this.innerBuild(rootEleNode, '/' + rootEleNode.type);
    }

    /**
     * 构建：通过传入ElementNode信息，得到该节点对应供React渲染的ReactNode
     * @param rootEleNode
     * @param path
     */
    private innerBuild(rootEleNode: ElementNode, path: string): JSX.Element | undefined {
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
            (children || []).map((childEleNode, index) => {
                // 子元素路径：
                // 父级路径（也就是当前path）+ '/' + 子元素类型 + 子元素所在索引
                const childPath = `${path}/${childEleNode.type}@${index}`;
                return this.innerBuild(childEleNode, childPath)
            });
        const reactNode = typeRenderer.render(
            {path: path, elementNode: rootEleNode},
            childrenReactNode
        )
        return reactNode;
    }
}
