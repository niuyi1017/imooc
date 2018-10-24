function toast(message){
			var dom = $('.toast-content');
			console.log(dom.html())
			if(dom.length!=0){
				dom.html(message)
				function showToast(){
					var $toast = $('#toast')
					$toast.fadeIn(300);
					setTimeout(function(){
						$toast.fadeOut(500)
					},1000)
				}
//				showToast()
			}else{
				var toast = '<div id="toast"><p class="toast-content">'+message+'</p></div>'
				var $toast = $(toast)
				$toast.appendTo($('body'))
				function showToast(){
					$toast.fadeIn(300);
					setTimeout(function(){
						$toast.fadeOut(300)
					},1800)
				}
				
			}
			showToast()

		}