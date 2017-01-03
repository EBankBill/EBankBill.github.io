define(function(require, exports, module) {
	/**
	 * @description 图片预加载对象
	 * @param {Object} obj
	 * {
	 * 	imgs:待加载图片数组
	 *  loading:加载中执行的函数
	 *  loaded:所有图片加载完成后执行的函数
	 * }
	 */
	window.loadingFun = function(obj) {
		console.log(obj.imgs instanceof Array) //判断实例						数组和对象的typeof 全返回 object
	//判断imgArr是否存在 且 是一个数组 且长度大于0 则进行下面的操作
	//当前代码中判断imgArr是否存在不是必须，但有些情况是必须且要注意顺序
	if(obj.imgs && obj.imgs instanceof Array && obj.imgs.length > 0) {
		var _index = 0;
		var _imgArr = [];
		//如果条件为真 则开始遍历img数组
		for(var i = 0;i < obj.imgs.length;i ++) {
			//构建img对象
			var img = new Image;
			img.src = obj.imgs[i];
			_imgArr.push(img);
			img.index = i;
			img.onload = function() {
				_index ++;
				if(obj.loading && typeof obj.loading == 'function'){
					obj.loading(this.index,this);			//回调函数 参数可以不写
				}
				if(_index == obj.imgs.length) {
					if(obj.loaded && typeof obj.loaded == 'function') {
							obj.loaded(_imgArr);
						}
					}
				}
			}
		}
	}
});


