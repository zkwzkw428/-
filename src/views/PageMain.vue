<template>
    <div>
        <el-container>
            <el-aside width="auto" style="height: 100%;">
                <AsideCommon></AsideCommon>
            </el-aside>
            <el-container>
                <el-header>
                    <HeaderCommon></HeaderCommon>
                </el-header>
                <tagCommon></tagCommon>
            <el-main>
                <router-view></router-view>
            </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import AsideCommon from '../components/AsideCommon.vue'
import HeaderCommon from '../components/HeaderCommon.vue'
import tagCommon from '../components/tagCommon.vue'
export default {
    name:'PageMain',
    data(){
        return{

        }
    },
    components:{
        AsideCommon,
        HeaderCommon,
        tagCommon,
    }
}
</script>

<style lang="less" scoped>
.el-header{
    padding: 0;
}
</style>