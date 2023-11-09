import request from '@/request'

// 提交任务
export function submitTask(data) {
  return request({
    url: 'tool/task/submit',
    method: 'post',
    data,
    isLoading: false
  })
}

// 查询任务
export function getTaskLIst(data) {
  return request({
    url: 'tool/task/list',
    method: 'post',
    data,
    isLoading: false
  })
}

// 删除任务
export function deleteTask(params) {
  return request({
    url: 'tool/task/delete',
    method: 'get',
    params
  })
}

// 修改任务名称
export function editTaskName(data) {
  return request({
    url: 'tool/task/edit',
    method: 'post',
    data
  })
}

// 任务详情
export function getTaskDetail(data) {
  return request({
    url: 'tool/task/detail',
    method: 'post',
    data
  })
}

// 检查任务状态
export function checkTaskStatus(data) {
  return request({
    url: 'tool/task/status',
    method: 'post',
    data,
    isLoading: false
  })
}
