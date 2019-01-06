self.addEventListener('message',function(e){
  var data=e.data;
  if(data.pageUrl){
    addPage(data.pageUrl)
  }
})
function addPage(page){
  caches.open(cacheStorageKey).then(function(cache){
    cache.add(page);
  })
}
self.addEventListener('install', function (e) {
  self.skipWaiting();
})

self.addEventListener('activate', function(e) { 
  caches.open(cacheStorageKey).then(function (cache) {
    cache.addAll(cacheList)
  })
  var cacheDeletePromises = caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(name => {
      if (name !== cacheStorageKey) { 
        // if delete cache,we should post a message to client which can trigger a callback function
        console.log('caches.delete', caches.delete);
        var deletePromise = caches.delete(name);
        send_message_to_all_clients({onUpdate:true})
        return deletePromise;
      } else {
        return Promise.resolve();
      }
    }));
  });

  e.waitUntil(
    Promise.all([cacheDeletePromises]
    ).then(()=>{
      return self.clients.claim().then(e=>{
        //sw should kndow the web url with any param in order to addCache
        //such as:
        //https://www.baidu.com/s?wd=webpack
        //https://www.baidu.com/s?wd=react
        send_message_to_all_clients({requestPageUrl:true});
      });
    })
  )
})
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) { 
        console.log(`fetch:${e.request.url} from cache`);
        return response
      }else{
        console.log(`fetch:${e.request.url} from http`);
        return fetch(e.request.url)
      }
    })
  )
})
function send_message_to_client(client, msg){
  return new Promise(function(resolve, reject){
      var msg_chan = new MessageChannel();
      msg_chan.port1.onmessage = function(event){
          if(event.data.error){
              reject(event.data.error);
          }else{
              resolve(event.data);
          }
      };
      client.postMessage(msg, [msg_chan.port2]);
  });
}
function send_message_to_all_clients(msg){
  clients.matchAll().then(clients => {
      clients.forEach(client => {
          send_message_to_client(client, msg).then(m => console.log("SW Received Message: "+m));
      })
  })
}