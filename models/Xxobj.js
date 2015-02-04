var keystone = require('keystone'),
	Types = keystone.Field.Types;

/** 
	Posts
	=====
 */

var XXTestxx = new keystone.List('XxObj', {
	label: 'XxObj',
	path: 'XxObj',
	singular: 'XxObj',
	schema :  { collection: 'XxObj' }

});

XXTestxx.add({
	title: { type: String , initial: true, required: true, index: true },
	date: { type: String },
	daycode: { type: String },
	daytheme: { type: String },
	description: { type: String },
	eventid: { type: String }

});



/** 
	Registration
	============
*/

// XXTestxx.addPattern('standard meta');
XXTestxx.defaultSort = '-title';
XXTestxx.defaultColumns = 'date|10%,daycode|10%,title|30%,daytheme|15%,description|15%,eventid|10%';
XXTestxx.register();


