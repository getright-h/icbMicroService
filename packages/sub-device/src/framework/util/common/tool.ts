/**
 * 解析路由参数
 */

function getQueryParams(): any {
  const href = window.location.href;
  const query = href.substring(href.indexOf('?') + 1);
  const vars = query.split('&');
  const obj = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    obj[pair[0]] = pair[1];
  }
  return obj;
}

export { getQueryParams };
