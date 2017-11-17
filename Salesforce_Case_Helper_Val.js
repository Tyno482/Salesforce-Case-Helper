// ==UserScript==
// @name        Salesforce_Case_Helper_Val
// @namespace   salesforce.com
// @include     https://bazaarvoice1.my.salesforce.com/* 
// @include     https://bazaarvoice1--e2cp.na3.visual.force.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource	Customcss case_helper_valentin.css 
// @version     1.4
// @grant		GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==
/*

Define your signature in the userSignature variable

\n is a carriage return (Enter/Return)

*/
var Signature = "\nBest regards,\n \nValentin \nTechnical Success Manager | Bazaarvoice";
var FR_TTSR = "\nMon nom est Valentin de l'équipe Technical Success de Bazaarvoice.\n\nJe suis en train d’analyser cette requête et reviendrai vers vous aussi rapidement que possible.\n\nN’hésitez pas à ajouter tout commentaire ou question que vous pourriez avoir dans ce ticket.\n\nCordialement, \n\nValentin\nTechnical Success Manager | Bazaarvoice";
var TTSR = "\nThis is Valentin from the Bazaarvoice Technical Success team and I will be assisting you with this case.\n\nI am currently reviewing this request and will get back to you as soon as possible.\n\nFeel free to add any questions or comments that you might have to this ticket. \n\nBest regards, \n\nValentin\nTechnical Success Manager | Bazaarvoice";
var closeSignature = "However, should you have any issues or questions regarding this ticket, feel free to contact us by opening a new ticket referencing this one.\n\nAlso, I wanted to inform you that you might receive a client satisfaction survey. As we always want to improve our customer service, we would greatly appreciate your feedback on how your experience has been with us. \n\nHave a great rest of the week!\n\nBest regards, \n\nValentin\nTechnical Success Manager | Bazaarvoice";
var FR_Signature = "Cordialement,\n \nValentin \nTechnical Success Manager | Bazaarvoice";

var newCSS = GM_getResourceText ("Customcss");

//this block runs on all salesforce case pages and all new comments page. Fixes word wrap issue, adds signature buttons and floats WorkIt!
GM_addStyle (newCSS);
if(document.location.origin === 'https://bazaarvoice1--e2cp.na3.visual.force.com'){
	window.addEventListener("load", Greasemonkey_main1, false);}
