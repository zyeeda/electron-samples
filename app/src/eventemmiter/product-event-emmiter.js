/* @flow */

const util         = require("util"),
      EventEmitter = require("events").EventEmitter;

class ProductAppEventEmmiter extends EventEmitter {
    constructor() {
        super();
    }

    // 新增数据操作提交后刷新列表数据
    afterFormSubmit(product) {
        // emit 触发绑定的 refreshTable 事件
        this.emit("refreshTable", product);
    }

    // 点击编辑按钮后将当前点击的数据设置为可编辑状态
    afterHandleEdit(product) {
        // emit 触发绑定的 resetEditStatus 事件
        this.emit("resetEditStatus", product);
    }

    // 点击取消编辑按钮后清除所有数据的可编辑状态
    afterHandleCancleEdit() {
        // emit 触发绑定的 clearEditStatus 事件
        this.emit("clearEditStatus");
    }

    // 确定编辑操作后刷新列表数据
    afterDoEdit(product) {
        // emit 触发绑定的 refreshTable 事件
        this.emit("refreshTable", product);
    }

    // 确定删除数据操作后刷新列表数据
    afterDel(product) {
        // emit 触发绑定的 refreshTable 事件
        this.emit("refreshTable", product);
    }

    // 搜索框数据改变后过滤列表数据
    searchIptChange(filterText) {
        // emit 触发绑定的 filterTable 事件
        this.emit("filterTable", filterText);
    }
}

module.exports = new ProductAppEventEmmiter();
