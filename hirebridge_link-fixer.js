// ==UserScript==
// @name     hirebridge.com Link Fixer
// @version  1
// @grant    none
// @match https://recruit.hirebridge.com/*
// @run-at document-idle
// ==/UserScript==

let retries = 50;

function fixLinks () {
  var anchors = document.getElementById('items').getElementsByTagName("a");
  var cid = new URL(location.href).searchParams.get('cid')
  var baseURL = "https://recruit.hirebridge.com/v3/CareerCenter/v2/details.aspx?cid=" + cid + "&jid=";
  
  for (var i = 0; i < anchors.length; i++) {
    var jobID = anchors[i].getAttribute("onclick").substring(12, 18);
    anchors[i].setAttribute("href", baseURL + jobID);
    anchors[i].setAttribute("target", "_blank");
    anchors[i].removeAttribute("onclick");
  }
}

const intervalID = setInterval(_ => {
    const match = document.querySelector(".jobitem.firstjob.col-sm-offset-1.col-sm-10.col-md-offset-2.col-md-8.col-lg-offset-3.col-lg-6");
    if(match){
      fixLinks();
    }

    retries--;
    if(retries == 0 || match) clearInterval(intervalID);
}, 100);
