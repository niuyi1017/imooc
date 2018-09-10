const https = require('https')
const baseUrl = "https://www.imooc.com/learn/"
//const url = 'https://www.imooc.com/learn/348'
const numberBaseUrl = 'https://www.imooc.com/course/AjaxCourseMembers?ids='
const cheerio = require('cheerio')
const videosIds = [348, 259, 197, 134, 75,728,637]
    //

function filterChapter(page) {
    
    const $ = cheerio.load(page.html)
    const chapters = $('.chapter')
    var title = $('.course-infos h2').text()
    var number = page.Lnumber
    
    

    var courseData = {
        title,
        number,
        videos:[]
    }

    
   


    chapters.each(function () {
        var chapter = $(this)
        var chapterTitle = chapter.find('h3').text()
        var videos = chapter.find('.video').children('li')
        var chapterData = {
            chapterTitle,
            videos: []
        }
        videos.each(function () {
            var video = $(this).find('.J-media-item')
            var videoTitle = video.text().trim().split('(')[0]
            var id = video.attr('href').split('video/')[1]
            chapterData.videos.push({
                title: videoTitle,
                id
            })
        })
        courseData.videos.push(chapterData)
    })
    return courseData
}



function printCourseInfo(coursesData) {
    
    coursesData.forEach(courseData => {
        console.log('【'+courseData.number +'】'+'人学过 '+courseData.title+ '\n')

    })

    coursesData.forEach(courseData => {
        
        console.log('\n')
        console.log('----------------------------------------------------------------------------------\n')
        console.log('                           ' + courseData.title + '                               \n')
        console.log('----------------------------------------------------------------------------------\n')
        courseData.videos.forEach(item =>{
            var chapterTitle = item.chapterTitle
            console.log( chapterTitle + '\n')
            item.videos.forEach(video => {
                console.log('【id ' + video.id + '】' + video.title)
            })
        })
        
    })
}

function getPageAsync(id) {
    
    return new Promise((resolve, reject) => {
       
        var url = baseUrl+id
        
        console.log('正在爬取' + url +'\n')

        let Lnumber = 0;
        var html = ''
        getNumber(id).then(number => {
            Lnumber = number

        })

        https.get(url, res => {
           
            res.on('data', data => {
                html += data
            })
            res.on('end', () => {
                
                resolve({html,Lnumber})
                
            })
        }).on('error', err => {
            console.log(err + ':获取课程信息出错！')
            reject(err)
        })

    })
}

function getNumber(id) {
    return new Promise((resolve, reject) => {


        https.get(numberBaseUrl + id, res => {
            var number = ''
            res.on('data', data => {
                number += data
                number = JSON.parse(number).data[0].numbers
                // console.log(number)
            })
            res.on('end', () => {
                resolve(number)
            })
        }).on('error', err => {
            reject(err)
            console.log(err)
        })
    })
}


var fetchCourseArray = []
videosIds.forEach(id =>{
    fetchCourseArray.push(getPageAsync(id))
})

Promise.all(fetchCourseArray)
        .then((pages) =>{
            var coursesData = []
           
            pages.forEach(page => {
                var courses = filterChapter(page)
                coursesData.push(courses) 
            })
            coursesData.sort((a,b) =>{
                return a.number < b.number
            })
            printCourseInfo(coursesData)
        })