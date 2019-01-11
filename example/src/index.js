import worker from '../../lib/worker';
const text="hello world!";
document.body.innerHTML=text;
worker.register({
    onUpdate:()=>{
        const test="Page has a new version, whether to refresh the page";
        var result=confirm(test);
        if(result){
            window.location.reload();
        }
    }
});