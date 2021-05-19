console.log("PAYLOAD IS ON")

function relayPopUp(){
	console.log("listener on")
		
   var response = detectVideo()
   
      if(!response[0] || !response[3]){
         chrome.runtime.sendMessage({
            action: "NOPE",
            videoDetails: response,
            hostname: window.location.hostname
         });
      }
      else if (response[2] && !response[2].includes('blob')){
         chrome.runtime.sendMessage({
            action: "TWO",
            videoDetails: response,
            hostname: window.location.hostname
         });
      }
      else{
         chrome.runtime.sendMessage({
            action: "ONE",
            videoDetails: response,
            hostname: window.location.hostname
         });
      }


   
	

};
function detectVideo(){
   var name = "";
   var url = "";
   var one = null; 
   var name = null
   var two = null;
   var image = null;
   try{
      one = document.querySelector('#HeadNode > [name=twitter\\:player\\:stream]').content
      
   }catch(e){
      console.log(`Failed to get video 1:${e}`)
   }
   try{
      image = document.querySelector('#HeadNode > [property=og\\:image]').content
      
   }catch(e){
      console.log(`Failed to get thumbnail:${e}`)
   }

   try{
      name = document.querySelector('#detailsTab > div.name').textContent
      name = name.split('/').join('_') 
      name = name.split(' ').join('_') 
      name = name.split(':').join('-')
      name = name + ".mp4"
   }catch(e){
      console.log(`Fail to get name:${e}`)
   }

   try{
      if (document.querySelector('#secondaryScreen')){
         two = document.querySelector('#primaryVideo').src
      }
      else{two=null}
     
      
   }catch(e){
      console.log(`Failed to get video 2:${e}`)
   }
  
   var infoArray = [one,name,two,image]
   return infoArray
}

relayPopUp()