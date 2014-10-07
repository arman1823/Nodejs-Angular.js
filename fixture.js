// ce fichier permet d'ajouter des données de test à la base de donnée 
var model = require('./model/model');
// ce fichier permet d'ajouter des données de test à la base de donnée 
var model = require('./model/model');
var Section = require('./model/section').Section;
var mongoose = require('mongoose');


model.connect(function (){
	mongoose.connection.collections['sections'].drop(function (){
		// 6ème
		var s6 = new Section({
			name: "6ème",
			year: 2014,
			parent: null
		});
		s6.save(function (err, six) {
			var tab = ["6_1", "6_2", "6_3", "6_4", "6_5", "6_6"];
			var x = 1;
			for(var i=0; i<=5; i++){
				tab[i] = new Section({
					name: x,
					year: 2014,
					parent: six._id
				});
				tab[i].save();
				x++;
			}
		});
		// 5ème
		var s5 = new Section({
			name: "5ème",
			year: 2014,
			parent: null
		});
		s5.save(function (err, five) {
			for(var i=1; i<=6; i++){
				var t = new Section({
					name: i,
					year: 2014,
					parent: five._id
				});
				t.save();
			}
		});
		// 4ème
		var s4 = new Section({
			name: "4ème",
			year: 2014,
			parent: null
		});
		s4.save(function (err, four) {
			var tab = ["4_1", "4_2", "4_3", "4_4", "4_5", "4_6"];
			var x = 1;
			for(var i=0; i<=5; i++){
				tab[i] = new Section({
					name: x,
					year: 2014,
					parent: four._id
				});
				tab[i].save();
				x++;
			}
		});
		// 3ème
		var s3 = new Section({
			name: "3ème",
			year: 2014,
			parent: null
		});
		s3.save(function (err, three) {
			var tab = ["3_1", "3_2", "3_3", "3_4", "3_5", "3_6"];
			var x = 1;
			for(var i=0; i<=5; i++){
				tab[i] = new Section({
					name: x,
					year: 2014,
					parent: three._id
				});
				tab[i].save();
				x++;
			}
		});
		// Seconde
		var s2 = new Section({
			name: "Seconde",
			year: 2014,
			parent: null
		});
		s2.save(function (err, two) {
			var tab = ["2_1", "2_2", "2_3", "2_4", "2_5", "2_6"];
			var x = 1;
			for(var i=0; i<=5; i++){
				tab[i] = new Section({
					name: x,
					year: 2014,
					parent: two._id
				});
				tab[i].save();
				x++;
			}
		});
		// Première
		var s1 = new Section({
			name: "Première",
			year: 2014,
			parent: null
		});
		s1.save(function (err, one) {
			var tab = ["2_1", "2_2", "2_3", "2_4", "2_5", "2_6"];
			var x = 1;
			for(var i=0; i<=5; i++){
				tab[i] = new Section({
					name: x,
					year: 2014,
					parent: one._id
				});
				tab[i].save();
				x++;
			}
		});
		// Terminale
		var s0 = new Section({
			name: "Terminale",
			year: 2014,
			parent: null
		});
		s0.save(function (err, zero) {
			var tab = ["1_1", "1_2", "1_3", "1_4", "1_5", "1_6"];
			var x = 1;
			for(var i=0; i<=5; i++){
				tab[i] = new Section({
					name: x,
					year: 2014,
					parent: zero._id
				});
				tab[i].save();
				x++;
			}
		});
	});
});



