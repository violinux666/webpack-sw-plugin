import worker from '../../lib/worker';
const text="hello world!";
document.body.innerHTML=text;
worker.register({
    onUpdate:()=>{
        console.log('onUpdate');
    }
});