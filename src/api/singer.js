import request from '@/utils/request'
import Request from "@/utils/request";

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

// 根据歌手名字查询专辑
export const findSingerByName = (name) => {
  return Request.get('/singer/album', {
    params: {
      name
    }
  })
}

// 根据id查找歌手详情
export const singerDetails = (id) => {
  return Request.get(`/singer/${id}`)
}

// 修改歌手
export const update = (singer) => {
  return Request.put('/singer/', {
    ...singer
  })
}
