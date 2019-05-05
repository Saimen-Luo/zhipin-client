/* 包含n个工具函数的集合 */


/* 判断重定向路径：
有四种情况：boss/employee x 信息是否完善（根据header是否有值判断）
*/

export function getRedirectTo(type, header) {
    let path = ''
    if (type === 'boss') {
        path = '/boss'
    } else {
        path = '/employee'
    }
    if (!header) {
        path += 'info'
    }
    return path
}