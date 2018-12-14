//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse);
const m = {t:50, r:50, b:50, l:50};
const W = d3.select('.plot').node().clientWidth;
const H = d3.select('.plot').node().clientHeight;
const w = W - m.r - m.l;
const h = H - m.t - m.b;
console.log(w);
console.log(h);

//Scales
const scalePerSqft = d3.scaleLog().range([h, 0]);
const scaleBorough = d3.scaleOrdinal();
const scaleRadius = d3.scaleSqrt().domain([1, 148674282]).range([0,50]);


//Append <svg>
const plot = d3.select('#plot-1')
	.append('svg')
	.attr('width', W)
	.attr('height', H)
	.append('g')
	.attr('transform', `translate(${m.l}, ${m.t})`);

//create two axises
plot.append('g')
	.attr('class', 'axis-y');
plot.append('g')
	.attr('class', 'axis-x')
	.attr('transform', `translate(0, ${h})`);


data.then(function(rows){
	console.log(rows);
//The boroughs
const boroughs = d3.nest()
	.key(function(d){ return d.borough })
	.entries(rows)
	.map(function(d){ return d.key });//!!!How to create an array of borough's names
console.log(boroughs);

//Range of cost_per_sqft
const perSqftMin = d3.min(rows, function(d){ return d.cost_per_sqft });
const perSqftMax = d3.max(rows, function(d){ return d.cost_per_sqft });
console.log(perSqftMin, perSqftMax);

//Use the data gathered during discovery to set the scales appropriately
scalePerSqft.domain([1, perSqftMax]);
//How to 
scaleBorough.domain(boroughs).range(d3.range(boroughs.length).map(function(d){
	return (w-100)/(boroughs.length-1)*d + 50; //What does 'd' mean here??
}));


perSqft(rows);

});


function perSqft(data){
	const nodes = plot.selectAll('.node')
	.data(data)
	.enter()
	.append('circle')
	.attr('class','node')
		.attr('cx',function(d){return scaleBorough(d.borough)})
		.attr('cy',function(d){return scalePerSqft(d.cost_per_sqft)})
		.attr('r',3)
		.style('fill-opacity',0.2);

//drae axes
	const axisY = d3.axisLeft()
		.scale(scalePerSqft)
		.tickSize(-w);
	const axisX = d3.axisBottom()
		.scale(scaleBorough);

	plot.select('.axis-y')
		.transition()
		.call(axisY)
		.selectAll('line')
		.style('stroke-opacity', 0.1);
	plot.select('.axis-x')
		.transition()
		.call(axisX);
	}

function parse(d){
	return {
		applicant_business_name:d.applicant_business_name,
		borough:d.borough,
		community_board:d.community_board,
		cost_estimate:+d.cost_estimate, //convert string to number
		enlargement:d.enlargement_flag_yes_no === "true"?true:false, //convert string to boolean
		address: `${d.job_location_house_number} ${d.job_location_street_name}`,
		job_number:+d.job_number,
		job_type:d.job_type,
		job_type2:d.job_type2,
		permit_type:d.permit_type,
		permit_issuance_date:new Date(d.permit_issuance_date),
		square_footage:+d.square_footage,
		cost_per_sqft: +d.square_footage > 0?(+d.cost_estimate / +d.square_footage):0
	}
}