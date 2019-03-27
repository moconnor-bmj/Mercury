function closePops(){
	$(document).on('click', '.popover .close', function(){//the 'X' close btn
		$('body').children('.popover').popover('hide');
	}).on('click', function(e){
		$('body').children('main').find('[data-toggle="popover"]').each(function(){//the 'has' for icons within a button that triggers a popup
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});
}

function createPops(p){// Popover initialisation, Setting & Content - so no XSS attacks
	p.find('.referencePop').popover({
		html : true,
		container : 'body',
		title : 'Reference <a href="#" class="close" data-dismiss="alert">&times;</a>',
		//placement : left, //auto not supported!
		constraints     : [{to: 'window', pin: ['left', 'right']}], //'tether' constraints is an improvement. DH.
		content : function() {
			var refId = $(this).html();
			var refContent = $(this).siblings(".citationText").html();
			var fullTextUrl = $(this).siblings(".citationFullTextUrl").html();
			var fullTextMarkup='';
			if (fullTextUrl != undefined) {
				fullTextMarkup = '<p><a rel="external" class="web-link" target="_blank" href="'
						//+ fullTextUrl + '">Full text <span class="icon icon-bp-icons-outbound-link"></span></a></p>';
					      + fullTextUrl + '">' + jQuery.i18n.prop('Full text') + ' <span class="icon icon-bp-icons-outbound-link"></span></a></p>';
			}
			var abstractUrl=$(this).siblings(".referenceUniqueId").html();
			var abstractUrlMarkup='';
			if(abstractUrl!=undefined){
				abstractUrlMarkup='<p><a rel="external" class="web-link" target="_blank" href="'
					//+ abstractUrl + '">Abstract <span class="icon icon-bp-icons-outbound-link"></span></a></p>';
					+ abstractUrl + '">' + jQuery.i18n.prop('Abstract') + ' <span class="icon icon-bp-icons-outbound-link"></span></a></p>';
			}
			
			var openUrlId=$(this).siblings(".referenceOpenUrlId").html();
			var openUrlMarkup='';
			if(openUrlId!=undefined){
				var openUrlLabel=$(this).siblings(".referenceOpenUrlLabel").html();
				var openUrlLogo=$(this).siblings(".referenceOpenUrlLogo").html();
				openUrlMarkup='<p><a rel="external" class="web-link" target="_blank" href="'
					+ "/openurl/" + openUrlId.trim() + '">' + openUrlLabel + ' <span class="icon icon-bp-icons-outbound-link"></span></a></p>';
			}
			
			if(!$("#video-page").length){
				return '<p><b>'+ refId.replace("[", "").replace("]", "") +'.&nbsp;</b>' + refContent + '</p>'+
					//fullTextMarkup + abstractUrlMarkup +'<p class="ref-link"><a href="/topics/'+langCode+'/'+topicId+'/references">View all references</a></p>';
				    fullTextMarkup + abstractUrlMarkup + openUrlMarkup +'<p class="ref-link"><a href="/topics/'+langCode+'/'+topicId+'/references">' + jQuery.i18n.prop('js.content.view.all.references') + '</a></p>';
			}
			//if it's within a video page exclude the all references link
			else{
				return '<p><b>'+ refId.replace("[", "").replace("]", "") +'.&nbsp;</b>' + refContent + '</p>'+ fullTextMarkup + abstractUrlMarkup;
			}
		} 
	});

	p.find('.evidenceScorePop').on('click', function(e){e.preventDefault();	}).popover({
		html : true,
		container : 'body',
		title : 'Evidence Score <a href="#" class="close" data-dismiss="alert">&times;</a>',
		//placement : left, //auto not supported!
		constraints : [{to: 'window', pin: ['left', 'right']}], //'tether' constraints is an improvement. DH.
		content : function() {
			var esLevel = $(this).html();
			var esContent = $(this).siblings(".esContent").html();
			var esInfo = $(this).siblings(".esInfo").html();
			return '<p>'+  esContent + '</p>'+
					'<div class="evidence-level"><h4>' + esLevel + '</h4><p>' + esInfo + '</p></div>';
		} 
	});	

	p.find('.cochranePop').on('click', function(e){e.preventDefault(); }).popover({
		html : true,
		container : 'body',
		title : '<img src="https://resources.bmj.com/repository/images/bp/cca-cochrane-logo-normal.png" data-element="cochrane-image-popup"></img><a href="#" class="close" data-dismiss="alert">&times;</a>',
		//placement : left, //auto not supported!
		constraints     : [{to: 'window', pin: ['left', 'right']}], //'tether' constraints is an improvement. DH.
		content : function() {
			var refId = $(this).html();
			var ccaTitle = $(this).siblings(".ccaTitle").html();
			var ccaUrl = $(this).siblings(".ccaUrl").html();
			var ccaHrefText = $(this).siblings(".ccaHrefText").html();
			return '<p>'+  ccaTitle + '</p>'+
					'<p class="ref-link"><a href="'+ ccaUrl + '" target="_blank">' + ccaHrefText + '<span class="icon icon-bp-icons-outbound-link"></span></a></p>';
		} 
		
	});
	
	closePops();//this also serves all other 'create popover' calls
}

function createDrugPops(p){

	p.find('a.drugDbPop').popover({
		html : true,
		container : 'body',
		title : 'Choose your drug database <a href="#" class="close" data-dismiss="alert">&times;</a>',
		constraints : [{to: 'window', pin: ['left', 'right']}], //'tether' constraints is an improvement. DH.
		content : function() {
			//get the concept Id from the href
			var href = $(this).attr('href');
			var n = href.split('_');
			var conceptId = n[1];
			var langCode = n[2];
			
			var mapToDrugLink = function(drugDatabase) {
				var drugDbsForConceptId = drugMappings[conceptId];
				var drugId;
				
				if(drugDbsForConceptId!=undefined){
					//get drug Db Id from map
					drugId = drugDbsForConceptId[drugDatabase];
				}
				
				if(drugId==undefined){
					drugId='';
				}
				var drugDatabaseDisplayName=drugDatabase;
				if(drugDatabase==='BNFC'){
				    drugDatabaseDisplayName='BNF FOR CHILDREN';
				}
				return '<li><a href="/druglink?dd=' + drugDatabase + '&ddId=' + encodeURIComponent(drugId) + '&langCode=' + langCode + '" target="_blank">' + drugDatabaseDisplayName + '&nbsp;<span class="icon icon-bp-icons-outbound-link"></span></a></li>';
			}
			return '<ul class="pop-list">'+ drugDatabases.map(mapToDrugLink).join('') +'</ul><br/><p>'+jQuery.i18n.prop('topic.section.treatment-options.disclaimer')+ '</p>';//join removes commas
		} 
	});
	

	$(document).on("click", ".popover .close", function() {
		$(this).parents(".popover").popover('hide');
	});
}//data-placement="top"

function morePops(p){
	var morep = p.find('a.morePop');
	morep.popover({
		html : true,
		container : 'body',
		constraints: [{to: 'window', pin: ['left', 'right']}], 
		content : function() {
			var par = $(this).parent();
			var popTitle = par.find('.popTitle')/*.first()*/.text();
			var refContent = par.find('.popText').html();
			return '<div class="more-title">'+ popTitle +' <a href="#" class="close" data-dismiss="alert">&times;</a></div><div class="more-edit">' + refContent + '</div>';
		}, 

	});

	morep.each(function(index){
		$(this).attr('href', '#referencePop-more'+ index);
	
		$(this).parent('.reference').find('.reference').each(function(){

			var refP = $(this).find('.referencePop');
			$(this).find('.citationText').prepend(refP.text() +'&nbsp;');
			refP.remove();

			var refSpan = $(this).find('.citationFullTextUrl');
			if(refSpan.length){
				refSpan.replaceWith('<a href="'+ refSpan.text() +'" class="more-article" target="_blank">Full text <span class="material-icons material-icons-inline">&#xE89E;</span></a>');
			}

			var refSpan2 = $(this).find('.referenceUniqueId');
			if(refSpan2.length){
				refSpan2.replaceWith('<span class="remove">|</span>&nbsp;<a href="'+ refSpan2.text() +'" class="more-article" target="_blank">Abstract <span class="material-icons material-icons-inline">&#xE89E;</span></a>');
			}
		});
	});
}
