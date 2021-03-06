/**
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this file,
You can obtain one at http://mozilla.org/MPL/2.0/.

Copyright (c) 2014, Saiful Alam  saiful.alam15@gmail.com
**/

var fireMatching= {
 winCounter : 0
};

fireMatching.deck = [
	'cardAK', 'cardAK',
	'cardBQ', 'cardBQ',
	'cardCJ', 'cardCJ',
	'cardDK', 'cardDK',
	'cardAA', 'cardAA',
	'cardBK', 'cardBK',	
];


$(function(){
	
	fireMatching.deck.sort(shuffle);
	
	
	for(var i=0;i<11;i++){
		$(".card:first-child").clone().appendTo("#cards");
	}
	

	$("#cards").children().each(function(index) {		
	
		$(this).css({
			"left" : ($(this).width()  + 20) * (index % 4),
			"top"  : ($(this).height() + 20) * Math.floor(index / 4)
		});
		var pattern = fireMatching.deck.pop();
		
		$(this).find(".back").addClass(pattern);
				
		$(this).attr("data-pattern",pattern);
		
		$(this).click(selectCard);				
	});	
	

	
	fireMatching.elapsedTime = 0;
			

	fireMatching.timer = setInterval(countTimer, 1000);	
	
});


function countTimer()
{
	fireMatching.elapsedTime++;
	
	var minute = Math.floor(fireMatching.elapsedTime / 60);
	var second = fireMatching.elapsedTime % 60;	
	
	
	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;
	
	
	$("#elapsed-time").html(minute+":"+second);
}


function selectCard() {
	
	if ($(".card-flipped").size() > 1)
	{
		return;
	}
	
	$(this).addClass("card-flipped");
	
	
	if ($(".card-flipped").size() == 2)
	{
		setTimeout(checkPattern,500);
	}
}

function shuffle()
{

	return 0.5 - Math.random();
}

function checkPattern()
{
	if (isMatchPattern())
	{
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		
		
		$(".card-removed").bind("webkitTransitionEnd", removeTookCards);
			fireMatching.winCounter++;	
			gameover();
	}
	else
	{
		$(".card-flipped").removeClass("card-flipped");
	}
}

function removeTookCards()
{

$(".card-removed").remove();
		
}


function isMatchPattern()
{
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}


function gameover()
{
	 var matchedPairs = 6;
if(matchedPairs == fireMatching.winCounter){

	
	clearInterval(fireMatching.timer);
	

	$(".score").html($("#elapsed-time").html());
		
		
		var lastElapsedTime = localStorage.getItem
		("last-elapsed-time");

	var minute = Math.floor(lastElapsedTime / 60);
	var second = lastElapsedTime % 60;
	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;

	$(".last-score").html(minute+":"+second);

	localStorage.setItem
	("last-elapsed-time", fireMatching.elapsedTime);
	$("#popup").removeClass("hide");
}
}

