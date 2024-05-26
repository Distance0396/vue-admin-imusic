import Request from '@/utils/request'

// 音乐分页
export const getPageMusic = (page) => {
  return Request.get('/music/page', {
    params: {
      ...page
    }
  })
}

// 添加音乐
export const save = (dto) => {
  return Request.post('/music/save', {
    ...dto
  })
}

// 锁定歌手
export const changeStatus = (status, id) => {
  return Request.put(`/music/${status}`, null, {
    params: {
      id
    }
  })
}

// 根据id查询音乐详情
export const musicDetails = (id) => {
  return Request.get(`/music/${id}`)
}

// 修改音乐
export const update = (music) => {
  return Request.put('/music/', {
    ...music
  })
}

