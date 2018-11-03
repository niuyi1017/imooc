$(function () {
  $('.comment').click(function (e) {
    console.log(e.target)
    let target = $(e.target)
    let toId = target.data('tid')
    let commentId = target.data('cid')
    
    $('<input>').attr({
      type: 'hidden',
      name: 'comment[tid]',
      value: toId,
    }).appendTo('#commentForm')
    $('<input>').attr({
      type: 'hidden',
      name: 'comment[cid]',
      value: commentId,
    }).appendTo('#commentForm')
  })
})