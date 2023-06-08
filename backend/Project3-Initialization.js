




function init() {
    //Call url needed for menu
    url = 'http://127.0.0.1:5000/mortality_rate';
    // Making dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then(function(data) {
        let first = data;
        data.forEach((document) => {
            console.log(document["_id"]);
            // Adds samples to dropdown menu
            dropdownMenu.append("option")
            .text(document["_id"])
            .property("value",document["_id"]);
        });
        let sample_one = first[0]["_id"];
        console.log(sample_one);
        // Functions for all sections
        startHeatMap();
        startChart2(sample_one);
        startChart3(sample_one);
    })
}

function optionChanged(value) {

    startChart2(value);
    startChart3(value)
}
init()