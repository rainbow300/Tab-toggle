var that;
class Tab {
    constructor(id) {
            // 获取对象
            that = this;
            this.main = document.querySelector(id);
            // li的父元素
            this.ul = this.main.querySelector(".fisrstnav ul:first-child");
            // section 父元素
            this.fsection = this.main.querySelector(".tabscon")
            this.tabadd = this.main.querySelector(".tabadd")
            this.init()
        }
        // init 初始化操作让相关的元素绑定事件
    init() {
            // 初始化的时候需要获取更新后的数据
            this.updataEle()
            this.tabadd.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.closecons[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
        }
        // 因为我们动态添加元素 需要从新获取对应的元素
    updataEle() {
            this.lis = this.ul.querySelectorAll("li");
            this.sections = this.fsection.querySelectorAll("section")
            this.closecons = this.main.querySelectorAll(".icon-guanbi");
            this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child")
        }
        // 切换功能
    toggleTab() {
            that.clearCurrent();
            this.className = "liactive";
            var index = this.index;
            that.sections[index].className = "conactive";
        }
        // 清除样式表,调用了2次,单独写出来提高效率
    clearCurrent() {
            for (var i = 0; i < that.lis.length; i++) {
                this.lis[i].className = "";
                this.sections[i].className = "";
            }
        }
        // 添加列表
    addTab() {
        that.clearCurrent()
        var i = Math.random();
        // 主要添加新li，默认是选中状态
        var li = '<li  class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
        var section = "<section  class='conactive'>" + i + "</section>"
            // 这个是添加内容新语法，很好用哦
        that.ul.insertAdjacentHTML("beforeEnd", li);
        that.fsection.insertAdjacentHTML("beforeEnd", section);
        // 添加完之后还需要初始化一下，方便给新增加的元素加方法 
        that.init();
    }
    removeTab(e) {
        // 防止点删除间的时候产生父元素切换，冒泡现象
        e.stopPropagation();
        var index = this.parentNode.index;
        // 删除2项
        this.parentNode.remove();
        that.sections[index].remove();
        that.init();
        // 删除完后需要默认选中
        if (document.querySelector(".liactive")) { return }
        index--;
        // 利用逻辑与的关系
        that.lis[index] && that.lis[index].click();
    }
    editTab() {
        var text = this.innerHTML;
        // 双击禁止选中
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text">'
        var input = this.children[0];
        input.value = text;
        input.select();
        input.onblur = function() {
            var text = this.value;
            this.parentNode.innerHTML = text;
        }
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                this.onblur()
            }
        }
    }
}
tab = new Tab("#tab")