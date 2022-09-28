<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            <el-card class="box-card" shadow="never">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-input v-model="tester_id" placeholder="请输入工号" clearable>
                                <el-button slot="append" icon="el-icon-search" @click="getsearchUserList"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-table border style="width:100%" :data="userList" class="el-table">
                    <el-table-column prop="tester_id" label="工号" width="180"></el-table-column>
                    <el-table-column prop="tester_name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="tester_password" label="密码" width="180"></el-table-column>
                    <el-table-column prop="tester_experience" label="工作经验" width="180"></el-table-column>
                    <el-table-column prop="tester_phone" label="电话"></el-table-column>
                    <el-table-column prop="" label="操作">
                        <template v-slot="scope">
                            <!-- 作用域插槽 -->
                            <!-- 修改按钮 -->
                            <el-tooltip effect="dark" content="修改信息" placement="top" :enterable="false">
                                <el-button type="primary" icon="el-icon-edit" size="mini"
                                    @click="showUpdateDialog(scope.row.tester_id)"></el-button>
                            </el-tooltip>
                            <!-- 删除按钮 -->
                            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                                <el-button type="danger" icon="el-icon-delete" size="mini"
                                    @click="deleteUser(scope.row.tester_id)"></el-button>
                            </el-tooltip>
                            <!-- 分配角色按钮 -->
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页组件 -->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="userList.pagenum" :page-sizes="[1, 3, 5, 6]" :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper" :total=this.total>
                </el-pagination>
            </el-card>
            <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" @close="dialogClose('addFormRef')">
                <el-form label-width="100px" :model="addForm" ref="addFormRef" :rules="rules">
                    <el-form-item label="姓名" prop="tester_name">
                        <el-input v-model="addForm.tester_name"></el-input>
                    </el-form-item>
                    <el-form-item label="账户" prop="tester_username">
                        <el-input v-model="addForm.tester_username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="tester_password">
                        <el-input v-model="addForm.tester_password"></el-input>
                    </el-form-item>
                    <el-form-item label="工作经验" prop="tester_experience">
                        <el-input v-model="addForm.tester_experience"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="tester_phone">
                        <el-input v-model="addForm.tester_phone"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser('addFormRef')">添加</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改用户" :visible.sync="updatedialogVisible" width="30%">
                <el-form label-width="100px" :model="updateForm" ref="updateFormRef" :rules="rules">
                    <el-form-item label="工号">
                        <el-input v-model="updateForm.tester_id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="tester_name">
                        <el-input v-model="updateForm.tester_name"></el-input>
                    </el-form-item>
                    <el-form-item label="账户" prop="tester_username">
                        <el-input v-model="updateForm.tester_username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="tester_password">
                        <el-input v-model="updateForm.tester_password"></el-input>
                    </el-form-item>
                    <el-form-item label="工作经验" prop="tester_experience">
                        <el-input v-model="updateForm.tester_experience"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="tester_phone">
                        <el-input v-model="updateForm.tester_phone"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updatedialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateUser">保存</el-button>
                </div>
            </el-dialog>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //关键字参数
            tester_id: "",
            queryInfo: {
                //当前页数
                pagenum: "1",
                //每页多少条
                pagesize: "4"
            },
            //测试员数量
            total: "",
            //对应id的用户信息
            userInfo: [],
            //用户列表
            userList: [],
            value: true,
            currentPage1: 5,
            //添加用户对话框是否显示
            dialogVisible: false,
            //修改用户信息对话框是否显示
            updatedialogVisible: false,
            //添加用户
            addForm: {
                tester_id: "",
                tester_name: "",
                tester_experience: "",
                tester_phone: "",
                tester_username: "",
                tester_password: ""
            },
            //修改用户
            updateForm: {},
            rules: {
                tester_id:
                    [
                        { required: true, trigger: "blur" }
                    ],
                tester_name: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 2, max: 8, message: "长度在2到8位之间", trigger: "blur" },
                ],
                tester_experience: [
                    { required: true, message: "请输入工作经验", trigger: "blur" },
                    { min: 2, max: 8, message: "长度在2位以上", trigger: "blur" },
                ],
                tester_phone: [
                    { required: true, message: "请输入电话", trigger: "blur" },
                    { min: 7, max: 11, message: "长度在7到11位之间", trigger: "blur" },
                ],
                tester_username: [
                    { required: true, message: "请输入账户名", trigger: "blur" },
                    { min: 2, max: 8, message: "长度在2到8位之间", trigger: "blur" },
                ],
                tester_password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 2, max: 8, message: "长度在2到8位之间", trigger: "blur" },
                ],
            },
        };
    },
    created() {
        this.getUserList()
        this.handleSizeChange(pagesize)
        this.handleCurrentChange(pagenum)
    },
    methods: {
        //获取用户列表&&分页列表
        async getUserList() {
            const { data: res } = await this.$http.get("/api/user/page", {
                params: this.queryInfo
            })
            console.log(res)
            if (res.status != 200) {
                this.$message.error("no data")
            }
            else {
                this.userList = res.data
                this.total = res.total
                console.log(this.queryInfo)
                console.log(this.userList)
            }
        },
        //监听pagesize的事件
        handleSizeChange(pagesize) {
            console.log(`每页 ${pagesize} 条`);
            this.queryInfo.pagesize = pagesize;
            this.getUserList();
        },
        //监听页码值改变事件
        handleCurrentChange(pagenum) {
            console.log(`当前页: ${pagenum}`);
            this.queryInfo.pagenum = pagenum;
            this.getUserList();
        },
        //添加新用户
        addUser(addFormRef) {
            this.$refs[addFormRef].validate(async (valid) => {
                if (!valid) return;
                const { data: res } = await this.$http.post("/api/user/insert", this.addForm);
                if (res.meta.status !== 200) {
                    return this.$message.error("用户添加失败");
                }
                this.dialogVisible = false;
                this.getUserList();
                return this.$message.success("用户添加成功");
            });
        },
        //获取搜索用户数据
        async getsearchUserList() {
            const { data: res } = await this.$http.get("/api/user/search", {
                params: {
                    "tester_id": this.tester_id
                }
            })
            console.log(res)
            if (res.meta.status != 200) {
                this.$message.error("no data")
            }
            else {
                this.userList = res.data
            }
        },
        //展示修改用户对话框并展示信息
        async showUpdateDialog(id) {
            console.log(id)
            this.updatedialogVisible = true
            const { data: res } = await this.$http.get("/api/user", {
                params: {
                    "tester_id":id
                }
            });
            if (res.meta.status != 200) {
                return this.$message.error("获取列表失败");
            }
            else {
                this.updateForm=res.data
                console.log(this.updateForm)
            }
        },
        //修改用户信息
        async updateUser(){
            const { data: res } = await this.$http.post("/api/user/update",this.updateForm)
            if (res.meta.status != 200) {
                this.$message.error("修改失败")
            }
            else {
                this.$message.success("修改成功")
                this.getUserList()
            }
            this.updatedialogVisible=false
        },
        //删除用户信息
        async deleteUser(id){
            console.log(id)
            const {data:res}=await this.$http.get("/api/user/delete",{params:{
                "tester_id":id
            }})
            console.log(res)
            if (res.meta.status != 200) {
                return this.$message.error("删除用户失败");
            }
            else {
                this.$message.success("删除用户成功")
                this.getUserList();
            }
        }
        
    }
};
</script>

<style scoped>
.box-card {
    margin-top: 20px;
    width: 100%;
}

.el-table {
    margin-top: 20px;
}
</style>