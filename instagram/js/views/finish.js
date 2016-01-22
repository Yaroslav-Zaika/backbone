define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/photoComment.html',
	'text!templates/photoResult.html'
], 
function ($, _, Backbone, photoCommentTemplate, photoResultTemplate){
var Finish = Backbone.View.extend({
	className: 'finish',
	initialize: function(options){
		this.id = options.id;
		this.render();
	},
	render: function(){
		var model = _.findWhere(this.collection.toJSON(), {id : this.id});
		var templatePhotoResult = _.template(photoResultTemplate);
		var templatePhotoComment = _.template(photoCommentTemplate);
		this.$el.html(templatePhotoResult(model));
		$('.content').html(this.$el);
		_.each(model.comments, function(comment){
			$('.blockComments').append(templatePhotoComment(comment));
		});
	}
});
return Finish;
});