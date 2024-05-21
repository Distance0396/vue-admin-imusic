import Request from '@/utils/request'

export const getPageMusic = (page) => {
  return Request.get('/music/page', {
    params: {
      ...page
    }
  })
}
