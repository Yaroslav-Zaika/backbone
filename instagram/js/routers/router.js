define([
	'jquery',
	'backbone',
	'views/start',
	'views/finish',
	'collections/collection',
], function($, Backbone, Start, Finish, Collection){
var Router = Backbone.Router.extend({
	routes: {
	'' : 'start',
	'photo/:id': 'photo'
	},
	start: function(){
		var collection = new Collection;
		var start = new Start({
			collection: collection,
		});
	},
	photo: function(id){
		var collection = new Collection;
		collection.fetch({
			parse: false
		});
		var finish = new  Finish({
			collection: collection,
			id: id
		});
	}
});
return Router;
});