function Greasemonkey_main1(){
	var commentRow = document.getElementById('pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:cannedPBSI:cannedOP');
	var SignatureButton = document.createElement('input');
	SignatureButton.id = 'SignatureButton';
	SignatureButton.setAttribute('class','btn');
	SignatureButton.setAttribute('type','button');
	SignatureButton.setAttribute('name','SignatureButton');
	SignatureButton.setAttribute('value','Signature');

    var FR_signatureButton = document.createElement('input');
	FR_signatureButton.id = 'FR_signatureButton';
	FR_signatureButton.setAttribute('class','btn');
	FR_signatureButton.setAttribute('type','button');
	FR_signatureButton.setAttribute('name','FR_signatureButton');
	FR_signatureButton.setAttribute('value','FR_Signature');

    var FR_TTSRButton = document.createElement('input');
    FR_TTSRButton.id = 'FR_TTSRButton';
	FR_TTSRButton.setAttribute('class','btn');
	FR_TTSRButton.setAttribute('type','button');
	FR_TTSRButton.setAttribute('name','FR_TTSR');
	FR_TTSRButton.setAttribute('value','FR_TTSR');

	var TTSRButton = document.createElement('input');
	TTSRButton.id = 'TTSRButton';
	TTSRButton.setAttribute('class','btn');
	TTSRButton.setAttribute('type','button');
	TTSRButton.setAttribute('name','TTSR');
	TTSRButton.setAttribute('value','TTSR');

	var closeButton = document.createElement('input');
	closeButton.id = 'closeButton';
	closeButton.setAttribute('class','btn');
	closeButton.setAttribute('type','button');
	closeButton.setAttribute('name','closeSignature');
	closeButton.setAttribute('value','Closing Signature');

	commentRow.insertBefore(SignatureButton,null);
    commentRow.insertBefore(FR_signatureButton,null);
    commentRow.insertBefore(FR_TTSRButton,null);
    commentRow.insertBefore(TTSRButton,null);
    commentRow.insertBefore(closeButton,null);

    document.getElementById('FR_signatureButton').onclick = function(){document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea").value += FR_Signature;};
    document.getElementById('FR_TTSRButton').onclick = function(){document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea").value += FR_TTSR;};
	document.getElementById('TTSRButton').onclick = function(){document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea").value += TTSR;};
	document.getElementById('SignatureButton').onclick = function(){document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea").value += Signature;};
	document.getElementById('closeButton').onclick = function(){document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea").value += closeSignature;};
}//end block

//This block will run on all Support Case Types
if(document.getElementById('RecordType_ileinner').innerHTML.substr(0,12) === "Support Team"){
window.addEventListener("load", Greasemonkey_main, false);}
function Greasemonkey_main() {
	//load Open Sans font
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('link');
   script.rel = 'stylesheet';
   script.type= 'text/css';
   script.href= 'https://fonts.googleapis.com/css?family=Poppins';
   head.appendChild(script); //end font

   //This function updates the important fields with color depending on their values
	function checkImportantFields(){
		var status = document.getElementById("cas7_ileinner").innerHTML;
		var natureOfIssueField = document.getElementById('00N50000002D2N9_ileinner');
		var rootCauseField = document.getElementById('00N50000002AgSu_ileinner');
		var relatedProductField = document.getElementById('00N50000002D2Rp_ileinner');
        var SupportPractice = document.getElementById('00N5000000ACQO3_ileinner');
		var primaryTSMConversationsField = document.getElementById('00N50000009s6XR_ileinner');
		var primaryTSMPRRField = document.getElementById('00N50000009s6XW_ileinner');
        var caseOriginField = document.getElementById('cas11_ileinner');
		var caseNotes = document.getElementById('00N50000002AHM3_ileinner');
        var supportNotes = document.getElementById('00N50000001yx07_ileinner');
		//update nature of issue, root cause, and related product fields
        console.log('Checking fields . . .');
		if (natureOfIssueField.innerHTML === "&nbsp;") {
			$("#00N50000002D2N9_ileinner").addClass("status_negative");
		}else{
			$("#00N50000002D2N9_ileinner").addClass("status_positive");
		}
		if (rootCauseField.innerHTML === "&nbsp;") {
			$('#00N50000002AgSu_ileinner').addClass("status_negative");
		} else {
			$('#00N50000002AgSu_ileinner').addClass("status_positive");
		}
        if (caseOriginField.innerHTML === "&nbsp;") {
			$("#cas11_ileinner").addClass("status_negative");
		} else {
			console.log('Case Origin is present');
		}
        console.log('primaryTSMConversationsField.innerHTML = *',primaryTSMConversationsField.innerHTML,'* it is ',primaryTSMConversationsField.innerHTML.length,' character(s) long');
		if (primaryTSMConversationsField.innerHTML === " ") {
			console.log('No Primary Conversations TSM');
		} else {
			$('#00N50000009s6XR_ileinner').addClass("status_positive");
		}
        console.log('primaryTSMPRRField.innerHTML = *',primaryTSMPRRField.innerHTML,'* it is ',primaryTSMPRRField.innerHTML.length,' character(s) long');
		if (primaryTSMPRRField.innerHTML === " ") {
			console.log('No Primary PRR TSM');
		} else {
			$('#00N50000009s6XW_ileinner').addClass("status_positive");
		}
		if (SupportPractice.innerHTML === "&nbsp;") {
			$("#00N5000000ACQO3_ileinner").addClass("status_negative");
		} else {
			$("#00N5000000ACQO3_ileinner").addClass("status_positive");
		}
		//update status
		if (status === "New" || status === "In Progress" || status === "Assigned") {
			$('#cas7_ileinner').addClass("status_negative");
		} else if(status.substr(0,7) === "Pending") {
			$('#cas7_ileinner').addClass("pending");
		} else {
			$('#cas7_ileinner').addClass("status_positive");
		}
		//update case notes
		if (caseNotes.innerHTML !== "&nbsp;"){
			$('#00N50000002AHM3_ileinner').addClass("status_important");
		}
        //update Support notes
		if (supportNotes.innerHTML !== ""){
			$('#00N50000001yx07_ileinner').addClass("status_important");
		}
		//update last comment, contact name, description
		$("#cas3_ileinner").addClass("beautified_comment");
		$("#cas15_ileinner").addClass("beautified_comment");
		//fix container breaking
		document.getElementById('ep').style.maxWidth = window.innerWidth - 250 + "px";
		document.getElementById('bodyCell').style.maxWidth = window.innerWidth - 250 + "px";
		document.getElementById('cas15_ileinner').style.maxWidth = window.innerWidth - 250 + "px";
	}
		var placeDiv = true;
	function descriptionImage(){
			var description = document.getElementById('cas15_ileinner').innerHTML;
		var creationDate = document.getElementById('CreatedDate_ileinner').innerHTML;
		if(description.indexOf('[cid:')!= -1){
			var descnumOccurs = description.split('[cid:').length -1;
				for(var z = 0; z <= descnumOccurs; z++){
				var dateString = 0;
				var descimagePos = description.indexOf('[cid:');
				var descimagePosEnd = description.indexOf(']',descimagePos);
				var descstr = description.substr(descimagePos,descimagePosEnd-descimagePos+1);//this is the full html that needs to be replaced
				var descimageName = descstr.substr(descstr.indexOf(':')+1,descstr.indexOf('@')-descstr.indexOf(':')-1);
				var adjusteddescimageName = descimageName.split('<a href=\"mailto:').pop();
				var descanchors = document.getElementsByClassName('actionLink');
				for(var w = 0; w <= descanchors.length; w++){
					if(descanchors[w].title.indexOf(adjusteddescimageName) != -1 && descanchors[w].target === "_blank" && descanchors[w].parentNode.parentNode.children[4].innerHTML === creationDate){
							console.log('something fit this desc');
							var descimageSrc = descanchors[w].href;
							document.getElementById('cas15_ileinner').innerHTML = document.getElementById('cas15_ileinner').innerHTML.replace(descstr,"<div style='max-width:100%'><a target='_blank' href='"+descimageSrc+"'><img style='max-width:100%' src='"+descimageSrc+"'></a></div>");
						}
					}
		}}
	}
	//updates case comments to be more readable
	function updateComments() {
		var viewImages = "javascript:RelatedList.get('" + document.location.pathname.substr(1) + "_RelatedAttachmentList').showXMore(100)";
		var hiddenBtn = document.createElement('a');
		hiddenBtn.id = "hiddenBtn";
		hiddenBtn.href = viewImages;
		hiddenBtn.style.visibility = "hidden";
		if(placeDiv === true){
			document.getElementById('sessiontimeout').insertBefore(hiddenBtn,null);
			placeDiv = false;

		}


		var comments = document.getElementsByClassName("dataCell");
		//beautify comments & add images
		for (var i = 0; i < comments.length; i++){
			if (comments[i].innerHTML.substr(0,14) === "<b>Created By:"){
				comments[i].className += " beautified_comment";
				//get Date of Comment
				var dateStart = comments[i].innerHTML.indexOf('(')+1;
				var dateLength = comments[i].innerHTML.indexOf(')') - dateStart;
				var commentDate = comments[i].innerHTML.substr(dateStart,dateLength);
				if(comments[i].innerHTML.indexOf('[cid:')!= -1){ //change to while?
					var numOccurs = comments[i].innerHTML.split('[cid:').length -1;
					for(var k = 0; k <= numOccurs; k++){
					var imagePos = comments[i].innerHTML.indexOf('[cid:');
					var imagePosEnd = comments[i].innerHTML.indexOf(']',imagePos);
					var str = comments[i].innerHTML.substr(imagePos,imagePosEnd-imagePos+1);
					var imageName = str.substr(str.indexOf(':')+1,str.indexOf('@')-str.indexOf(':')-1);
					console.log(imageName);
					var anchors = document.getElementsByClassName('actionLink');
					for(var j = 0; j < anchors.length; j++){
						if(anchors[j].title.indexOf(imageName) != -1 && anchors[j].target === "_blank" && anchors[j].parentNode.parentNode.children[4].innerHTML === commentDate){
							document.getElementById('hiddenBtn').click();console.log('click');
							var imageSrc = anchors[j].href;
							comments[i].innerHTML = comments[i].innerHTML.replace(str,"<div style='max-width:100%'><a target='_blank' href='"+imageSrc+"'><img style='max-width:100%' src='"+imageSrc+"'></a></div>");
						}
					}
				}}
			}
		}
	}
	//create infobar container
	var infoBar = document.createElement("div");
	infoBar.id = "infoBar";
	document.getElementsByTagName('body')[0].appendChild(infoBar);
	infoBar.style.width = "99%";
    infoBar.style.height = "60px";
	//create and add JIRA button
	var jiraButton = document.createElement("input");
	jiraButton.id = "jiraButton";
	jiraButton.setAttribute("class","btn");
	jiraButton.setAttribute("type","button");
	jiraButton.setAttribute("name","JIRA");
	jiraButton.setAttribute("value","New JIRA");
	jiraButton.setAttribute("onclick","window.open(\"https://bits.bazaarvoice.com/jira/secure/Dashboard.jspa\",\"_blank\");");
	document.getElementById("topButtonRow").insertBefore(jiraButton,null);

	//populate infobar
	function createInfoBar(){
		var contactPhone, cluster, csdName, tamName;
        var language = document.getElementById('00N50000001zNAI_ileinner').innerHTML;
        var ResolvedDate = document.getElementById('00N50000002B1GL_ileinner').innerHTML;
		var currentLocalDate = new Date();
		var clientName = document.getElementById('cas4_ileinner').childNodes[0].innerHTML;
		var caseTitle = document.getElementById('cas14_ileinner').innerHTML;
		var slaStatus = document.getElementById('00N50000002Cffz_ileinner').innerHTML;
		var bvTime = document.getElementById('00N50000002yQKN_ileinner').innerHTML;
		var contactName = document.getElementById('cas3_ileinner').children[0].innerHTML;
		if (document.getElementById('cas9_ileinner').innerHTML !== "&nbsp;"){
			contactPhone = document.getElementById('cas9_ileinner').innerHTML;
		}
		if(document.getElementById('00N50000001yzHK_ileinner').innerHTML !== "&nbsp;"){
			cluster = document.getElementById('00N50000001yzHK_ileinner').innerHTML.toUpperCase();
		}
		if(document.getElementById('00N50000001yTBP_ileinner').innerHTML !== "&nbsp;"){
			csdName = document.getElementById('00N50000001yTBP_ileinner').innerHTML;
		}
		if(document.getElementById('00N50000002D3bq_ileinner').innerHTML !== "&nbsp;"){
			tamName = document.getElementById('00N50000002D3bq_ileinner').innerHTML;
		}

		//check for milestone
		var iDateDiff, milestoneTTCR, TTCRStatus, milestoneTTFR, TTFRStatus, milestoneTTSR, TTSRStatus, TTCRInfo, TTFRInfo, TTSRInfo, milestoneBodyID;
        var timeTitle = [];
        var timeRemain = [];
        var timeStatus = [];
        var milestoneArray = [];
		var milestoneListID = document.getElementsByClassName('listHoverLinks')[0].children[0].id;
		milestoneBodyID = milestoneListID.substr(0,milestoneListID.length-4);
		milestoneBodyID += "body";
		if(document.getElementById(milestoneBodyID).children[0].children[0].children[0].children[0].innerHTML !== "No records to display"){
            var children = document.getElementById(milestoneBodyID).children[0].children[0].children;
            for (var i = 0,len=children.length; i < len; i++) {
                milestoneArray[i] = children[i];
                // Do stuff
                console.log('Milestone: ',milestoneArray[i].children[1].innerText,' Time Remaining: ',milestoneArray[i].children[3].innerHTML);
                timeTitle[i] = milestoneArray[i].children[1].innerText;
                timeRemain[i] = milestoneArray[i].children[3].innerHTML;
                console.log("6th column(violation): ",$(milestoneArray[i].children[5].children[0]).attr('title'));
                console.log("7th column(completed): ",$(milestoneArray[i].children[6].children[0]).attr('title'));
                if(timeRemain[i] !== undefined){
                    if(timeRemain[i] === "00:00" && $(milestoneArray[i].children[5].children[0]).attr('title') !== ""){
                        timeStatus[i] = "OUT";
                    } else if(timeRemain[i] === "00:00" && $(milestoneArray[i].children[5].children[0]).attr('title') === ""){
                        timeStatus[i] = "COMPLETED";
                    } else if(timeRemain[i].substr(0,timeRemain[i].length -3) < 17){
                        timeStatus[i] = "ALMOST";
                    } else {
                        timeStatus[i] = "IN";
                    }
                }
            }
        }
        //add data to infobar
		$('#infoBar').append("<div class='infoBarCenter'>"+clientName+"<br>"+cluster+" - "+caseTitle+"<br>Resolved Date: "+ResolvedDate+"</div>");
        var timeInfo = "<div class='infoBarLeft'>";
        for (var j = 1, leng = timeTitle.length;j<leng;j++){
            timeInfo+="<span>"+timeTitle[j]+": "+timeRemain[j]+"  Status: </span><span class='"+timeStatus[j]+"'>"+timeStatus[j]+"</span></br>";
        }
        timeInfo+="<br></div>";
		$('#infoBar').append(timeInfo);
		$('#infoBar').append("<div class='infoBarRight'>"+"Contact Name: "+contactName+"<br><img width='16' height='10' src='/img/btn_nodial_inline.gif'> "+contactPhone+"<br>CSD: "+csdName+" - TAM: "+tamName+"<br>Language: "+language+"</div>");
		$(".ALMOST").css("color","#CD5C5C");
        $(".COMPLETED").css("color","#00BF09");
        $(".OUT").css("color","#CD5C5C");
        $(".OUT").css("font-weight","900");
	} //end createInfoBar
		
checkImportantFields();

//try to populate infoBar until successful
var infoBarInterval = setInterval(function(){
	try{
		createInfoBar();
		clearInterval(infoBarInterval);
	} catch(e){}},500);

//try to update comments until successful
//window.onload = setTimeout(updateComments,1200);
var intCount = 0;
var updateCommentsInterval = setInterval(function(){
	updateComments();
	descriptionImage();
	intCount++;
	if(document.getElementsByClassName('beautified_comment').length > 3 || intCount === 12){
		clearInterval(updateCommentsInterval);
	}
	},100);

}//end block
//Hide infoBar when at top of page
$(window).scroll(function() {
if(window.scrollY < 120){
$('#infoBar').fadeOut();
} else{
$('#infoBar').slideDown();
}
});