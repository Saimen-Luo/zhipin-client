/* ajax请求函数，返回一个promise对象 */
import axios from 'axios'
export default function ajax(url, data = {}, type = 'GET') {
    if (type === "GET") { // 发送get请求
        // get方式的参数拼接：
        // {usrename: 'jack',password: '123'}
        // paramStr: usrename=jack&password=123
        paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if (paramStr) {
            paramStr.subString(0, paramStr.length - 1)
        }
        return axios.get(url + '?' + paramStr)

    } else { // 发送post请求
        return axios.post(url, data)

    }
}