import worker from '../../lib/worker';
console.log('hello world132131232');
worker.register({
    onUpdate:()=>{
        console.log('onUpdate');
    }
});