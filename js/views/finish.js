define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'collections/collection',
	'text!templates/photo.html',
	'text!templates/caption.html',
	'text!templates/photoComment.html',
	'text!templates/photoResults.html',
], 
function ($, _, Backbone, Store, Collection, photoTemplate, captionTemplate, photoCommentTemplate, photoResultsTemplate){
var Finish = Backbone.View.extend({
	className:'.finish',
	initialize: function(){
		this.render(this.id);
	},
	render:function(id){
		var collection = _.findWhere(this.collection.toJSON(), { id : id });
		var templatephotoResults = _.template(photoResultsTemplate);
		var templatePhoto = _.template(photoTemplate);
		var templatePhotoComment = _.template(photoCommentTemplate);
		var templateCaption = _.template(captionTemplate);
		this.$el.append(templatephotoResults);
		$('body').append(this.$el);
		$('.picPhoto').append(templatePhoto(collection));
		$('.blockCaption').append(templateCaption(collection));
		_.each(collection.text,function(i){
			$('.blockComments').append(templatePhotoComment(i));
		});
	}
});
return Finish;
});