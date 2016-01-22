require.config({
	shim:{
		underscore:{
		  exports: '_'
		},
		backbone:{
			deps:[
			'jquery',
			'underscore'
		],
		  exports: 'Backbone'
		},
		backboneLocalstorage:{
		  deps: ['backbone'],
		  exports: 'Store'
		},
	},
	paths:{
		jquery: '../components/jquery-2.1.4.min',
		underscore: '../components/underscore-1.8.3',
		backbone: '../components/backbone',
		backboneLocalstorage: '../components/backbone.localStorage',
		text: '../components/requirejs-text-2.0.14'
	}
});
require([
	'backbone',
	'routers/router'
	], function(Backbone, Router){
	new Router();
	Backbone.history.start();
});