import * as API from './'
import qs from 'qs'

export default {
  dlmodel:'http://www.2nankai.cn/api',

  // 组织树形结构
  orgationTree: params => {
    return API.GET('/api/section/show', params)
  },
  //通过组织id获取用户信息
  getOrgationInfo: params => {
    return API.GET('/api/user/list', params)
  },
  //删除部门用户
  deleteUser: params => {
    return API.POST('/api/userSec/del', qs.stringify(params))
  },
  //添加用户
  addUser: params => {
    return API.POST('/api/userSec/create', qs.stringify(params))
  },

  //获取所有用户情况
  getUserTypeSitua: params => {
    return API.GET('/api/user/getUserTypeSitua', params)
  },

  //搜索用户信息
  getUserselect: params => {
    return API.GET('/api/user/select', params)
  },

  //设置部门负责人
    setPrincipal: params => {
    return API.POST('/api/userSec/principal', qs.stringify(params))
  },
  //根据userName查询是否存在
  userIsExist: params => {
    return API.GET('/api/userSec/select', params)
  },
  //编辑用户资料
  upSecUser: params => {
    return API.POST('/api/user/upSecUser', qs.stringify(params))
  },
  //批量设置部门
  userSecAdd:params => {
    return API.POST('/api/userSec/add', qs.stringify(params))
  },
  //导入导出验证用户密码
  yzpassword: params => {
    return API.POST('/api/userSec/istrue', qs.stringify(params))
  },
  //导出教师学生模板
   exportTeaAndStu: params => {
    return API.GET('/api/Execl/export', params)
  },

  //导入信息
  insertInfo: params => {
    return API.POST('/api/Execl/importData', qs.stringify(params))
  },

  //user/uplist
  userUplist: params => {
    return API.POST('/api/user/uplist', qs.stringify(params))
  },
  //查询家长身份以及是否重复
  jiazhangStyleCf: params => {
    return API.GET('/api/userSec/selName', params)
  },
  //手机号查重
  userSecSelcetPhone: params => {
    return API.POST('/api/userSec/selcetPhone', qs.stringify(params))
  },
  //邮箱查重
  userSecSelcetEmail: params => {
    return API.POST('/api/userSec/selcetEmail', qs.stringify(params))
  },
  //创建菜单
  menuCreat: params => {
    return API.POST('/api/menu/creat', qs.stringify(params))
  },
  menuUpdate: params => {
    return API.POST('/api/menu/update', qs.stringify(params))
  },
  //获取菜单列表
  menuListShow: params => {
    return API.GET('/api/menu/show', params)
  },
  //菜单删除
  menuListdel: params => {
    return API.GET('/api/menu/del', params)
  },

}
