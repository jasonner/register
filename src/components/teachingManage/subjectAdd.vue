<template>
<div>  
    <div class="modules-box">
        <p class="box-text">新增</p>
        <div class="box-content">
            <div class="role" style="border-bottom:1px solid #F6F6F6;padding-bottom:20px;margin-bottom:20px;">
	            <h4> <span class="xuhuabordius"></span>选择学科</h4>
	           
	            <el-form style="margin-bottom:10px;border-bottom:1px dashed #eee">          
					<el-form-item>
	                    <el-select v-model="subjectName" @change="subjectChange(subjectName)" placeholder="学科选择">
	                    	<el-option
						      v-for="item in subjectArr"
						      :key="item.subjectid"
						      :label="item.vname"
						      :value="item.subjectid">
						    </el-option>
	                    </el-select>
	                </el-form-item>
	                <h4> <span class="xuhuabordius"></span>选择年级</h4>
	                <el-form-item>
	                    <el-checkbox-group v-model="checkList">
	                    	<el-checkbox
						      v-for="item in gradeReduce"
						      :label="item.id"
						    >
						      {{item.name}}
						    </el-checkbox>
						    <el-checkbox
						      disabled
						      v-for="item in gradeExist"
						      :label="item.id"
						    >
						    {{item.name}}
						    </el-checkbox>
						</el-checkbox-group>
	                </el-form-item>
	                
	            </el-form>
	                
	            <h4><span class="xuhuabordius"></span>选择学科组长</h4>
	            <div style="text-align:right;padding-bottom:20px;">
	            	<!--<el-radio-group v-model="radioBumen" style="margin-right:10px;">
  						<el-radio :label="1" @click.native.prevent="clickitem(1)">按部门搜索</el-radio>
					</el-radio-group>
	            	
	            	<span v-if="bumenseachshow">
	            		<el-input style="width:35%;" v-model="searchUserValueBM" placeholder="请输入部门进行搜索" prefix-icon="el-icon-search"></el-input>
	                	<el-button type="primary" @click="searchBumen()">搜索</el-button>	
	                </span>
	                <span v-else>
	                	<el-input style="width:35%;" v-model="searchUserValue" placeholder="请输入姓名,手机号，邮箱号进行搜索" prefix-icon="el-icon-search"></el-input>
	                	<el-button type="primary" @click="search()">搜索</el-button>
	                </span>-->
	                <el-form> 
	                <el-row :gutter="20">     	
                    	<el-col :span="3">
                            <el-form-item>
                            	<el-select v-model="gradeNameAdd" @change="gradeChangeAdd(gradeNameAdd)" placeholder="年级筛选">
			                    	
			                    	<el-option
								      key="-1"
								      label="全部"
								      value="-1">
								    </el-option>
			                    	<el-option
								      v-for="item in gradeArrAdd"
								      :key="item.sectionid"
								      :label="item.vname"
								      :value="item.sectionid">
								    </el-option>
			                    </el-select>
                               
                            </el-form-item> 
                        </el-col>
                        
                    	<el-col :span="3">
                        	<el-form-item>
			                    <el-select v-model="classNameAdd" :loading="loadingClass" @change="classChangeAdd(classNameAdd)" placeholder="班级筛选">
			                    	<el-option
								      key="-1"
								      label="全部"
								      value="-1">
								    </el-option>
			                    	<el-option
								      v-for="item in classArrAdd"
								      :key="item.sectionid"
								      :label="item.vname"
								      :value="item.sectionid">
								    </el-option>
			                    </el-select>
			                </el-form-item>
		                </el-col>
                        <!--<el-col :span="3">
                            <el-form-item>
                            	<el-select v-model="subjectNameAdd" @change="subjectChangeAdd(subjectNameAdd)" placeholder="学科筛选">
			                    	
			                    	<el-option
								      key="-1"
								      label="全部"
								      value="-1">
								    </el-option>
								    
			                    	<el-option
								      v-for="item in subjectArrAdd"
								      :key="item.subjectid"
								      :label="item.vname"
								      :value="item.subjectid">
								    </el-option>
			                    </el-select>
                               
                            </el-form-item> 
                        </el-col>-->
                        <el-col :span="18">
	                        <div style="display:inline-block;">
	                            <el-form-item>
			                        <el-input v-model="searchUserValue" placeholder="请输入姓名进行搜索" prefix-icon="el-icon-search"></el-input>
			                    </el-form-item>
	                        </div>
	                        <div style="display:inline-block;margin-right:10px;">
	                            <el-form-item>
			                        <el-button type="primary" @click="search()">搜索</el-button>
			                    </el-form-item>
	                        </div>
	                        
	                    </el-col>
                   </el-row>
	             </el-form> 
	                
	                
	            </div>
	            <div v-loading="loading">
	                <!--<tableList :checkBox="true" :tableData='subjectAllUser' :pageNum="params.page" :pageSize="params.pageSize" :total="total" :columns="columns" @CurrentChange="handleCurrentChange" @selectionChange="handSelectionChange"></tableList>-->
      				<el-table
			  			border
			  			class="radioNone"
			  			style="width: 100%"
					    ref="multipletable"
					    :data="subjectAllUser"
					    >
					    <el-table-column label="单选" width="50">
                            <template scope="scope">
                                <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope)"></el-radio>
                            </template>
                        </el-table-column>
					    <el-table-column
					      prop="index"
					      label="序号"
					      width="60">
					      <template slot-scope="scope"> {{scope.$index+1+(params.page-1)*params.pageSize}}</template>
					    </el-table-column>
					    <el-table-column
					      prop="username"
					      label="授课教师"
					    >
					    </el-table-column>
					    <el-table-column
					      prop="gradeId"
					      label="年级"
					      show-overflow-tooltip>
					    </el-table-column>
					    
					    <el-table-column
					      prop="classNum"
					      label="班级"
					      show-overflow-tooltip>
					    </el-table-column>
					    
					    <el-table-column
					      prop="subjectId"
					      label="所授学科"
					      show-overflow-tooltip>
					    </el-table-column>
					    
					    
					  </el-table>
				  		<el-pagination style="margin-top:10px;text-align:right"
				        @current-change="handleCurrentChange"
				        :current-page="params.page"
				        :page-size="params.pageSize"
				        prev-text="上一页"
				        next-text="下一页"
				        layout="total,jumper, prev, pager, next"
				        :total="total">
				       </el-pagination>
	            </div>
      			
            </div>

            <div style="text-align:center;"><el-button type="" @click="cancel">取消</el-button><el-button type="primary" @click="submit">确认</el-button></div>
            
        </div>
    </div>
