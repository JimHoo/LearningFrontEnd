/*使用jqzoom*/
$(function(){
	$('.jqzoom').jqzoom({
		zoomType: 'standard',//默认值为standard。如果设为reverse，在小图片仲，移入鼠标时，所选区域高亮，非选中区域淡灰色。
		lens:true,//表示是否显示小图片中的选中区域，默认值为"true",如果设为"false"，则放大后的图片上面不会出现主题字样
		preloadImages: false,//表示是否重新加载大图像
		alwaysOn:false,
		zoomWidth: 340,//小图片所选区域的宽度
		zoomHeight: 340,
		xOffset:10,//放大后的图片与小图片间的X(横坐标)距离
		yOffset:0,
		position:'right',//放大后的图片相对原图片的位置，默认为"right",还可设置为"left","top","bottom"
		title: true//大图像顶部是否显示<a>标签里的title
    });
});