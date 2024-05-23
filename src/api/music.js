import Request from '@/utils/request'

export const getPageMusic = (page) => {
  return Request.get('/music/page', {
    params: {
      ...page
    }
  })
}

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

