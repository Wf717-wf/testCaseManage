<template>
 <div id="conatiner">
    <el-container class="el-container">
      <el-header class="el-header">
        <div>
          <img src="../assets/logo.png" alt="" />
          <span>测试管理系统</span>
        </div>
        <el-button type="primary" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside class="el-aside" :width="collapse ? '64px' : '300px'">
          <div class="elbutton" @click="isCollapse">|||</div>
          <el-row class="tac" style="width: 100%">
            <el-col :span="12" style="width: 100%">
              <el-menu
                background-color="#eee"
                active-text-color="#409EFF"
                :collapse="collapse"
                unique-opened
                router
              >
                <el-submenu
                  v-for="item in menus"
                  :index="item.id + ''"
                  :key="item.id"
                >
                  <template slot="title">
                    <i :class="iconObj[item.id]" style="margin-right: 15px"></i>
                    <span>{{ item.authName }}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      :key="subItem.path"
                      :index="subItem.path + ''"
                      v-for="subItem in item.children"
                    >
                      <i class="el-icon-document"></i>
                      <span>{{ subItem.authName }}</span></el-menu-item
                    >
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main class="el-main"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      menus:[
      {
            "id": 101,
            "authName": "用例管理",
            "path": null,
            "children": [
                {
                    "id": 125,
                    "authName": "用户管理",
                    "path": '/user',
                    "children": []
                },
                {
                    "id": 104,
                    "authName": "测试管理",
                    "path": "/testcase",
                    "children": []
                },
            ]
        }
      ],
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 默认不折叠
      isCollapse: false,
      // 被激活导航地址
      activePath: ''
    };
  },
  methods: {
     
  }
};
</script>
<style scoped>
#container{
  margin-top:0;
}
.el-header {
  background: rgb(50, 51, 51);
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: rgb(217, 235, 231);
  align-items: center;
}
img {
  width: 60px;
  height: 100%;
  border-radius: 50%;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  margin-left: 15px;
}
.el-container {
  height: 100vh;
}
.el-aside {
  background: rgb(110, 107, 107);
}
.elbutton {
  text-align: center;
}
</style>