<template>
  <div class="content-box" v-loading="loading">
      <el-container>
        <el-aside class="animate-left-side" v-bind:style="{ width: widthnum+'px'}">
            <div class="aside-header">组织列表<i class="iconfont icon-fanhui3" @click="leftside" style="cursor:pointer;font-size:12px;color:#942987;float:right;padding-right:10px;"></i></div>
          <el-input
            placeholder="请您输入部门进行搜索"
            v-model="filterText"
            style="width: 95%; border-top:1px solid #dfdfdf; border-bottom:1px solid #dfdfdf;padding: 10px 0"
          >
          </el-input>
          <el-tree
          	class="filter-tree"
          	:data="treedata"
          	:props="defaultProps"
          	tooltip-effect="dark"
						node-key="id"
						:highlight-current= true
            :default-expanded-keys="[1]"
          	:filter-node-method="filterNode"
          	ref="tree"
          	:render-content="renderTree"
          	style="margin:10px auto;"
          	>

          </el-tree>
        </el-aside>

        <el-main>
        	<div v-if="indexInfo">
        		<h4>{{sectionnameAll}}  <el-button style="font-weight: normal;margin-left:20px;"@click="addbutton" size="small" type="primary">添加子部门</el-button></h4>
        		<img src="../../../static/banner.jpg" width="100%">

        		<h4><span style="padding:0 3px;margin-right:5px;background:#942987;border-radius:4px;"></span>学校简介</h4>
        		<div>
        			  &nbsp;&nbsp;&nbsp;天津市第二南开学校的前身是1923年由张伯苓先生创建的南开中学女生部，1937年7月天津南开中学女中部校舍被日寇飞机轰炸焚毁，1978年被定为天津市首批办好的市级重点中学。  1992年、2001年二次列入《中国名校》。天津第二南开中学是南开系列学校的重要部分，是南开校友总会的成员。 <br/><br/>
  &nbsp;&nbsp;&nbsp;学校由市区政府总投资2.1亿，学校建筑面积42000平方米。学校初高中共有教学班86个，可容纳4000余名学生就读。学校的主体建筑有8层的综合办公楼，其南侧为第一教学楼、电教信息楼、大会堂、科普馆，北侧为第二教学楼、实验楼、报告厅和多功能体育馆，校园东部有多功能综合体育运动场，其北端第三教学楼和南端的学生公寓、师生餐厅遥遥相对。千兆校园网、遍及全校的800多个计算机终端、丰富海量的校园网络资源，也成为现代化学校的一个风景线。 <br/><br/>
  &nbsp;&nbsp;&nbsp;1985年在海内外校友的强烈要求下，经市人民政府批准，学校正式更名为天津市第二南开中学，并由当时全国政协副主席赵朴初先生题写了校名。  在多年的办学中，学校得到社会各界以及海内外校友的关心、支持与帮助，学校已取得了辉煌的成绩。2015年6月第二南开中学小学部成立，从此，第二南开中学的办学规模延伸到义务教育小学阶段，成为市内六区公办重点校中首所九年一贯制学校,涵盖小学、初中、高中，教育体系更加完备、教育生态系统更加丰富的学校。<br/> <br/>
        		</div>

        	</div>

		      <div v-if="!indexInfo" v-loading="loadingright">
		        	<h4 style="border-bottom:1px solid #dfdfdf;padding-bottom:10px;font-weight:normal">
		        		{{sectionnameAll}}
		        	</h4>
						<div v-if="!active">
		        	<div class="button-info">
		        		<el-button @click="editbutton" size="small" type="primary">修改部门信息</el-button>
		        		<el-button @click="addbutton" size="small" type="primary">添加子部门</el-button>
		        		<el-button @click="deletebutton" size="small" type="info" disabled>撤销部门</el-button>
		        	</div>

		        		<div class="main-info bordrradius">
		        			<!--<h4><i class="iconfont icon-jiaowuguanli title-icon"></i>{{orgationInfo.sectionname}}</h4>-->
		        			<h4><i class="iconfont icon-jiaowuguanli title-icon"></i>{{sectionnameAllTitle}}</h4>
		        			<el-row :gutter="20">
									  <el-col :span="12">
									  	<div class="grid-content"><span class="dot"></span>部门id：{{bumenid}}</div>
									  	<div class="grid-content"><span class="dot"></span>组织状态：{{orgationInfo.sectionstatus==0?'正常':'正常'}}</div>
									  </el-col>
									  <el-col :span="12">
									  	<div class="grid-content"><span class="dot"></span>上级组织：{{orgationInfo.parentname}}</div>
									  	<!--<div class="grid-content"><span class="dot"></span>顺序号：{{orgationInfo.ordernum}}</div>-->
									  </el-col>
									  <!--<el-col :span="8">
									  	<div class="grid-content"></div>
									  	<div class="grid-content"></div>
									  </el-col>-->
									</el-row>
		        		</div>
		        		<div class="main-description bordrradius">
		        			<div class="grid-content"><span class="dot"></span>组织描述：</div>
		        			<div style="padding-left:18px;line-height:20px;font-size:13px;">{{orgationInfo.sectiondescription}}</div>
		        		</div>

		        		<!--<div class="raga">
		        			<el-row :gutter="40">
									  <el-col :span="12">
									  	<div class="grid-content2">
									  		<h4><i class="iconfont icon-chuangjianhuodong title-icon"></i>创建</h4>
									  		<p>创建人：{{orgationInfo.creator}}</p>
									  		<p>创建时间：{{orgationInfo.ctime | formatDate}}</p>
									  	</div>
									  </el-col>
									  <el-col :span="12">
									  	<div class="grid-content2">
									  		<h4><i class="iconfont icon-xiugai_f title-icon"></i>修改</h4>
									  		<p>修改人：{{orgationInfo.modifier}}</p>
									  		<p>修改时间：{{orgationInfo.uptime | formatDate}}</p>
									  	</div>
									  </el-col>
									</el-row>
		        		</div> -->


		        		<div class="raga2 bordrradius">
		        			<h4><i class="iconfont icon-renyuanxiaozu title-icon"></i>负责人</h4>

		        			<ul class="fz-ul">
		        				<li v-for="item in items">
		        					<div><span class="dot"></span>负责人：{{item.username }}</div>
									    <div><span class="dot"></span>负责人级别：{{item.userlevel==0?"重要":"主要" }}</div>
									  </li>
		        			</ul>

		        		</div>
		        </div>
		        <div v-if="active">
		        	<h4 style="height:30px;padding-top:20px;">
		        		{{titleinfo}}
		        		<div style="float:right;">
		        			<el-button @click="updateOrga('formInline')" size="small" type="primary">确认</el-button>
		        			<el-button @click="goback" size="small" type="primary">返回</el-button>
		        		</div>
		        	</h4>

		        	<div class="bminfo">
		        		<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
									  <el-form-item label="部门名称:" prop="bmname" :rules="{
		      required: true, message: '此项不能为空', trigger: 'blur'
		    }">
									    <el-input v-model="formInline.bmname" placeholder="部门名称"></el-input>
									  </el-form-item>

									  <!--<el-form-item label="部门编码:" prop="bmcode" :rules="{
		      required: true, message: '此项不能为空', trigger: 'blur'
		    }">
									    <el-input v-model="formInline.bmcode" placeholder="部门编码"></el-input>
									  </el-form-item>-->


									  <el-form-item label="组织状态:">
									 <!-- <el-form-item label="组织状态:" prop="bmstatus" :rules="{
		      required: true, message: '此项不能为空', trigger: 'blur'
		    }">

									    <el-select v-model="formInline.bmstatus" placeholder="组织状态">
									      <el-option label="正常" value="1"></el-option>
									      <el-option label="撤销" value="0"></el-option>
									    </el-select>-->
									    <el-input
											  placeholder="正常"
											  :disabled="true">
											</el-input>
									  </el-form-item>

		        			<p style="padding-bottom:5px">组织描述：</p>
		        			<el-input
									  type="textarea"
									  :rows="4"
									  placeholder="请输入内容"
									  v-model="formInline.textarea">
									</el-input>
									</el-form>
		        		</div>

		        </div>

          </div>
        </el-main>

          <el-dialog
					  title="撤销提示"
					  :visible.sync="cxDialogVisible"
					  width="35%"
					  center>
					  <p style="text-align:center;padding-bottom:20px;">您确定要撤销部门<span style="color:red;">{{orgationInfo.sectionname}}</span>吗？</p
					  <span slot="footer" class="dialog-footer">
					    <el-button type="success" @click="cxDialogVisible = false">取 消</el-button>
					    <el-button type="danger" @click="deleteBm">确 定</el-button>
					  </span>
					</el-dialog>
      </el-container>
    </div>
