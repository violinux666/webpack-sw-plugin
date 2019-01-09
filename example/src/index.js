import worker from '../../lib/worker';
const text="hello world!!!";
document.body.innerHTML=text;
worker.register({
    onUpdate:()=>{
        console.log('client has a new version. page will refresh in 5s....');
        setTimeout(function(){
            window.location.reload();
        },5000)
    }
});