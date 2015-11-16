define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/form.html',
	'text!templates/resa.html',
	'text!templates/com.html',
	'text!templates/button.html',
	'common',
], function ($, _, Backbone, formTemplate, resaTemplate, comTemplate, buttonTemplate, config){
var Start = Backbone.View.extend({
	className:'view',
	events: {
		"click button#submit": "url",
		"click button#load": "next"
	},
	initialize:function(){
		this.render();
		this.listenTo(this.collection, "add", this.addPhotos);
	},
	render:function(){
		var templateForm = _.template(formTemplate);
		this.$el.append(templateForm);
		$('body').append(this.$el);
	},
	url:function(e){
		e.preventDefault();
		var tag = $('.search-tag').val().trim().split(' ')[0] || "gettygrant";
		var url = config.apiHost + 'v1/tags/' + tag + '/media/recent?access_token=' + config.apiKey + '&count=' + config.count;
		this.collection.url = url;
		this.collection.search();	
	},
	next:function(){
		var obj = this.collection.toJSON();
		var nextUrl = obj[0].next;
		this.collection.url = nextUrl;
		this.collection.search();
	},
	addPhotos: function(models){
		var model = models.toJSON();
		var searchResults = $('#searchResults');
		var templateResa = _.template(resaTemplate);
		var templateComments = _.template(comTemplate); 
		var j = 0;
		$('.buttonLoad').empty();
		searchResults.append(templateResa(model)),
		_.each(model.text,function(comment){
			if(j < 3){
				searchResults.append(templateComments(comment));
				j++;
			}
		});	
		var templateButton = _.template(buttonTemplate);
		searchResults.append(templateButton);
		this.top();
	},
	top:function(){
		var top = 250; 
		var delay = 350;
		$(window).scroll(function(){
			if($(this).scrollTop() > top) $('#top').fadeIn();
			else $('#top').fadeOut();
		});
		$('#top').click(function(){
			$('body').animate({
			scrollTop: 0
			}, delay);
		
		});
	}
});
return Start;
});