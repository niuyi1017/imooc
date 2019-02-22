import { commonParams } from './config'
import axios from 'axios'

export function getHotKey() {
  const url = '/api/getHotkey'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    _: 1550831579386,
    g_tk: 5381,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
