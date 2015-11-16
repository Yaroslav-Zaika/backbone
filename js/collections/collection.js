define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/photo',
], function ($, _, Backbone, Store, Photo){
var Collection = Backbone.Collection.extend({
	localStorage: new Backbone.LocalStorage("value"),
	sync:function(method, collection, options){	
		options.dataType = "jsonp";
	return Backbone.sync(method, collection, options);
	},
	search:function(){
		this.fetch({
			ajaxSync: true
					});
	},
	parse:function(response){
		if(response.pagination){
			var self = this;
			next = response.pagination.next_url;
			var arr = [];
			_.forEach(response.data,function(item){
				var arrText = [];
				_.forEach(item.comments.data,function(im){	
					arrText.push({
					text: im.text,
					username: im.from.username,
					profile: im.from.profile_picture,
					});
				});
				var photo = new Photo({
					id: item.id,
					url: item.images.standard_resolution.url,
					count: item.likes.count,
					text: arrText,
					next: next,
					captionText: item.caption.text,
					captionUsername: item.caption.from.username,
					captionProfile: item.caption.from.profile_picture,
				});
				self.create(photo);
				arr.push(photo);	
			});
				return arr;	
		}else{
				return response;
			}	
	}
});
return Collection;
});