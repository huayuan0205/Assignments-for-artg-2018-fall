console.log('Assignment 4');



//Append a <svg> element to .chart, and set its width and height attribute to be the same as .chart
//Hint: first, you have to find the width and height of .chart. See example for width below

const width = d3.select('.chart').node().clientWidth;
const height = d3.select('.chart').node().clientHeight;
const c = d3.select('.chart')
	.append('svg')
	.attr('height',height)
	.attr('width',width);

//Then append the following elements under <svg>:

//Horizontal and vertical grid lines, spaced 50px apart
//Hint: use a loop to do this
for(let x=0; x<width; x +=50){
	c.append('line')
		.attr('x1',x)
		.attr('y1',0)
		.attr('x2',x)
		.attr('y2',height)
		.style('stroke-width','1px')
		.style('stroke','rgba(0,0,0,0.5)');
}

for(let y=0; y<height; y +=50){
	c.append('line')
		.attr('x1',0)
		.attr('y1',y)
		.attr('x2',width)
		.attr('y2',y)
		.style('stroke-width','1px')
		.style('stroke','rgba(0,0,0,0.5)');
}



//Circle, radius 50px, center located at (50,50)
const cir1 = c.append('circle')
	 .attr('cx','50')
	 .attr('cy','50')
	 .attr('r','50');


//Another circle, radius 75px, center located at (300,200)
//Do this without setting the "cx" and "cy" attributes
const x1 = 300, y1 = 200;
const cir2 = c.append('circle')
cir2.attr('transform', `translate(${x1}, ${y1})`)
	.attr('r','75');
	

//A rectangle, offset from the left edge by 400px and anchored to the bottom
//with a width of 50px and a height of 70px
const rec = c.append('rect')
	 .attr('x','400')
	 .attr('y', height-70)
	 .attr('height','70')
	 .attr('width','50');


//Label the centers of the two circles with their respective coordinates
const circleLabel1 = c.append('text')
              .attr('x','50')
              .attr('y','50')
              .text('(50,50)')
              .attr('font-family', 'sans-serif')
              .attr('font-size', '14px')
              .attr('fill', 'white');

const circleLabel2 = c.append('text')
              .attr('x','300')
              .attr('y','200')
              .text('(300,200)')
              .attr('font-family', 'sans-serif')
              .attr('font-size', '14px')
              .attr('fill', 'white');

//Give the <rect> element a fill of rgb(50,50,50), and no stroke
//Do this without using CSS
rec.style('fill','rgb(50,50,50)')
rec.style('stroke','none');

//Give the two <circle> elements no fill, and a 2px blue outline
//Do this by giving them a class name and applying the correct CSS
cir1.attr('class', 'circles')
cir2.attr('class', 'circles')

//Uncomment the following block of code, and see what happens. Can you make sense of it?
d3.selectAll('circle')
	.transition()
	.duration(3000)
	.attr('r', 200);



