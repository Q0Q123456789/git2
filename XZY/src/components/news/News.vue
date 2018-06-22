<template>
  <div id="main">
    <div class="input">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
         <el-select  v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="玻化砖" value="1"></el-option>
          <el-option label="全抛釉" value="2"></el-option>
          <el-option label="金刚石" value="3"></el-option>
          <el-option label="微晶石" value="4"></el-option>
          <el-option label="瓷片墙" value="5"></el-option>
          <el-option label="瓷片地" value="6"></el-option>
          <el-option label="仿古砖" value="7"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="app()"></el-button>
      </el-input>
    </div>
    <div class="">
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:3000/performance/model/upload.do"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
  name: "News",
  props: ["msg"],
  data() {
    return {
      data: [],
      input: "",
      select: "",
      fileList:[{
        name:'',
        url:''
      }]
    };
  },
  mounted() {

  },
  methods: {
    app: function() {
      console.log(this.input);
      console.log(this.select);
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style lang="less">
#main {
  // width: 100%;
  height: 500px;
  border: 1px solid #000;
  background: #fff;
  .input {
    width: 500px;
    margin: 10px;
    .el-input.el-input--suffix {
      width: 100px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
  }
}
</style>

