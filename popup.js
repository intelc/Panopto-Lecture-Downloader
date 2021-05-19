function hello() {
	console.log('hello1')
    downloadCallback(download,1)
  }
function hello2() {
    downloadCallback(download,2)
  }
  var download = null
chrome.runtime.onMessage.addListener( function (request, sender, sendResponse) {
	console.log('add listener')
	
	if (request.action == "ONE") {
		
		document.getElementById('dbox').style.display = 'flex'
		const div_im = document.createElement('img')
		
		div_im.classList.add('image_container')
		div_im.src = request.videoDetails[3]
		document.getElementById('place').append(div_im)

		console.log('ONE DETECTED')
		document.getElementById('2nd').style.display = 'none'
		download = request.videoDetails
		
	}
	else if (request.action == "TWO") {
		
		
		document.getElementById('dbox').style.display = 'flex'
		const div_im = document.createElement('img')
		
		div_im.classList.add('image_container')
		div_im.src = request.videoDetails[3]
		document.getElementById('place').append(div_im)

		console.log('TWO DETECTED')
		download = request.videoDetails
		
	}else if(request.action == "DOWNLOADONE"){
		console.log('downloadone')
		downloadCallback(download)

	}else if(request.action == "DOWNLOADTWO"){
		console.log('downloadtwo')
		downloadCallback(download)
	}else if(request.action == "NOPE"){
		

		document.getElementById('1st').style.display = 'none'
		document.getElementById('2nd').style.display = 'none'
	
		console.log('nope')

	}
	
  });
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('faq').addEventListener('click', () => {
	  chrome.tabs.create({ url: 'https://www.notion.so/Panopto-Lecture-Downloader-FAQ-02c08a775156495598524bb4c4706d91' });
	});
	chrome.tabs.executeScript({
	  file: 'payload.js'
	});
  });

 

function downloadCallback(infoArray,number) {
	if(typeof infoArray != "undefined") {
			
		var url = infoArray[0];
		var name = infoArray[1];
		var prim = infoArray[2];
		console.log('url')
		chrome.downloads.download( {
					url: url,
					filename: name,
					saveAs: true
		});
		if (prim && !prim.includes('blob')&&number===2){
			console.log('prim')
			chrome.downloads.download( {
				url: prim,
				filename: `Second_${name}`,
				saveAs: true
	});	
		}
	}
}
  document.getElementById('download').addEventListener('click', hello);
  document.getElementById('download2').addEventListener('click', hello2);