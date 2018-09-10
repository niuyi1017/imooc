var http = require('http');
var baseUrl = 'http://www.imooc.com/learn/';
var learnNumber_baseUrl = 'http://www.imooc.com/course/AjaxCourseMembers?ids='
var cheerio = require('cheerio');
var videosId = [728, 637, 348, 259, 197, 134, 75];

function filerChapters(pageData) {
    var html = pageData.html;
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var courseData = {
        title: $('.hd h2').text(),
        number: pageData.number,
        id: $('.person-num').attr('href').split('/')[2],
        videos: []
    };

    chapters.each(function (item) {
        var chapter = $(this);
        var chapterTitle = chapter.find('h3').text();
        var videos = chapter.find('.video').children('li');
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        };

        videos.each(function (item) {
            var video = $(this).find('.J-media-item');
            var videoTitle = video.text().trim();
            var id = video.attr('href').split('video/')[1];
            var videoData = {
                title: videoTitle,
                id: id
            }
            chapterData.videos.push(videoData);
        });

        courseData.videos.push(chapterData);
    });
    return courseData;
}

function printCourseData(coursesData) {
    coursesData.forEach(function (courseData) {
        console.log('\n');
        console.log('     #########   ' + courseData.title + '  [学习人数：' + courseData.number + ']   #########\n');
        courseData.videos.forEach(function (item) {
            var chapterTitle = item.chapterTitle;

            console.log(chapterTitle);

            item.videos.forEach(function (video) {
                console.log(' [' + video.id + ']' + video.title.trim().split('(')[0]);
            })
        })
    })
}


function getPageAsync(url) {
    return new Promise(function (resolve, reject) {
        http.get(url, function (res) {
            var html = '';

            res.on('data', function (data) {
                html += data;
            });

            res.on('end', function () {
                resolve(html)
            });
        }).on('error', function () {
            console.log('error');
        })
    })
}

function getLearnDataAsync(html) {

    return new Promise(function (resolve, reject) {
        var $ = cheerio.load(html)
        var id = $('.person-num').attr('href').split('/')[2]
        var pageData = {
            html: html,
            number: 0
        }
        var db = ''
        http.get(learnNumber_baseUrl + id, function (res) {
            res.on('data', function (data) {
                db += data;
                db = JSON.parse(db)

                pageData.number = parseInt(db.data[0].numbers, 10)
            })
            res.on('end', function () {
                resolve(pageData);
            })
        }).on('error', function () {
            console.log('error')
        })
    })

}

var promiseList = []
var coursesDataPromises = []

videosId.forEach(function (id) {
    promiseList.push(getPageAsync(baseUrl + id).then(function (html) {
        return getLearnDataAsync(html);
    }))
})

Promise
    .all(promiseList)
    .then(function (pagesData) {
        var coursesData = []
        pagesData.forEach(function (pageData) {
            coursesData.push(filerChapters(pageData))
        })
        printCourseData(coursesData)
    })
