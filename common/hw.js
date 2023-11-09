// 基础（重保）版本
const defConfig = {
  tabTitle: '重保情报', // tab页
  defenceLine: '火花情报库', // 联防
  uploadIntell: {
    upIntelBtn: '情报<br />上报', // 上传情报按钮文字
    importFileMsg: '（提示：此处⽤于上传情报）',
    upIntelIocLab: 'IOC（ip\\域名\\url\\hash）', // IOC
    upIntelIcoAdd: '+ 添加IOC', // 添加IOC按钮文字
    upIntelIcoWarn: '请输入IOC', // 未输入IOC警告
    extraInfo: '线索依据', // 相关事件名称
    extraInfoPHolder: '可以填写攻击事件名称、标签、攻击类型、使用漏洞、相关行业信息等', // 相关事件名称placeholder
    IntellFileName: 'important_protection_template' // 下载模板接口参数
  },
  sceneSpark: {
    title: '火花情报',
    dialogTitle: '火花情报查询',
    listTitle: '火花情报任务列表',
    text: '通过VenusEye威胁情报中心，批量查询火花情报。'
  }
}

// HW 版本
const hwConfig = {
  tabTitle: '火花H专项',
  defenceLine: '火花H专项情报',
  uploadIntell: {
    upIntelBtn: '情报<br />反馈',
    importFileMsg: '（提示：此处⽤于上传火花H专项情报）',
    upIntelIocLab: 'IOC（ip\\域名\\url\\hash）',
    upIntelIcoAdd: '+ 添加IOC',
    upIntelIcoWarn: '请输入IOC',
    extraInfo: '线索依据',
    extraInfoPHolder: '可以填写攻击事件名称、标签、攻击类型、使用漏洞、相关行业信息等',
    IntellFileName: 'important_protection_template'
  },
  sceneSpark: {
    title: '火花H专项',
    dialogTitle: '火花H专项情报查询',
    listTitle: '火花H专项情报任务列表',
    text: '通过VenusEye威胁情报中心，批量查询火花H专项情报。'
  }
}

module.exports = {
  defConfig,
  hwConfig
}