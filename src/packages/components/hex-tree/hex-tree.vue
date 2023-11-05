<template>
  <view class="hex-tree">
    <view class="hex-tree-view">
      <scroll-view class="hex-tree-view-sc" :scroll-y="true">
        <block v-for="(item, index) in treeList" :key="index">
          <view
            class="hex-tree-item"
            :style="[
              {
                paddingLeft: item.rank * 15 + 14 + 'px',
                zIndex: item.rank * -1 + 50,
              },
            ]"
            :class="{
              border: border === true,
              show: item.show,
              last: item.lastRank,
              showchild: item.showChild,
              checked: item.checked,
              big: item.rank === 0,
            }"
          >
            <view
              class="hex-tree-label"
              @tap.stop="_treeItemTapClick(item, index)"
            >
              <image
                class="hex-tree-icon"
                :src="
                  item.lastRank
                    ? lastIcon
                    : item.showChild
                    ? currentIcon
                    : defaultIcon
                "
                @tap.stop="_treeItemTap(item, index)"
              ></image>
              <view class="hex-tree-name">{{ item.name }}</view>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: "hex-tree",
  props: {
    range: {
      type: Array,
      default: function () {
        return [];
      },
    },
    idKey: {
      type: String,
      default: "id",
    },
    rangeKey: {
      type: String,
      default: "label",
    },
    childKey: {
      type: String,
      default: "child",
    },
    selectParent: {
      //是否可以选父级
      type: Boolean,
      default: false,
    },
    foldAll: {
      //折叠时关闭所有已经打开的子集，再次打开时需要一级一级打开
      type: Boolean,
      default: false,
    },
    defaultOpenId: {
      type: String,
      default: "",
    },
    currentIcon: {
      // 展开时候的ic
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAATxJREFUOE/lkyFPA0EQhd90NwGJIWm4HbICcDhQFCQSBD8BNHjQ4EHDT0CARFJwoHCkYtO9owKDhORuhxyBpjS9XmnPscmqmfdt9r0ZQsWHKubhvwKZeSUEagAypgUkIaDZ6bQfKYoiQ1RrAZiaMKAPkbBA9XrdKqVbRKQmAYpIprVa/PqiMfP7gJxOAgToII7bZ13PmPlYBIfjQIlw4r0/yrW/QjCGzwHs/hF6Ecd+70fTn6oyhi8BbI8IvYpjvwMgKwLCWjudptkNgPUSaFNrtemce+/tGzh31tqZNM1uASwXQJ+0VhvOubf+euEgM/NcCLgngu0VicDValjz3r8MemzoZkRRtATQHRHN5mIReQWkkSTJc5EdpavGzKsiuM55RNjy3j8M87YU+C3O+/IbytIfFVjG6dYrB34CuLVdALKQEJAAAAAASUVORK5CYII=",
    },
    defaultIcon: {
      // 折叠时候的ic
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAARxJREFUOE+t1b1OwzAQAOC72HmI4qYvAe8AArUzb8DKz8YLsIFg5yF4BmCCrVsXnN4FIrEwsqSH3AYUVTZyG2e82J/u7MsFIfAYY4Za67wsy7fQGl8cfcHBYLSrlDyLiEbMLpjnt7GoFzRmdIooN78IIlwR0WUMGgCLM0S4XgPumekEAJr/4E1A5zxorY6ttd8hdFPQOY9aq4m19iv6UozxltzdP0WEAyJ6X0e3yXBpiIAFWOxXVTXroluDK1Q+swwPiej1ryN85xBRcnfbBzMNAWDhgr0ybNWamXZcwr3BtuQjInrpXXLqS0nXNiLwlOdqnKqxk356fYZD4vFVFMWeO6t2wJ4zz+9iZmGwD90L9wtomkbXdW1jMbfuB/SijBW1oCvoAAAAAElFTkSuQmCC",
    },
    lastIcon: {
      // 没有子集的ic
      type: String,
      default: "",
    },
    border: {
      // 是否有分割线
      type: Boolean,
      default: false,
    },
    //章是否可以点击
    groupClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showTree: false,
      treeList: [],
      selectIndex: -1,
      idArr: [],
    };
  },
  computed: {},
  methods: {
    _show() {
      this.showTree = true;
    },
    //扁平化树结构
    _renderTreeList(list = [], rank = 0, parentId = [], parents = []) {
      list.forEach((item) => {
        this.treeList.push({
          id: item[this.idKey],
          name: item[this.rangeKey],
          source: item,
          parentId, // 父级id数组
          parents, // 父级id数组
          rank, // 层级
          showChild: false, //子级是否显示
          open: false, //是否打开
          show: rank === 0, // 自身是否显示
          hideArr: [],
          orChecked: item.checked ? item.checked : false,
          checked: item.checked ? item.checked : false,
        });
        if (
          Array.isArray(item[this.childKey]) &&
          item[this.childKey].length > 0
        ) {
          // console.log(item)
          let parentid = [...parentId],
            parentArr = [...parents];
          delete parentArr[this.childKey];
          parentid.push(item[this.idKey]);
          parentArr.push({
            [this.idKey]: item[this.idKey],
            [this.rangeKey]: item[this.rangeKey],
          });
          this._renderTreeList(
            item[this.childKey],
            rank + 1,
            parentid,
            parentArr
          );
        } else {
          this.treeList[this.treeList.length - 1].lastRank = true;
        }
      });
    },

    _treeItemTapClick(item, index) {
      if (this.groupClick) {
        this._treeItemTap2(item, index);
      } else {
        this._treeItemTap(item, index);
      }
    },

    // 点击
    _treeItemTap(item, index) {
      if (item.lastRank === true) {
        //点击最后一级时触发事件
        if (!item.checked) {
          this.$emit("confirm", item);
          this.treeList[index].checked = !this.treeList[index].checked;
          this.treeList.forEach((x, i) => {
            if (i !== index && x.lastRank) {
              x.checked = false;
            }
          });
          return;
        } else {
          return;
        }
      }
      let list = this.treeList;
      let id = item.id;
      item.showChild = !item.showChild;
      item.open = item.showChild ? true : !item.open;
      list.forEach((childItem, i) => {
        if (item.showChild === false) {
          //隐藏所有子级
          if (!childItem.parentId.includes(id)) {
            return;
          }
          if (!this.foldAll) {
            if (childItem.lastRank !== true && !childItem.open) {
              childItem.showChild = false;
            }
            // 为隐藏的内容添加一个标记
            if (childItem.show) {
              childItem.hideArr[item.rank] = id;
            }
          } else {
            if (childItem.lastRank !== true) {
              childItem.showChild = false;
            }
          }
          childItem.show = false;
        } else {
          // 打开子集
          if (childItem.parentId[childItem.parentId.length - 1] === id) {
            childItem.show = true;
          }
          // 打开被隐藏的子集
          if (childItem.parentId.includes(id) && !this.foldAll) {
            // console.log(childItem.hideArr)
            if (childItem.hideArr[item.rank] === id) {
              childItem.show = true;
              if (childItem.open && childItem.showChild) {
                childItem.showChild = true;
              } else {
                childItem.showChild = false;
              }
              childItem.hideArr[item.rank] = null;
            }
            // console.log(childItem.hideArr)
          }
        }
      });
      // console.log(this.treeList)
    },

    _treeItemTap2(item, index) {
      //点击最后一级时触发事件
      if (!item.checked) {
        console.log("111");
        this.$emit("confirm", item);
        this.treeList[index].checked = !this.treeList[index].checked;
        this.treeList.forEach((x, i) => {
          if (i !== index) {
            x.checked = false;
          }
        });
        return;
      } else {
        return;
      }
    },

    // 重置数据
    _reTreeList() {
      console.log("33333");

      this.treeList.forEach((v, i) => {
        this.treeList[i].checked = v.orChecked;
      });
    },
    _initTree(range = this.range) {
      this.treeList = [];
      this._renderTreeList(range);
      if (this.defaultOpenId) {
        let arr = this.defaultOpenId.toString().split("/");
        arr.forEach((e) => {
          let item = this.treeList.find((t) => {
            return t.id == e;
          });
          let index = this.treeList.findIndex((t) => {
            return t.id == e;
          });
          if (item) {
            this._autoOpen(item, index);
          }
        });
      }
    },

    // 自动打开章节
    _autoOpen(item, index) {
      //点击最后一级时触发事件
      if (this.groupClick) {
        if (!item.checked) {
          this.treeList[index].checked = !this.treeList[index].checked;
          this.treeList.forEach((x, i) => {
            if (i !== index) {
              x.checked = false;
            }
          });
        }
      } else {
        if (item.lastRank === true) {
          //点击最后一级时触发事件
          if (!item.checked) {
            this.treeList[index].checked = !this.treeList[index].checked;
            this.treeList.forEach((x, i) => {
              if (i !== index && x.lastRank) {
                x.checked = false;
              }
            });
          }
        }
      }

      let list = this.treeList;
      let id = item.id;
      item.showChild = true;
      item.open = true;
      list.forEach((childItem, i) => {
        if (item.showChild === false) {
          //隐藏所有子级
          if (!childItem.parentId.includes(id)) {
            return;
          }
          if (!this.foldAll) {
            if (childItem.lastRank !== true && !childItem.open) {
              childItem.showChild = false;
            }
            // 为隐藏的内容添加一个标记
            if (childItem.show) {
              childItem.hideArr[item.rank] = id;
            }
          } else {
            if (childItem.lastRank !== true) {
              childItem.showChild = false;
            }
          }
          childItem.show = false;
        } else {
          // 打开子集
          if (childItem.parentId[childItem.parentId.length - 1] === id) {
            childItem.show = true;
          }
          // 打开被隐藏的子集
          if (childItem.parentId.includes(id) && !this.foldAll) {
            // console.log(childItem.hideArr)
            if (childItem.hideArr[item.rank] === id) {
              childItem.show = true;
              if (childItem.open && childItem.showChild) {
                childItem.showChild = true;
              } else {
                childItem.showChild = false;
              }
              childItem.hideArr[item.rank] = null;
            }
            // console.log(childItem.hideArr)
          }
        }
      });
    },
  },
  watch: {
    range: {
      handler(val) {
        this._initTree(val);
      },
      deep: true, // 深度监听
      immediate: true,
    },
    selectParent: {
      handler(val) {
        if (this.range.length) {
          this._reTreeList();
        }
      },
      deep: true, // 深度监听
      immediate: true,
    },
  },
  mounted() {
    this._initTree();
  },
};
</script>

<style lang="scss">
.hex-tree-view {
  background-color: #fff;
}
.hex-tree-view-sc {
  height: 100%;
  overflow: hidden;
}
.hex-tree-item {
  display: flex;
  justify-content: space-between;
  padding-right: 48rpx;
  align-items: center;
  font-size: 28rpx;
  line-height: 96rpx;
  height: 0;
  opacity: 0;
  transition: 0.2s;
  position: relative;
  overflow: hidden;
  width: 100%;
  font-weight: 500;
  color: #1c1c1d;
}
.hex-tree-item.big {
  font-size: 32rpx;
}
.hex-tree-item.show {
  height: 96rpx;
  opacity: 1;
}
.hex-tree-item.checked {
  color: #196fff;
  background: rgba(25, 111, 255, 0.1);
}
.hex-tree-item.showchild:before {
  transform: rotate(90deg);
}
.hex-tree-item.last:before {
  opacity: 0;
}
.hex-tree-icon {
  width: 20rpx;
  height: 20rpx;
  padding: 20rpx;
}
.hex-tree-label {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  line-height: 1.2;
  .hex-tree-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.hover-c {
  opacity: 0.6;
}
</style>
