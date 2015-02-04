var keystone = require('keystone'),
	Types = keystone.Field.Types;

/** 
	Posts
	=====
 */

var PeterTestxx = new keystone.List('TestObj', {
	label: 'Test Object',
	path: 'testobjpath',
	singular: 'Test Objects',
	schema :  { collection: 'TestObj' }

});

PeterTestxx.add({
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

// PeterTestxx.addPattern('standard meta');
PeterTestxx.defaultSort = '-title';
PeterTestxx.defaultColumns = 'date|10%,daycode|10%,title|30%,daytheme|15%,description|15%,eventid|10%';
PeterTestxx.register();