</div>
	
		
</template>
<script>
import API from '@/api/api_authorization';
import tableList from '@/module/tableList.vue';
import MyButton from '@/module/MyButton.vue';
  export default {
  	name: "role-add",
    data() {
      return {
      	user:{},
      	userid:'',
      	userclickRadio:false,
      	loading:true,
      	loadingClass:false,
      	subjectNameAdd:'',
      	gradeNameAdd:'',
      	classNameAdd:'',
      	subjectid:-1,
      	gradeid:-1,
      	classid:-1,
      	subjectArrAdd:[],
      	gradeArrAdd:[],
      	classArrAdd:[],
      	subjectName:'',
      	checkList: [],
      	gradeReduce:[],
      	gradeExist:[],
      	subjectArr:[],
      	searchUserValue:'',
      	searchUserValueBM:'',
      	subjectAllUser: [],
      	total:0,
      	radioBumen:'',
      	radio:'',
      	bumenseachshow:false,
      	isbumen:false,
      	params : {
            page: 1,
            pageSize: 10
        },
//      columns: [
//        { prop: "index", label: "序号" ,width:"60",order:true},
//        { prop: "username", label: "用户名"},
//        { prop: "realname", label: "姓名"},
//        { prop: "user_primary", label: "所在部门"},
//        { prop: "phone", label: "手机号"},
//        { prop: "email", label: "邮箱号"},  
//      ],
        
		
      };
    },
    components:{
      tableList,
      MyButton
    },
    mounted(){	
    	this.user = JSON.parse(sessionStorage.getItem('user')).user;
    	API.subjectAll({}).then((res)=>{
			console.log(res)
			if(res.code==1){
				this.subjectArr = res.data;
				this.subjectArrAdd = res.data;
			} 
		})
    	API.skGrade({}).then((res)=>{//获得年级
			console.log(res)
			if(res.code==1){
				this.gradeArrAdd = res.data;
			} 
		})
    	this.init();
    },
    methods: {
    	clickitem(e){
    		e === this.radioBumen ? this.radioBumen = '' : this.radioBumen = e
    		console.log(this.radioBumen);
    		if(this.radioBumen){
    			this.bumenseachshow = true;
    		}else{
    			this.bumenseachshow = false;
    		}
    	},
    	init(){
			let promise={
    			search:this.searchUserValue,
    			subjectId:this.subjectName,//学科id
    			gradeId:this.gradeid,//年级id
    			classNum:this.classid,
    			pageSize:this.params.pageSize,
    			pageNum:this.params.page	
	
    		}
    		   this.loading = true; 
    		API.skLeaderList(promise).then((res)=>{
    			console.log(res)
    			if(res.code==1){	
    				this.subjectAllUser = res.data;   				
	    		    this.total = res.total;
    			}else{
    				
    			}
    			this.loading = false;            
    		})
	    	let that = this;
			setTimeout(function(){that.loading = false},20000);
	    },
	    handleCurrentChange(val) {	    	
	        this.params.page=val;
	        this.init();
        },
        
        getCurrentRow(val){//选择变更人单选
        	console.log(val)
	        this.userid = val.row.userId;
	        this.userclickRadio = true;
	    },
        subjectChange(val){
        	this.subjectName = val;
        	this.params.page = 1;
        	this.init();
        	this.userclickRadio=false;
	    	this.radio = '';
        	this.checkList = [];
        	API.gradeBysubject({subjectid:this.subjectName}).then((res)=>{
        		console.log(res)
    			if(res.code==1){
    				this.gradeExist = res.data.exist;
    				this.gradeReduce = res.data.reduce;
    			}else{
    				this.$message({
		                title: '操作提示',
		                message: res.message,
		                type: 'warning',
		            });
    			}
    		})
	
        },

	    cancel(){
	    	this.$router.push({path:'/subject', query: {show: true}})
	    },
	    submit() {
	    	if(this.subjectName){
	    		if(this.checkList.length>0){
		    		if(this.userclickRadio){	    			    		
			    		let promise={
			    			xkmaster : this.userid,//用户id
			    			subjectid : this.subjectName,//学科id
			    			grades: this.checkList.join('-') + '-'
			    		}
			    		API.subjectLeaderCreate(promise).then((res)=>{
			    			console.log(res);
			    			if(res.code==1){
			    				this.$message({
					                title: '操作提示',
					                message: '添加成功',
					                type: 'success',
					           });
					           this.$router.push({path:'/subject', query: {show: true}})
			    			}else{
			    				this.$message({
					                title: '操作提示',
					                message: res.message,
					                type: 'warning',
					            });
			    			}
			    			
			    		})
		    		}else{
		    			this.$message({
			                title: '操作提示',
			                message: '请选择人员',
			                type: 'warning',
			            });
		    		}
	    		}else{
	    			this.$message({
			                title: '操作提示',
			                message: '请选择年级',
			                type: 'warning',
			            });
	    		}
    		}else{
    			this.$message({
	                title: '操作提示',
	                message: '请选择学科',
	                type: 'warning',
	            });
    		}
    		
    		
	    },
	    
	    search(){
	    	if(this.searchUserValue){
	    		this.params.page = 1;
	    		this.userclickRadio=false;
	    		this.radio = '';
    			this.init();
    		}else{
    			this.$message({
		          title: '操作提示',
		          message: '请输入搜索内容', 
		          type: 'warning',
		        });
    		}
	    },
	    subjectChangeAdd(val){
        	this.subjectid = val;
        	this.params.page = 1;
	    	this.userclickRadio=false;
	    	this.radio = '';
        	this.init();
        },
        gradeChangeAdd(val){
        	this.gradeid = val;
        	this.classArrAdd =[];
        	this.classNameAdd='';
        	this.classid = -1;
        	this.loadingClass = true;
        	API.skClass({pid:val}).then((res)=>{
				console.log(res)
				if(res.code==1){
					this.loadingClass = false;
					this.classArrAdd = res.data;
				}
				
			})
        	this.params.page = 1;
	    	this.userclickRadio=false;
	    	this.radio = '';
        	this.init();
        	
        },
        classChangeAdd(val){
        	this.classid = val;
        	this.params.page = 1;
	    	this.userclickRadio=false;
	    	this.radio = '';
        	this.init();
        },
	    
	    
	    
	
	    
    }
    
    
  };
