import worker from '../../lib/worker';
console.log('hello world!');
worker.register({
    onUpdate:()=>{
        console.log('onUpdate');
    }
});