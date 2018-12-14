//1
	function computeAvgTenure(){
		let totalTenure=0;
		let avg=0;
		for(let i=0; i<arguments.length; i++){
			totalTenure += arguments[i].tenure;
		}
		avg=totalTenure/arguments.length;
		return avg;
	}

	const average = computeAvgTenure({name:"Ashley",department:"computerScience",tenure:10},
	{name:"Ben",department:"design",tenure:2},
	{name:"Carol",department:"design",tenure:3});
	console.log(average);
	
//2
	