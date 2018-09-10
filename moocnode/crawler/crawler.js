const https = require('https')
const url = 'https://www.imooc.com/learn/637'

https.get(url,res =>{
    var html = ''
    res.on('data',data => {
        html += data;
    })
    res.on('end',() =>{
        console.log(html)
    })
}).on('error', err => {
    console.log(err)
})