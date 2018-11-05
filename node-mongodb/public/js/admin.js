$(function () {
  $('.del').click(function (e) {
    console.log(e.target)
    let target = $(e.target)
    let id = target.data('id')
    let tr = $('.item-id-' + id)


    $.ajax({
      method:'DELETE',
      url:'/admin/movie/list/?id=' + id,
    })
    .done(results => {
      if (results.success == 1) {
        if (tr.length > 0){
          tr.hide(500).remove()
        }
      }
    })
  })

  $('#douban').blur(() => {
    let douban = $('#douban')
    let id =douban.val()
    console.log(id)
    let url = 'http://api.douban.com/v2/movie/' + id
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'jsonp',
      cache: true,
      crossDomain: true,
      // jsonp:'callback',
      success: (data) => {
        console.log(data)
        $('#inputTitle').val(data.title)
        $('#inputDirector').val(data.attrs.director[0])
        $('#inputCountry').val(data.attrs.country[0])
        $('#inputLanguage').val(data.attrs.language[0])
        $('#inputPoster').val(data.image)
        $('#inputYear').val(data.attrs.year)
        $('#inputSummary').val(data.summary)
        
      }
    })
  })
})