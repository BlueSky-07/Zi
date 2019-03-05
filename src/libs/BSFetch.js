/* eslint-disable */
/**
 * Browser-Simple-Fetch
 * @BlueSky
 *
 * Version Alpha, 1.1
 *
 * Last updated: 2018/8/14
 *
 */
import BSData from './BSData.js'

class BSRequest {
  constructor(url = '', debug = false) {
    this.url = url
    this.config = {}
    this.debug = debug
    
    for (const key of ['body', 'credentials', 'headers', 'method']) {
      Object.defineProperty(this, key, {
        get() {
          return this.config[key]
        },
        set(value) {
          this.config[key] = value
        }
      })
    }
  }
  
  info() {
    return `${this.method} '${this.url}':`
  }
  
  request() {
    return new Request(this.url, this.config)
  }
}

class BSFetch {
  constructor({basepath = ''} = {}) {
    this.basepath = basepath || location.hostname
  }
  
  static global() {
    window.BSFetch = BSFetch
  }
  
  URL(request = '') {
    const basepath = this.basepath || location.hostname
    return `${basepath}${request}`
  }
  
  async head(url = '', {data = {}, reqtype = '', restype = 'headers', cookies = '', headers = {}, debug = false} = {}) {
    return BSFetch.fetch(this.URL(url), 'HEAD', {data, reqtype, restype, cookies, headers, debug})
  }
  
  async get(url = '', {data = {}, reqtype = '', restype = 'json', cookies = '', headers = {}, debug = false} = {}) {
    return BSFetch.fetch(this.URL(url), 'GET', {data, reqtype, restype, cookies, headers, debug})
  }
  
  async post(url = '', {data = {}, reqtype = '', restype = 'json', cookies = '', headers = {}, debug = false} = {}) {
    return BSFetch.fetch(this.URL(url), 'POST', {data, reqtype, restype, cookies, headers, debug})
  }
  
  async put(url = '', {data = {}, reqtype = '', restype = 'status', cookies = '', headers = {}, debug = false} = {}) {
    return BSFetch.fetch(this.URL(url), 'PUT', {data, reqtype, restype, cookies, headers, debug})
  }
  
  async delete(url = '', {data = {}, reqtype = '', restype = 'status', cookies = '', headers = {}, debug = false} = {}) {
    return BSFetch.fetch(this.URL(url), 'DELETE', {data, reqtype, restype, cookies, headers, debug})
  }
  
  async patch(url = '', {data = {}, reqtype = '', restype = 'status', cookies = '', headers = {}, debug = false} = {}) {
    return BSFetch.fetch(this.URL(url), 'PATCH', {data, reqtype, restype, cookies, headers, debug})
  }
  
  async options(url = '', {headers = {}, cookies = '', debug = false}) {
    return BSFetch.fetch(this.URL(url), 'OPTIONS', {headers, cookies, debug})
  }
  
  async fetch(url = '#', method = 'GET', {
    data = {}, reqtype = '', restype = 'json', cookies = '', headers = {}, debug = false
  } = {}) {
    return BSFetch.fetch(this.URL(url), method, {data, reqtype, restype, cookies, headers, debug})
  }
  
  static async head(url = '', {data = {}, reqtype = '', restype = 'headers', cookies = '', headers = {}, debug = false} = {}) {
    return this.fetch(url, 'HEAD', {data, reqtype, restype, cookies, headers, debug})
  }
  
  static async get(url = '', {data = {}, reqtype = '', restype = 'json', cookies = '', headers = {}, debug = false} = {}) {
    return this.fetch(url, 'GET', {data, reqtype, restype, cookies, headers, debug})
  }
  
  static async post(url = '', {data = {}, reqtype = '', restype = 'json', cookies = '', headers = {}, debug = false} = {}) {
    return this.fetch(url, 'POST', {data, reqtype, restype, cookies, headers, debug})
  }
  
  static async put(url = '', {data = {}, reqtype = '', restype = 'status', cookies = '', headers = {}, debug = false} = {}) {
    return this.fetch(url, 'PUT', {data, reqtype, restype, cookies, headers, debug})
  }
  
  static async delete(url = '', {data = {}, reqtype = '', restype = 'status', cookies = '', headers = {}, debug = false} = {}) {
    return this.fetch(url, 'DELETE', {data, reqtype, restype, cookies, headers, debug})
  }
  
  static async patch(url = '', {data = {}, reqtype = '', restype = 'status', cookies = '', headers = {}, debug = false} = {}) {
    return this.fetch(url, 'PATCH', {data, reqtype, restype, cookies, headers, debug})
  }
  
  static async options(url = '', {headers = {}, cookies = '', debug = false}) {
    return this.fetch(url, 'OPTIONS', {headers, cookies, debug})
  }
  
