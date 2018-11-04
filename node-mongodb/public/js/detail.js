$(function () {
  $('.comment').click(function (e) {
    console.log(e.target)
    let target = $(e.target).parent()
    let toId = target.data('tid')
    let commentId = target.data('cid')
    console.log(toId)
    console.log(commentId)

    if($('#toId').length > 0) {
      $('#toId').val(toId)
    }else{
      $('<input>').attr({
        type: 'hidden',
        id: 'toId',
        name: 'comment[tid]',
        value: toId,
      }).appendTo('#commentForm')
    }
    
    if ($('#cId').length > 0) {
      $('#cId').val(commentId)
    } else {
      $('<input>').attr({
        type: 'hidden',
        id: 'cId',
        name: 'comment[cid]',
        value: commentId,
      }).appendTo('#commentForm')
    }
  })
})