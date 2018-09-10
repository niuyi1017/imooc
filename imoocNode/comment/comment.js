const https = require('https')
const querystring = require('querystring')

var postData = querystring.stringify({
    'content':'期待下一期！！！',
    'cid':'348',
    'mid':'8837'
})

const options = {
    hostname:'www.imooc.com',
    port:443,
    path:'/course/docomment',
    method:'POST',
    headers:{
        'Accept': 'application / json, text / javascript, */ *; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        // 'Accept - Language': 'zh-CN, zh; q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep - alive',
        'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'imooc_uuid = 22c1318d-f601 - 4465 - b8b4 - 0e08cf4ca7f4; imooc_isnew_ct=1506242523; bdshare_firstime=1508479335693; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1519886733, 1519957554, 1519978985, 1521353577; loginstate=1; apsid=Y4NTVjOTVkOGY1M2Y5N2QzZTZlMzhiNmQzODIzNjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjE2NTU4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADFjMzZmNWM4ZDQ3OGY0OWY5ZDlhMmU5ZGJhM2E0ZTA0Gfl % 2FWxn5f1s% 3DMj; showwechat=1; PHPSESSID=5jg99qmg2vpsu6k3mp9fsllif4; mc_channel=banner; mc_marking=683d4f9163f6a645da804759706042cc; cninfo=banner - 683d4f9163f6a645da804759706042cc; IMCDNS=0; imooc_isnew=2; cvde=5b921ccb5ad52-179',
        'Host': 'www.imooc.com',
        'Origin': 'https://www.imooc.com',
        'Referer': 'https://www.imooc.com/video/8837',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'

    }
}

var req = https.request(options,res =>{
    console.log('status:' + res.statusCode)
    console.log(JSON.stringify(res.headers))

    res.on('data',chunk =>{
        console.log(Buffer.isBuffer(chunk))
        console.log(typeof(chunk))
    })
    res.on('end',()=>{
        console.log("请求完毕！")
    })
}).on('error',e =>{
    console.log('Error'+e.message)
})
req.write(postData);
req.end()

