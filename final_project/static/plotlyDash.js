//----------
ShowGenre();

function ShowGenre() {
    var genre_url="/genres";
    var genre_name_array = [];
    var genre_count_array = [];
    Plotly.d3.json(genre_url, function(error, response) {  
        for(var i=0; i<response.length; i++)
        {
            genre_name_array.push(response[i]["genre"])
            console.log(genre_name_array)
            
            genre_count_array.push(response[i]["count"])
            console.log(genre_count_array)
        }
        console.log(genre_count_array)
        DrawPieChart(genre_count_array,genre_name_array, "Genre BreakDown", "stats_div");
    }); 
    
}


function ShowLabels() {
    var url="/labels";
    Plotly.d3.json(url, function(error, response) {
        var name_array = [];
        var count_array = [];
        for(var i=0; i<response.length; i++)
        {
            name_array.push(response[i]["label"])
            console.log(name_array)
            count_array.push(response[i]["count"])
            console.log(count_array)
        }    
        DrawBarChart(count_array, name_array, name_array, "Label BreakDown", "stats_div");
    });
}

function ShowLabelsTop() {
    var url="/TopTenLabels";
    Plotly.d3.json(url, function(error, response) {
        var name_array = [];
        var count_array = [];
        for(var i=0; i<response.length; i++)
        {
            name_array.push(response[i]["label"])
            console.log(name_array)
            count_array.push(response[i]["count"])
            console.log(count_array)
        }    
        DrawBarChart(count_array, name_array, name_array, "Top 10 Label BreakDown", "stats_div");
    });
}

function ShowArtist() {
    var url="/artists";
    Plotly.d3.json(url, function(error, response) {
        var name_array = [];
        var count_array = [];
        for(var i=0; i<response.length; i++)
        {
            name_array.push(response[i]["artist"])
            console.log(name_array)
            count_array.push(response[i]["count"])
            console.log(count_array)
        }    
        DrawBarChart(count_array, name_array, name_array, "Artist BreakDown", "stats_div");
    });
}

function ShowTopArtist() {
    var url="/TopTenArtists";
    Plotly.d3.json(url, function(error, response) {
        var name_array = [];
        var count_array = [];
        for(var i=0; i<response.length; i++)
        {
            name_array.push(response[i]["artist"])
            console.log(name_array)
            count_array.push(response[i]["count"])
            console.log(count_array)
        }    
        DrawBarChart(count_array, name_array, name_array, "Top 10 Artist BreakDown", "stats_div");
    });
}

function ShowContributor() {
    var url="/all_contributor";
    Plotly.d3.json(url, function(error, response) {
        var name_array = [];
        var count_array = [];
        for(var i=0; i<response.length; i++)
        {
            name_array.push(response[i]["author"])
           
            count_array.push(response[i]["count"])
            
        }    
        DrawBarChart(count_array, name_array, name_array, "Contributor BreakDown", "stats_div");
    });
}

function ShowTopContributor() {
    var url="/top_contributor";
    Plotly.d3.json(url, function(error, response) {
        var name_array = [];
        var count_array = [];
        for(var i=0; i<response.length; i++)
        {
            name_array.push(response[i]["author"])
           
            count_array.push(response[i]["count"])
            
        }    
        DrawBarChart(count_array, name_array, name_array, "Top Contributor BreakDown", "stats_div");
    });
}



function ShowTopContributorJoeTangari() {
    var url="/top_contributor_JoeTangari";
    Plotly.d3.json(url, function(error, response) {
        var score_array = [];
        var count_array = [];
        for(var i=0; i<response.length; i++)
        {
            score_array.push(response[i]["score"])
           
            count_array.push(response[i]["count"])
            
        }    
        DrawBarChart(count_array, score_array, score_array, "JoeTangari_Scores", "stats_div");
    });
}
//Create a PIE chart that uses your data  
function DrawPieChart(value_array, name_array, title, div_name)
{
    //var value_array = value_array.slice(0,10);
    //var name_array = name_array.slice(0,10);
    //var hovertext_array = hovertext_array.slice(0,10);

    var divElement = document.getElementById(div_name);
    divElement.innerHTML = "";
    var data = [{
        values: value_array,
        labels: name_array,
        type: "pie"
    }];
    var layout = {
        widht: 500,
        height: 800,
        title: title
    };
    Plotly.newPlot(divElement, data, layout);
    divElement.classList.add(div_name);
}






//Create a Bar chart that uses your data  
function DrawBarChart(value_array, name_array, hovertext_array, title, div_name)
{
    var divElement = document.getElementById(div_name);
    divElement.innerHTML = "";
    var data = [{
        y: value_array,
        x: name_array,
        hovertext: hovertext_array,
        type: "bar"
    }];
    var layout = {
        widht: 400,
        height: 600,
        title: title
    };
    Plotly.newPlot(divElement, data, layout);
    divElement.classList.add(div_name);
}

function DrawBubbleChart(value_array, name_array, hovertext_array, title, div_name)
{
    var divElement = document.getElementById(div_name);
    divElement.innerHTML = "";
    var data = [{
        y: value_array,
        x: name_array,
        hovertext: hovertext_array,
        mode: 'markers',
        marker: {
            size: value_array
          }
    }];
    var layout = {
        widht: 500,
        height: 800,
        title: title
    };
    Plotly.newPlot(divElement, data, layout);
    divElement.classList.add(div_name);
}