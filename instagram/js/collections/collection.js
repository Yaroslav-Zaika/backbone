define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/photo',
], function ($, _, Backbone, Store, Photo){
var Collection = Backbone.Collection.extend({
	localStorage: new Backbone.LocalStorage("photo"),
	sync:function(method, collection, options){
		options.dataType = "jsonp";
	return Backbone.sync(method, collection, options);
	},
	search: function(){
		this.fetch({
			ajaxSync: true
		});
	},
	parse: function(response){
		if(response.data.length){
			var self = this;
			var arr = [];
			var next = response.pagination.next_url;
			
			_.forEach(response.data,function(item){
				var comments = [];
				
				_.forEach(item.comments.data,function(comment){
					comments.push({
					text: comment.text,
					username: comment.from.username,
					profile: comment.from.profile_picture
					});
				});
				
				var photo = new Photo({
					id: item.id,
					url: item.images.standard_resolution.url,
					count: item.likes.count,
					comments: comments,
					next: next,
					captionText: item.caption.text,
					captionUsername: item.caption.from.username,
					captionProfile: item.caption.from.profile_picture
				});
				self.create(photo);
				arr.push(photo);
			});
			return arr;
		}else{
				return arr;
			}
	}
});
return Collection;
});