  static async fetch(url = '#', method = 'GET', {
    data = {}, reqtype = '', restype = 'json', cookies = '', headers = {}, debug = false
  } = {}) {
    if (typeof url !== 'string' || typeof method !== 'string') {
      throw new Error('BSFetch.fetch(url, method, {?...}): url/method must be a string')
    }
    
    const request = new BSRequest(url, debug)
    request.headers = new Headers(headers)
    
    method = method.toLowerCase()
    if (HttpMethods.has(method)) {
      request.method = method.toUpperCase()
    } else {
      request.method = 'GET'
    }
    switch (request.method) {
      case 'HEAD':
        restype = restype === 'response' ? restype : 'headers'
      case 'GET':
        if (data instanceof FormData) {
          request.url += '?' + BSData.object_to_body(BSData.formdata_to_object(data))
        } else if (Object.keys(data).length > 0) {
          request.url += '?' + BSData.object_to_body(data)
        } else if (typeof data === 'string' && data.length > 0) {
          request.url += '?' + BSData.object_to_body(BSData.json_to_object(data))
        }
        break
      case 'PUT':
      case 'DELETE':
      case 'PATCH':
        restype = restype === 'response' ? restype : 'status'
      case 'POST':
        switch (reqtype) {
          case 'json':
            request.headers.set('Content-Type', ContentTypes.JSON)
            if (data instanceof FormData) {
              request.body = BSData.object_to_json(BSData.formdata_to_object(data))
            } else if (Object.keys(data).length > 0) {
              request.body = BSData.object_to_json(data)
            } else if (typeof data === 'string' && data.length > 0) {
              request.body = data
            }
            break
          case 'formdata':
            // request.headers.set('Content-Type', ContentTypes.FORMDATA)
            if (data instanceof FormData) {
              request.body = data
            } else if (Object.keys(data).length > 0) {
              request.body = BSData.object_to_formdata(data)
            } else if (typeof data === 'string' && data.length > 0) {
              request.body = BSData.object_to_formdata(BSData.json_to_object(data))
            }
            break
          default:
            request.headers.set('Content-Type', ContentTypes.FORM)
            if (data instanceof FormData) {
              request.body = BSData.object_to_body(BSData.formdata_to_object(data))
            } else if (Object.keys(data).length > 0) {
              request.body = BSData.object_to_body(data)
            } else if (typeof data === 'string' && data.length > 0) {
              request.body = BSData.object_to_body(BSData.json_to_object(data))
            }
        }
        break
      case 'OPTIONS':
        restype = restype === 'response' ? restype : 'headers'
        break
    }
    
    restype = restype.toLowerCase()
    if (ResponseTypes.has(restype)) {
      request.responseType = restype.toUpperCase()
    } else {
      request.responseType = 'JSON'
    }
    
    if (cookies === '' || cookies === 'same' || cookies === 'same-origin' || cookies === 'default') {
      // request.credentials = 'same-origin'
    } else if (cookies === true || cookies === 'true' || cookies === 'include') {
      request.credentials = 'include'
    } else if (cookies === false || cookies === 'false' || cookies === 'none') {
      request.credentials = 'omit'
    }
    
    return doRequest(request)
  }
}

const doRequest = (request = new BSRequest()) => {
  if (request.debug) console.log(request.info(), request.request())
  return new Promise((resolve, reject) => {
    fetch(
        request.request()
    ).then(
        response => {
          if (request.debug) console.log(request.info(), response)
          if (request.responseType === 'RESPONSE') {
            return response
          } else if (request.responseType === 'STATUS') {
            return response.status
          }
          if (!response.ok) {
            const e = new Error()
            e.message = `cannot fetch resource: ${response.status}`
            e.message += response.statusText ? ` - ${response.statusText}` : ''
            e.response = response
            throw e
          }
          switch (request.responseType) {
            case 'JSON':
              return response.json()
            case 'TEXT':
              return response.text()
            case 'BLOB':
              return response.blob()
            case 'FORMDATA':
              return response.formData()
            case 'ARRAYBUFFER':
              return response.arrayBuffer()
            case 'HEADERS':
              return response.headers
          }
        }
    ).then(
        data => {
          resolve(data)
        }
    ).catch(
        e => {
          reject(e)
        }
    )
  })
}

// Reference:
// https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods
const HttpMethods = new Set([
  'head', 'get', 'post', 'put', 'delete', 'options', 'patch'
])

const ResponseTypes = new Set([
  'json', 'text', 'blob', 'formdata', 'arraybuffer', 'response', 'headers', 'status'
])

const ContentTypes = {
  JSON: 'application/json; charset=utf-8',
  FORM: 'application/x-www-form-urlencoded; charset=UTF-8',
  FORMDATA: 'multipart/form-data'
}

export default BSFetch
