import Request from '@/utils/request'
export const getPageAlbum = (page) => {
  return Request.get('/album/page', {
    params: {
      ...page
    }
  })
}

export const changeStatus = (status, id) => {
  return Request.put(`/album/${status}`, null, {
    params: {
      id
    }
  })
}

export const save = (dto) => {
  return Request.post('/album/save', {
    ...dto
  })
}
