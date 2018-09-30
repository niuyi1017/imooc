define(['animate'],function(a){
	function TabView(){
		this.animate = new a.Animate();
		console.log("tabview....")
	}
	return {TabView:TabView}
})