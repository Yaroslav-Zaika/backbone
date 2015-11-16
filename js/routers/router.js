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
	start:function(){
		var collection = new Collection;
		var start = new Start({
			collection:collection,
		});
		this.reset(start);
	},
	photo:function(id){
		var collection = new Collection;
		collection.fetch();
		var finish = new  Finish({
			collection:collection,
			id:id
		});
		this.reset(finish);
	},
	reset:function(view){
        if(this.currentView){
            this.currentView.remove();
		}
        this.currentView = view;
    },	
});
return Router;
});