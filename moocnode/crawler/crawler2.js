const https = require('https')
const cheerio = require('cheerio')
const url = 'https://www.imooc.com/learn/348'

function filterChapters(html) {
    const $ = cheerio.load(html)
    const chapters = $('.chapter')
    const courseData = []
    chapters.each(function () {
        const chapter = $(this)
        const chapterTitle = chapter.find('h3').text()
        const videos = chapter.find('.video').children('li')
        const chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }
        videos.each(function () {
            const video = $(this).find('.J-media-item')
            const videoTitle = video.text()
            const id = video.attr('href').split('video/')[1]
            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })
        courseData.push(chapterData)
    })
    return courseData
}

function printCourseInfo(courseData) {
    courseData.forEach(item => {
        const chapterTitle = item.chapterTitle
        console.log(chapterTitle + '\n')
        item.videos.forEach(video => {
            console.log(`${video.id}${video.title}`)
        })
    })
}

https.get(url, res => {
    let html = ''
    res.on('data', data => {
        html += data
    })
    res.on('end', () => {
        const courseData = filterChapters(html)
        printCourseInfo(courseData)
    })
}).on('error', err => {
    console.log(err)
})
