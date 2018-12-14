//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse); //JS Promise
const margin = {t:50, r:50, b:50, l:50};
const depthScale = d3.scaleOrdinal()
	.domain([0,1,2,3,4])
	.range(['blue', 'red', '#03afeb', 'yellow', 'green']);

data.then(function(rows){

	console.log(rows);

	const permitsByBorough = d3.nest()
	//.key(function(d){return d.borough})//first, divide the dataset by boroughs
	.key(function(d){return d.job_type})//under each borough array, divide the data by job type
	.key(function(d){return d.borough})
	.entries(rows);
	//console.log(permitsByBorough);

	//we have to manually create a top because what we have is an array of two objects
	//there are 2 arguments in hierarchy function(object,function)
	const rootNode = d3.hierarchy({//what is used in hierarchy must be an object, that's why we used json in last example
		key:'root',
		values:permitsByBorough
	},function(d){return d.values});

	const rootNodeByCost = rootNode.sum(function(d){return d.cost_estimate});//calculate each value of single project
	//sum won't create a new array, it will modify the existing array and add a new property
	//const rootNodeByCount = rootNode.count();

	console.log(rootNode);
	console.log('--------');
	console.log(rootNode.children[0]);
	//be aware of the sum & count

	const partitionDiv = d3.select('#partition').node();//it's a node not a selection
	const W = partitionDiv.clientWidth;
	const H = partitionDiv.clientHeight;
	const w = W - margin.l - margin.r;
	const h = H - margin.t - margin.b;

	const plot = d3.select('#partition')
		.append('svg')
		.attr('width', W)
		.attr('height', H)
		.append('g')
		.attr('class','nodes')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);
	
	const partition = d3.partition().size([w,h])//this is a function, taking hierarchical data and returning the visual coordinates in the property(4 more)
	
	const dataTransformed = partition(rootNode);
	draw(dataTransformed,plot);
	console.log(dataTransformed.descendants());


	d3.select('#cost-vs-sqft').on('click', function(){
		rootNode.sum(function(d){return d.cost_estimate})
	    const dataTransformed = partition(rootNode);
	    draw(dataTransformed,plot);
	    console.log("cost-vs-sqft");
	});

	d3.select('#per-sqft-vs-borough').on('click', function(){
		rootNode.count();
		const dataTransformed = partition(rootNode);
		draw(dataTransformed,plot);
	    console.log("per-sqft-vs-borough");
		})

	// const nodesEnter = nodes.enter()
	// 	.append('g')
	// 	.attr('class','node')
	// 	.on('mouseenter',function(d){
	// 		console.log(d.data.key,d.value)
	// 		d3.select(this)
	// 		.select('rect')
	// 		.style('fill-opacity',0.5)
	// 	})
	// 	.on('mouseleave',function(d){
	// 		d3.select(this)
	// 		.select('rect')
	// 		.style('fill-opacity',1)
	// 	});

	
	console.groupEnd();



})

function draw(data,plot){
//Draw/Update DOM nodes based on the data

	const rectNodes = plot.selectAll('.node')
		.data(
			data
			.descendants()
			.filter(function(d){
				return d.depth < 3
		})
	);//UPDATE

	//ENTER

	const rectNodesEnter = rectNodes.enter()
		.append('rect')
		.attr('class','node');

	rectNodes.merge(rectNodesEnter)
		.transition()
		.attr('x',function(d){return d.x0})
		.attr('y',function(d){return d.y0})
		.attr('width',function(d){return d.x1-d.x0})
		.attr('height',function(d){return d.y1-d.y0})
		.style('fill',function(d){
			switch(d.depth){
				case 0:return 'red';
				case 1:return 'blue';
				case 2:return 'green'
			}
		})
		.style('stroke','black')
		.style('stroke-width','1px');

	const labelNodes = plot.selectAll('text')
		.data(
			data
			.descendants()
			.filter(function(d){
				return d.depth < 3
			})
		);

	const lableNodesEnter = labelNodes.enter()
		.append('text');

	labelNodes.merge(lableNodesEnter)
		.text(function(d){return d.data.key})
		.attr('text-anchor','middle')
		.transition()
		.attr('x',function(d){return (d.x0+d.x1)/2})
		.attr('y',function(d){return (d.y0+d.y1)/2});
		
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
		cost_per_sqft: +d.square_footage > 0 ? (+d.cost_estimate /+d.square_footage):0
	}
}