</script>
<style scoped  lang='scss'>
 $color:#942987;
 h4{margin:15px 0;padding-left:10px;}
 ul{padding:10px 0;}
 .ul-li{margin:4px 2px;position:relative;list-style: none;float:left;padding:4px 12px;border-radius:3px;border:1px solid #ccc;}
 .ul-li i{position:absolute;top:-10px;right:-6px;font-size:15px;cursor:pointer;color:#D4A9CF;}
 .xuhuabordius{margin:0 15px 0 0;display:inline-block;border-radius:50%;width:10px;height:10px;background:#942987;box-shadow:0 0 1px 4px #D6A3D0;}
.quanxian{min-height:400px;float:left;border:1px solid #eee;border-radius:5px;width:100%;margin-left:20px;}
.quanxiantitle{color:#666;font-size:14px;height:45px;line-height:45px;padding:0 10px;background:#F6F6F6;}
.modules-box{
    border-radius: 5px;
    border-top:2px solid $color;
    background-color:#fff;
    .box-text{
        border-bottom:1px solid #ddd;
        margin:0px;
        line-height:35px;
        text-indent:20px;
    }
    .box-content{
        padding:10px;
        .title-box{
            background-color: #fff;
            border-radius: 5px;
            border: 1px solid #ddd;
            border-left: 2px solid $color;
            margin-bottom: 10px;
        }
    }
    
}
</style>