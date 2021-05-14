// FUNCTION INCEPTION
function firstFunction() {
    console.log('First Function');
    function secondFunction() {
        console.log('Second Function is within First Function');
        function thirdFunction() {
            console.log('Third Function is within Second Function within First Function');
        }
        return thirdFunction;
    }
    return secondFunction;
}
firstFunction()()();
console.log('-----------------------------')
console.log( firstFunction() );