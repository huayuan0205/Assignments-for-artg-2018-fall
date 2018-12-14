console.log('Assignment 3');

/*
 * Question 1: no code necessary, 
 * but feel free to use this space as a Javascript sandbox to check your answers
 */ 
/*11. console.log('a' + number + 'b');
    console.log('${a} number ${b}');
 */

/*
 * Question 2: control structures 
 */
{
	//2.1 
	//Write a for... loop that logs 1 to 10 in reverse
	/* YOUR CODE HERE*/
	console.group("Exercise 2.1 Logs 1 to 10 in reverse:");
	for(let i=10; i>0; i--){
		console.log(i);
	}
	/* for(i=0;i<10;i++){
		console.log(10-i);
	}
	*/
	console.groupEnd();
	console.log("------------------");


	//2.2
	//Write a for... loop that increments from 0 to 500, but only prints out every 100 (i.e. 0, 100, 200, 300...)
	/* YOUR CODE HERE*/
	console.log("2.2:");
	for(let i=0; i<501; i++){
		if(i%100 === 0){
			console.log(i);
		}	
	}
	console.log("------------------");


	//2.3
	//Given an array, print out its content.
	//Log out the content of this array using a for loop
	/* YOUR CODE HERE*/
	console.log("2.3 Print out the content of the array:")
	const arr = [89, 23, 88, 54, 90, 0, 10];
	let i;
	for(i=0; i<arr.length; i++){
		console.log(arr[i]);
	}
	console.log("------------------");
}

/*
 * Question 3: no code necessary
 */

/*
 * Question 4: objects and arrays
 * Given a personnel database as follows:
- Ashley, instructor in the computer science department for 10 years
- Ben, instructor in the design department for 2 years
- Carol, instructor in the design department for 3 years
 */

{
	//4.1
	//Convert this database into a Javascript data structure.
	//4.2 
	//Write a function that takes in an array of persons, such as the one from 4.1, and return the average tenure (in years). 
   	//Hint: think algorithmically. To compute the average tenure, you need to complete a number of steps
	//- Add up all the tenures (`for` loop might be useful)
	//- Divide the sum by the number of persons
	//- Return this value
	//4.3
	//Another person, Dan, just got added to the database. 
	//He is an instructor with 5 years of tenure, and works in the humanities department. 

    console.log("4 Print out the average tenure:")
	const instructors = [
	{name:"Ashley",department:"computerScience",tenure:10},
	{name:"Ben",department:"design",tenure:2},
	{name:"Carol",department:"design",tenure:3}
	];

	function computeAvgTenure(list){
		let totalTenure=0;
		let avg=0;
		for(let i=0; i<list.length; i++){
			totalTenure += list[i].tenure;
		}
		avg=totalTenure/list.length;
		return avg;
	}
	
	instructors.push({
		name:"Dan",
		depaetment:"humanities",
		tenure:5});

	const average = computeAvgTenure(instructors);
	console.log("The average tenure of the instructors is " + average);

}
