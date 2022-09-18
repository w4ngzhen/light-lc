import {TypeRenderer, TypeRendererConstructor} from "./TypeRenderer";
import {PageRenderer} from "./impl/PageRenderer";
import {ButtonRenderer} from "./impl/ButtonRenderer";
import {InputRenderer} from "./impl/InputRenderer";


/**
 * TypeRenderer管理器
 */
class TypeRendererManager {

    /**
     * 单实例
     * @private
     */
    private static instance: TypeRendererManager;

    /**
     * 内存单例获取
     */
    static getInstance(): TypeRendererManager {
        if (!TypeRendererManager.instance) {
            TypeRendererManager.instance = new TypeRendererManager();
        }
        return TypeRendererManager.instance;
    }

    /**
     * 单例，构造函数private控制
     * @private
     */
    private constructor() {
    }

    /**
     * 这里记录了目前所有的TypeRenderer映射，
     * 后续可以优化为程序进行扫描实现，不过是后话了
     * @private
     */
    private typeRendererConstructors: Record<string, TypeRendererConstructor> = {
        page: PageRenderer,
        button: ButtonRenderer,
        input: InputRenderer
    };

    /**
     * 根据元素类型得到对应渲染器
     * @param elementType
     */
    getTypeRenderer(elementType: string): TypeRenderer {
        if (!this.typeRendererConstructors.hasOwnProperty(elementType)) {
            throw new Error('找不到处理')
        }
        // 采用ES6的Reflect反射来处理对象创建，供后续扩展优化
        return Reflect.construct(this.typeRendererConstructors[elementType], [])
    }
}

export {
    TypeRendererManager
}
