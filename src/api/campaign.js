import request from '@/utils/request'
// const bast_url = 'https://scrapper-vikram.herokuapp.com/'
const bast_url = 'http://127.0.0.1:8000/'
export function createCampaign(formData) {
  const data = formData
  return request({
    url: bast_url + 'api/file/upload',
    method: 'post',
    data
  })
}

export function getCampaigns(user_id) {
  const data = { user_id }
  return request({
    url: bast_url + 'api/campaigns/',
    method: 'post',
    data
  })
}
export function getReports(o) {
  const data = o
  return request({
    url: bast_url + 'api/reports',
    method: 'post',
    data
  })
}
