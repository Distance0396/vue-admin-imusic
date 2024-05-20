import request from '@/utils/request'

export const upload = (audio) => {
  console.log('common')
  console.log(audio)
  return request.post('/common/upload', {
    audio,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
