define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/form.html',
	'text!templates/result.html',
	'text!templates/сomment.html',
	'text!templates/button.html',
	'text!templates/scroll.html',
	'text!templates/error.html',
	'common'
], function ($, _, Backbone, formTemplate, resultTemplate, сommentTemplate, buttonTemplate, scrollTemplate, errorTemplate, config){
var Start = Backbone.View.extend({
	className: 'start',
	events: {
		'click button#search': 'url',
		'click button#load': 'next',
		'click #top': 'top'
	},
	initialize: function(){
		this.render();
		this.listenTo(this.collection, 'add', this.addPhotos);
		this.setTimeButton();
	},
	render: function(){
		var templateForm = _.template(formTemplate);
		this.$el.html(templateForm);
		$('.content').html(this.$el);
	},
	url: function(e){
		e.preventDefault();
		var tag = $('.search-tag').val().trim().split(' ')[0] || 'gettygrant';
		var url = config.apiHost + 'v1/tags/' + tag + '/media/recent?access_token=' + config.apiKey + '&count=' + config.count;
		this.collection.url = url;
		this.collection.search();	
	},
	next: function(){
		var obj = this.collection.toJSON();
		var nextUrl = obj[0].next;
		this.collection.url = nextUrl;
		this.collection.search();
	},
	addPhotos: function(models){
		var model = models.toJSON();
		var results = $('.results');
		if(model.id){
			$('.error').remove();
			var commentsLength = model.comments.length;
			var templateResult = _.template(resultTemplate);
			var templateComment = _.template(сommentTemplate);
			results.append(templateResult(model));
			for(var comment = 0; comment < commentsLength && comment < 3; comment++){
					results.append(templateComment(model.comments[comment]));
			};
			if(model.next){
				var templateButton = _.template(buttonTemplate);
				$('.button').html(templateButton);
			}else{
				$('.button').empty();
			}
			var templateScroll = _.template(scrollTemplate);
			$('.top').html(templateScroll);
		}else{
			$('.search-form')[0].reset();
			$('.button').empty();
			var templateError = _.template(errorTemplate);
			results.html(templateError);
		}
	},
	top: function(){
		var delay = 350;
		$('body').animate({
			scrollTop: 0
		}, delay);
	},
	setTimeButton: function(){
		var top = 250; 
		$(window).scroll(function(){
			if($(this).scrollTop() > top) $('#top').fadeIn();
			else $('#top').fadeOut();
		});
	}
});
return Start;
});