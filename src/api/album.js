import Request from '@/utils/request'
export const getPageAlbum = (page) => {
  return Request.get('/album/page', {
    params: {
      ...page
    }
  })
}

// 改变状态
export const changeStatus = (status, id) => {
  return Request.put(`/album/${status}`, null, {
    params: {
      id
    }
  })
}

// 添加
export const save = (dto) => {
  return Request.post('/album/save', {
    ...dto
  })
}

// 根据id查询专辑详情
export const albumDetails = (id) => {
  return Request.get(`/album/${id}`)
}

// 修改
export const update = (album) => {
  return Request.put('/album/update', {
    ...album
  })
}
