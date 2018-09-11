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
    let title = $('.course-infos h2').text()
    let number = page.Lnumber
    
    

    let courseData = {
        title,
        number,
        videos:[]
    }

    
   


    chapters.each(function () {
        let chapter = $(this)
        let chapterTitle = chapter.find('h3').text()
        let videos = chapter.find('.video').children('li')
        let chapterData = {
            chapterTitle,
            videos: []
        }
        videos.each(function () {
            let video = $(this).find('.J-media-item')
            let videoTitle = video.text().trim().split('(')[0]
            let id = video.attr('href').split('video/')[1]
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
            let chapterTitle = item.chapterTitle
            console.log( chapterTitle + '\n')
            item.videos.forEach(video => {
                console.log('【id ' + video.id + '】' + video.title)
            })
        })
        
    })
}

function getPageAsync(id) {
    
    return new Promise((resolve, reject) => {
       
        let url = baseUrl+id
        
        console.log('正在爬取' + url +'\n')

        let Lnumber = 0;
        let html = ''
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
            let number = ''
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


let fetchCourseArray = []
videosIds.forEach(id =>{
    fetchCourseArray.push(getPageAsync(id))
})

Promise.all(fetchCourseArray)
        .then((pages) =>{
            let coursesData = []
           
            pages.forEach(page => {
                let courses = filterChapter(page)
                coursesData.push(courses) 
            })
            coursesData.sort((a,b) =>{
                return a.number < b.number
            })
            printCourseInfo(coursesData)
        })