</template>

<script>
//import LineChart from './component/index'
import {formatDate} from '@/assets/filter'
import API from '@/api/api_organization'
    export default {
//    components: {LineChart},
        name: "index",
        data() {
          return {
            cxDialogVisible:false,
            indexInfo:true,
            id:'',
            bumenid:'',
            bmcode: '',
            widthnum:260,
            leftsideopen:true,
            loading: true,
            loadingright:false,
            node2:null,
            user:{},
            items:[],
            filterText: '',
            titleinfo:'',
            open:false,
            edit:false,
            active:false,
            sectionnameAll:'天津市第二南开学校（兴南中学）',
            sectionnameAllTitle:'',
            orgationInfo:{
            	sectionname:'',
            	sectionid:'',
            	sectioncode:1,
            	parentname:'',
            	pid:'',
            	sectionstatus:1,
            	sectiondescription:'',
            	creator:'',
            	ctime:'',
            	modifier:'',
            	ordernum:'',
            	uptime:''
            },
            treedata:[],
            defaultProps: {
              children: 'children',
              label: 'name'
            },
            formInline: {
		          bmname: '',
		          bmstatus: '',
		          bmcode:'',
		          textarea:''
		        }
          };
        },
        watch: {
         filterText(val) {
            this.$refs.tree.filter(val);
          }
        },
        filters:{
			    formatDate(time){
			        var data = new Date(time);
//			        console.log(data)
			        return formatDate(data,'yyyy-MM-dd');
			    }
			   },
        mounted(){
        	this.user = JSON.parse(sessionStorage.getItem('user')).user;
        	this.init();

        },
        methods: {
        	init(){
        		API.orgationTree({}).then((res)=>{
	        		this.treedata = res.data;
	        		console.log(res.data);
	        		this.loading = false;
	        	})
        	},

        	leftside(){
        		if(this.leftsideopen){
        			this.widthnum = 130;
        			this.leftsideopen = false;
        		}else{
        			this.widthnum = 250;
        			this.leftsideopen = true;
        		}

        	},
          filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
          },
          renderTree(h, { node, data, store }){
            return (
              <span level={(()=>{return node.level})()} id={(()=>{return data.id})()} style="flex:1;display:flex;align-items:center;justify-content:space-between;font-size:14px;padding-right:8px;position:relative;">
              <span>
                <i class="icontree iconfont icon-wenjian" style="margin-right:.3em;"></i>
                { node.label }
          		</span>
                <span class="tree-btns" style="position:absolute;left:0;top:-3px;">
                  <el-button size="mini" type="text" on-click={ () => this.getNode(node) } style="padding:10px 90px;z-index:999;"></el-button>
                </span>
            </span>
            );

          },

          getNode(node){
          	this.loadingright = true;
          	if(node.level==1){
          		this.indexInfo = true;
          	}else{
          		this.indexInfo = false;
          	}
            this.bumenid = 	node.key;
          		this.node2 = node;
	          	this.active =false;
	          	this.id = node.data.id;
              this.bmcode = node.data.code;
	          	API.getOrgationInfo({id:node.data.id}).then((res)=>{
	          		console.log(res)
	        			if(res.code==1){
	        				this.orgationInfo.parentname = res.data[0].sectionname;
	        				this.orgationInfo.pid = res.data[0].sectionid;
	        				this.orgationInfo.sectionname =res.data[1].vname;
//									this.orgationInfo.sectionname = this.sectionnameAll;
	        				this.orgationInfo.ordernum =res.data[1].ordernum;
	        				this.orgationInfo.sectioncode =res.data[1].sectioncode;
	        				this.orgationInfo.sectionstatus = res.data[1].vstatus;
	        				this.orgationInfo.sectiondescription = res.data[1].description;
	        				this.orgationInfo.creator = res.data[2].Creator;
	        				this.orgationInfo.ctime = res.data[1].ctime;
	        				this.orgationInfo.modifier = res.data[2].Modifier;
	        				this.orgationInfo.uptime = res.data[1].uptime;
	        				this.orgationInfo.sectionid = res.data[1].sectionid;
	        				this.loadingright = false;

	        				if(node.level==1){
			          		this.sectionnameAll = this.orgationInfo.sectionname
			          	}else if(node.level==2){
			          		this.sectionnameAll = node.parent.label+' - '+this.orgationInfo.sectionname
			          	}else if(node.level==3){
			          		this.sectionnameAll = node.parent.parent.label+' - '+node.parent.label+' - '+ this.orgationInfo.sectionname
			          	}else if(node.level==4){
			          		this.sectionnameAll = node.parent.parent.parent.label+' - '+node.parent.parent.label+' - '+node.parent.label+' - '+this.orgationInfo.sectionname
			          	}


			          	if(node.level==1){
			          		this.sectionnameAllTitle = this.orgationInfo.sectionname
			          	}else if(node.level==2){
			          		this.sectionnameAllTitle = this.orgationInfo.sectionname
			          	}else if(node.level==3){
			          		this.sectionnameAllTitle = node.parent.label+' - '+ this.orgationInfo.sectionname
			          	}else if(node.level==4){
			          		this.sectionnameAllTitle = node.parent.parent.label+' - '+node.parent.label+' - '+this.orgationInfo.sectionname
			          	}

	        			}


	        		})
	          	API.getBmleader({secId:node.data.id}).then((res)=>{
	          		  console.log(res)
	          		  this.items = res.data;
	          	})

          },
          editbutton(){
          	this.active = true;
          	this.edit= true;
          	this.titleinfo = '编辑部门信息';
          	this.formInline.bmname = this.orgationInfo.sectionname;
          	this.formInline.bmstatus = this.orgationInfo.sectionstatus+'';
          	this.formInline.bmcode = this.orgationInfo.sectioncode;
          	this.formInline.textarea = this.orgationInfo.sectiondescription;
          	console.log(this.formInline.bmstatus)
          },
          addbutton(){

          	if(this.node2.level>3){
          		this.$notify({
				          title: '操作提示',
				          message: '最多只能添加到第3级',
				          type: 'warning',
				          offset: 70
				      });
          	}else{
          		this.active = true;
	          	this.edit= false;
	          	this.indexInfo = false;
	          	this.titleinfo = '添加'+this.orgationInfo.sectionname+'的子部门';
	          	this.formInline.bmname = '';
	          	this.formInline.bmstatus = '1';
	          	this.formInline.bmcode = '';
	          	this.formInline.textarea = '';
          	}

          },
          deletebutton(){//撤销部门
          	this.cxDialogVisible = true;
          },
          deleteBm(){//删除部门
          	let deleteor = {
          		secId:this.orgationInfo.sectionid,
          		userId:this.user.userId
          	}
          	API.deleteOrga(deleteor).then((res)=>{
          		if(res.code==1){
          			this.$notify({
					          title: '操作提示',
					          message: '撤销部门成功！',
					          iconClass: 'el-icon-info',
					          offset: 70
					      });
          		}
          		this.cxDialogVisible = false;
          		this.init();

          	})

         },

         goback(){
	         	if(this.node2==null){
	         		  this.active = false;
		         		this.indexInfo = true;
	         	}else{
	         		if(this.node2.level==1){
		         		this.active = false;
		         		this.indexInfo = true;
		         	}else{
		         		this.active = false;
		         		this.indexInfo = false;
		         	}
	         	}

         },
          updateOrga(formName){
          	this.$refs[formName].validate((valid) => {
          		if(valid){
          					  if(this.edit){//编辑
					          		let orgation = {
						          		sectionid:this.id,
						          		vcode:this.formInline.bmcode,
						          		vname	:this.formInline.bmname,
						          		vstatus:1,
						          		description:	this.formInline.textarea,
						          		modifier:this.user.userId,
						          		creator:this.user.userId,
						          	}
					          		API.updateOrga(orgation).then((res)=>{
						          		console.log(res);
						          		this.active = false;
						          		if(res.code==1){
						          			this.$notify({
											          title: '操作提示',
											          message: '修改成功！！',
											          iconClass: 'el-icon-info',
											          offset: 70
											      });
						          		}else{
						          			this.$notify({
									            title: '提示信息',
									            message: res.data,
									            type: 'warning'
									          });
						          		}

										      this.init();
										      this.getNode(this.node2);
						          	})
					          	}else{//添加
					          		let orgation = {
						          		vcode:this.bmcode,
						          		vname	:this.formInline.bmname,
//						          		vstatus:this.formInline.bmstatus,
													vstatus:1,
						          		description:	this.formInline.textarea,
						          		modifier:this.user.userId,
						          		creator:this.user.userId,
						          		pid:this.id
						          	}

					          		console.log(orgation)
					          		API.addChildOrga(orgation).then((res)=>{
						          		console.log(res);
						          		if(res.code==1){
						          			this.active = false;
						          			this.$notify({
										          title: '操作提示',
										          message: '添加成功！！',
										          iconClass: 'el-icon-info',
										          offset: 70
										        });
						          		}else{
						          			this.$notify({
									            title: '提示信息',
									            message: res.data,
									            type: 'warning'
									          });
						          		}

						          		this.init();
						          		this.getNode(this.node2);
						          	})
					          	}

          		}
          	})


          },


        }//method
    }
