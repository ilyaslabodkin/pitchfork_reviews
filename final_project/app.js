
function maketable()
{
  Plotly.d3.json("/table_data", function(error, response){
response=inputData
  
function tableChartWithPagination (inputData, divName) {
	var wd = 700;
	var ht = 550;
	var keys = new Array();
    // no. of rows per page
	var pageSize = 4;
	var currentPage = 1;
	var totalPages = getTotalPages();

	// populate keys
	keys.push("#");
	for ( var k in inputData.keys) {
		keys.push(inputData.keys[k]);
	}

	// chart div
	var chart = d3.select("#" + divName).attr("width", wd).attr("height", ht);
	chart.append("div").attr('id', 'tableChart');

	var buttonTable = chart.append("div").attr('id', 'buttonDiv').append(
			"table").attr("width", "50%").attr("align", "left");
	var buttonTr = buttonTable.append("tr").attr("class", "form-group");
	buttonTr.append("td").attr("align", "right").append("button").attr("id", "tableChartPrev").text("Prev");
	buttonTr.append("td").attr("align", "center").append("button").attr("id", "tableChartNext").text("Next");
	buttonTr.append("td").attr("align", "center").text(" Jump to page #: ");
	var pagesTd = buttonTr.append("td").attr("align", "right");
	var pageSelect = pagesTd.append("select").attr("id", "selectPage");
	for (var i = 1; i < totalPages; i++) {
		pageSelect.append("option").attr("value", i).text(i);
	}

	$("#selectPage").change(function() {
		var ele = document.getElementById("selectPage");
		currentPage = parseInt(ele.options[ele.selectedIndex].value);
		if (totalPages > 0) {
			getTable(getDataSlice());
		}
	});

	$("#tableChartPrev").click(function() {
		var prevPage = getPrevPage();
		if (prevPage < currentPage) {
			currentPage = prevPage;
			getTable(getDataSlice());
		}
	});
	$("#tableChartNext").click(function() {
		var nextPage = getNextPage();
		if (nextPage > currentPage) {
			currentPage = nextPage;
			getTable(getDataSlice());
		}
	});

	function getTotalPages() {
		var len = inputData.data.length;
		var total = 0;
		if (len > 0) {
			if (len > pageSize) {
				total = len / pageSize;
                total = total + 1;
			} else {
				total = 1;
			}
		}
		return total;
	}

	function getNextPage() {
		return ((currentPage + 1) >= totalPages) ? currentPage
				: (currentPage + 1);
	}

	function getPrevPage() {
		return (currentPage > 1) ? (currentPage - 1) : currentPage;
	}

	function getDataSlice() {
		return inputData.data.slice((currentPage - 1) * pageSize, currentPage
				* pageSize);
	}

	function getStartRowNumber() {
		var rowNum = 1;
		if (currentPage > 1) {
			rowNum = ((currentPage - 1) * pageSize) + 1;
		}
		return rowNum;
	}

	function getTable(fData) {
		var rowNumber = getStartRowNumber();
		// clear
		$("#tableChart").empty();
		var table = chart.select("#tableChart").append("table").attr('border', '1').attr('width', '100%'); 
        var hData = table.append("thead").append("tr").selectAll("th").data(
		 keys); hData.enter().append("th").text(function(d) { return d; });
		hData.exit().remove();
		
		// create one row per segment.
		var tbody = table.append("tbody");
		var tr = null;
		for ( var i in fData) {
			tr = tbody.append("tr");
			// row number
			tr.append("td").text("" + rowNumber);
			// keys
			for ( var k in keys) {
				if (k > 0) {
					tr.append("td").text(fData[i][keys[k]]);
				}
			}
			rowNumber = rowNumber + 1;
		}
	}
	// init table
	if (totalPages > 0) {
		getTable(getDataSlice());
	}
}
}