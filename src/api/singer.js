import request from '@/utils/request'

// 分页获取数据
export const getPageSinger = (dto) => {
  return request.get('/singer/page', {
    params: {
      ...dto
    }
  })
}

// 添加歌手
export const save = (dto) => {
  return request.post('/singer/save', {
    ...dto
  })
}

// 锁定歌手
export const changeStatus = (status, id) => {
  return request.put(`/singer/${status}`, null, {
    params: {
      id
    }
  })
}
