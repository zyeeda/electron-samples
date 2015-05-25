/* @flow */

import {EventEmitter} from 'events';

class ProductAppEventEmmiter extends EventEmitter {
    constructor(): void {
        super();
    }

    // 点击编辑按钮后将当前点击的数据设置为可编辑状态
    afterHandleEdit(product: any) {
        // emit 触发绑定的 resetEditStatus 事件
        this.emit("resetEditStatus", product);
    }

    // 确定编辑操作后刷新列表数据
    clearEditStatus(): void {
        // emit 触发绑定的 clearEditStatus 事件
        this.emit("clearEditStatus");
    }

    // 搜索框数据改变后过滤列表数据
    searchIptChange(filterText: string): void {
        // emit 触发绑定的 filterTable 事件
        this.emit("filterTable", filterText);
    }
}

export default new ProductAppEventEmmiter();
