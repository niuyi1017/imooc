const https = require('https')
const url = 'https://www.imooc.com/learn/348'
const cheerio = require('cheerio')

function filterChapter(html) {
    const $ = cheerio.load(html)
    const chapters = $('.chapter')
    var  courseData = []
    chapters.each(function(){
        var chapter = $(this)
        var chapterTitle = chapter.find('h3').text()
        var videos = chapter.find('.video').children('li')
        var chapterData = {
            chapterTitle,
            videos:[]
        }
        videos.each(function(){
            var video = $(this).find('.J-media-item')
            var videoTitle = video.text().trim().split('(')[0]
            var id = video.attr('href').split('video/')[1]
            chapterData.videos.push({
                title:videoTitle,
                id
            })
        })
        courseData.push(chapterData)
    })
    return courseData
}
function printCourseInfo(courseData){
    courseData.forEach(item =>{
        var chapterTitle = item.chapterTitle
        console.log(chapterTitle + '\n')
        item.videos.forEach(video => {
            console.log('【'+video.id+'】'+video.title)
        })
    })
}


https.get(url, res => {
    var html = ''
    res.on('data', data => {
        html += data
    })
    res.on('end', () => {
        var courseData =  filterChapter(html)
        printCourseInfo(courseData)
    })
}).on('error', err => {
    console.log(err +':获取课程信息出错！')
})