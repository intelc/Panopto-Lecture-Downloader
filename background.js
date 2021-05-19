// Message listener
//console.log('hello')
chrome.tabs.onActivated.addListener(function(tab){
	
	chrome.tabs.get(tab.tabId, current_tab_info => {
		
		if ((/^.*panopto.*/.test(current_tab_info.url))&&(/^.*Viewer.*/.test(current_tab_info.url))) {
			
            chrome.browserAction.setIcon({
				path: 'download-icon-disable.png',
				tabId: tab.tabId
			});
			
		}else{
			chrome.browserAction.setIcon({
				path: 'download-icon-green.png',
				tabId: tab.tabId
			});
			chrome.runtime.sendMessage({
				action: "NOPE",
				
			 });
		}
	})
})
chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
	
	chrome.tabs.get(tabId, current_tab_info => {
		
		if ((/^.*panopto.*/.test(current_tab_info.url))&&(/^.*Viewer.*/.test(current_tab_info.url))) {
			
            chrome.browserAction.setIcon({
				path: 'download-icon-disable.png',
				tabId: tab.tabId
			})
			
			
		}else{
			chrome.browserAction.setIcon({
				path: 'download-icon-green.png',
				tabId: tab.tabId
			})
			chrome.runtime.sendMessage({
				action: "NOPE",
				
			 })
		}
	})
})




// Callback to download video
function downloadCallback(infoArray) {
	if(typeof infoArray != "undefined") {
			
		var url = infoArray[0]
		var name = infoArray[1]
		var prim = infoArray[2]
		console.log('url')
		chrome.downloads.download( {
					url: url,
					filename: name,
					saveAs: true
		});
		if (prim.includes('blob')){
			console.log('prim')
			chrome.downloads.download( {
				url: prim,
				filename: `primary_${name}`,
				saveAs: true
	});	
		}
	}
}
