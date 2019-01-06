function register({onUpdate}){
    if(navigator.serviceWorker){
        navigator.serviceWorker.addEventListener('message',function(e){
            let {data}=e;
            if(data.requestPageUrl){
                sendPageUrl();
            }
            else if(data.onUpdate){
                onUpdate&&onUpdate.call(null);
            }
        })
        navigator.serviceWorker.register(swPath).then(function (reg) {
            if (reg.active) {
                sendPageUrl();
            }
            return reg;
        })
    }
}
function sendPageUrl(){
    send_message_to_sw({pageUrl:location.href})
}
function send_message_to_sw(msg){
    return new Promise(function(resolve, reject){
        // Create a Message Channel
        var msg_chan = new MessageChannel();
        // Handler for recieving message reply from service worker
        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };
        // Send message to service worker along with port for reply
        navigator.serviceWorker.controller.postMessage(msg, [msg_chan.port2]);
    });
}
const worker={
    register
}
export default worker;