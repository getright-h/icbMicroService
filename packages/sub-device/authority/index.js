const HOST = 'http://192.168.0.252:5010/'
const URL = 'api/prvilege/common/menuTreeLogin'
const TOKEN = 'session:30a01404-40f3-47b3-bde5-5f2015a5188b'
// 子系统域名标识
const SUB_SYS = '/home/device'

const params = {
    roleIdList: ['e4a6494372d1ca01a45c08d88625cf05'],
    systemId: '938880216d89c68eb6ea08d69b143c52'
}

const axios = require('axios')
const fs = require('fs')
const path = require('path')

async function fetchData() {
     const response =  await axios({
        method: "POST",
        headers: { "Content-Type": "application/json;charset=UTF-8", "token": TOKEN },
        url: HOST + URL,
        data: params
     })
    
 const authorityCode = parsePrivilegeJSON(response.data.data, 'code')
 const authorityCodeDTO = parsePrivilegeJSON(response.data.data)
 generateAuthorityDto(authorityCodeDTO)
 generateAuthorityHashMap(authorityCode)

}
// 生成DTO
function generateAuthorityDto(data) {
   fs.writeFileSync(process.cwd() + '/src/solution/shared/constant/authority/authorityDot.ts' ,  reslove(data))
}
// 生成权限码表
function generateAuthorityHashMap(data) {
    fs.writeFileSync(process.cwd() + '/src/solution/shared/constant/authority/index.ts' ,  reslove(data, true))
 }
 // 解析DTO 与 权限码表
 /**
  * 
  * @param {*} data 
  * @param {*} isCode 是否是权限码表
  */
function reslove(data, isCode) {
    let str = isCode ? `import { IAuthorityCode } from './authorityDot'\nexport const DEVICE_AUTHORITY_CODE: IAuthorityCode = { \n` 
     : ' export interface IAuthorityCode { \n'
    for(let k in data) {
        let subStr = `${JSON.stringify(k)}: { \n`
        for(let subK in data[k]) {
            let _sub_str =isCode ? `    ${[subK]}: ${JSON.stringify(subK)},\n` : `    ${[subK]}: string; //${data[k][subK]['privilegeName']}\n`
            subStr += _sub_str
        }
        subStr += '},\n'
        str += subStr
    }
    str += '\n }\n'
    return str
}

function parsePrivilegeJSON(arr, type) {
    const jsonText = {};
    function expand(arr) {
      arr.map((node) => {
        if (!node.children.length && node.path.includes(SUB_SYS) ) {
          const jsonItem = {};
          node.privilegeGroupList.map(group => {
            group.privilegeList.map(p => {
              const code = p.privilegeCode.split('-')[1];
              if(type == 'code') {
                jsonItem[code] = code;
              } else {
                jsonItem[code] = {
                    privilegeName: p.privilegeName,
                    privilegeCode: p.privilegeCode
                }
              }
              
            });
          });
          Object.assign(jsonText, { [node.path]: jsonItem });
        } else {
          expand(node.children);
        }
      });
    }
    expand(arr);
    return jsonText;
  }



  fetchData()