</script>

<style scoped lang='scss'>
li{list-style:none;}
h4{margin:0 0 15px 0;}
.animate-left-side{
	transition:all 0.3s ease;
  overflow-x:hidden;
  text-overflow:ellipsis;
	white-space: nowrap;
}
.title-icon{font-size:20px;padding-right:5px;color:#942987;}
.dot{display:inline-block;width:6px;height:6px;border-radius:50%;margin:0 8px 3px 5px;background:#942987;}
.main-info{padding:10px 0;}
.main-description{min-height:100px;}
.main-description2{padding:20px 0;}
.fz-ul{overflow:hidden;padding:0;}
.fz-ul li{width:25%;float:left;height:70px;}
.el-col{height:100%;}
.el-row{height:100%;}
.raga{height:150px;}
.raga2{min-height:150px;}
.bg-purple {
    background: #d3dce6;
  }
  .button-info{}
  .bordrradius{border:1px solid #dfdfdf;border-radius:5px;padding:15px 20px;margin:20px 0;}
  .bminfo{margin:20px 0;}
  .el-aside {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-top:4px solid #942987;
    background-color: #fff;
    color: #333;
    margin-right: 20px;
    text-align: center;
    .aside-header{
      width: 100%;
      height: 47px;
      background: #fff;
      line-height: 47px;
      font-size: 14px;
      text-align: left;
      padding-left: 16px;
      box-sizing: border-box;
      color: #000;
    }
    .el-icon-search:before{
      position: absolute;
      left: 10px;
      top: 10px;
    }
    .el-icon-search input{
        padding-left: 30px !important;
    }
  }
  .el-main {
    border-top:4px solid #942987;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #fff;
    color: #333;
    font-size:14px;
    min-height:600px;
  }

  .content-box{
    background: #F3F3F3;
  }
 .bg-purple-light {
    background: #e5e9f2;
  }
.grid-content2{height:80%;border:1px solid #dfdfdf;border-radius:5px;padding:10px 20px;}
.grid-content{height:30px;line-height:30px;}
</style>
