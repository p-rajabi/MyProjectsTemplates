
(function(){
var createworker = function () {
    
    var workcount = 0;

    var task1 = function () {
        workcount += 1;
        console.log("task1 " + workcount);
    };

    var task2 = function () {
        workcount += 1;
        console.log("task2 " + workcount);
    };

    return {
        job1: task1,
        job2: task2

    };
    }





var worker = createworker();

worker.job1();
worker.job2();
worker.job1();
worker.job1();


}());
