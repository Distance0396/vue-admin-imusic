import request from '@/utils/request'

export const getPageSinger = (dto) => {
  return request.get('/singer/page', {
    params: {
      ...dto
    }
  })
}

export const save = (params) => {
  return request.post('/singer/save', {
    params
  })
}
