//===========================================================================
// Traitement de la req_attente_jouer
// Auteur : Achraf, Djibril, Ismael
// Version : 08/12/2017
//===========================================================================

"use strict"

var fs = require('fs');
require ('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var membre;
	var contenu_questionnaire;
	var contenu_partie;
	var contenu_connectes;
	var listeConnectes = [];
	var monQuestionnaire = [];
	var questionnaire;
	var maPartie = [];
	var joueur;
	var tour;
	var i;
	var n;
	var trouve;
	var Player;
	var Player1;

	// ON REDIRIGE EN JOUEUR ACTIF

	contenu_questionnaire = fs.readFileSync("questionnaire.json", 'UTF-8');
	monQuestionnaire = JSON.parse(contenu_questionnaire);

	contenu_connectes = fs.readFileSync("connectes.json", 'UTF-8');
    listeConnectes = JSON.parse(contenu_connectes);

	joueur = false;
	i =0;
	while(i<listeConnectes.length && joueur === false) {
		if(listeConnectes[i].pseudo === query.pseudo) {
			contenu_partie = fs.readFileSync("partie"+listeConnectes[i].NP+".json", 'UTF-8');
			maPartie = JSON.parse(contenu_partie);
			joueur = true;
		} else {
		i++;
		}
	}

	trouve = false;
	i = 0;
	while(i<listeConnectes.length && trouve === false) {
		if(listeConnectes[i].pseudo === query.pseudo) {
			Player = listeConnectes[i].adv;
			Player1 = listeConnectes[i].pseudo;
			trouve = true;
		}else{
		i++;
		}
	}

	trouve = false;
	i = 0;
	while(i<listeConnectes.length && trouve === false) {
		if(listeConnectes[i].pseudo === Player) {
			console.log("dacc");
			console.log(i);
			if(listeConnectes[i].etat === "JEU"){
				trouve = true;
			} else {
				i++;
			}
		}else{
		i++;
		}
	}

	if(trouve === true) {
		tour = Number(maPartie[0].tour);
		if(query.pseudo === listeConnectes[i].NP) {
			if(tour % 2 === 0) {

					questionnaire = {};
					questionnaire.question = monQuestionnaire[maPartie[1].J1.question[0]].question
					questionnaire.reponses1 = monQuestionnaire[maPartie[1].J1.question[0]].reponses[0];
					questionnaire.reponses2 = monQuestionnaire[maPartie[1].J1.question[0]].reponses[1];
					questionnaire.reponses3 = monQuestionnaire[maPartie[1].J1.question[0]].reponses[2];
					questionnaire.reponses4 = monQuestionnaire[maPartie[1].J1.question[0]].reponses[3];

					marqueurs = {};
					marqueurs.pseudo = query.pseudo;
					marqueurs.j1 = query.pseudo;
					marqueurs.j2 = Player1;
					marqueurs.score1 = maPartie[1].J1.points;
					marqueurs.score2 = maPartie[1].J2.points;

					page = fs.readFileSync('joueur_actif.html', 'UTF-8');

					page = page.supplant(marqueurs);
					page = page.supplant(questionnaire);


			} else {

				marqueurs = {};
				marqueurs.pseudo = query.pseudo;
				marqueurs.j1 = query.pseudo;
				marqueurs.j2 = Player1;
				marqueurs.score1 = maPartie[1].J1.points;
				marqueurs.score2 = maPartie[1].J2.points;
				page = fs.readFileSync('joueur_passif.html', 'UTF-8');
				page = page.supplant(marqueurs);

			}

		} else {
			if(tour % 2 === 0) {

				marqueurs = {};
				marqueurs.pseudo = query.pseudo;
				marqueurs.j2 = query.pseudo;
				marqueurs.j1 = Player1;
				marqueurs.score1 = maPartie[1].J1.points;
				marqueurs.score2 = maPartie[1].J2.points;
				page = fs.readFileSync('joueur_passif.html', 'UTF-8');
				page = page.supplant(marqueurs);

			} else {

					questionnaire = {};
					questionnaire.question = monQuestionnaire[maPartie[1].J2.question[0]].question
					questionnaire.reponses1 = monQuestionnaire[maPartie[1].J2.question[0]].reponses[0];
					questionnaire.reponses2 = monQuestionnaire[maPartie[1].J2.question[0]].reponses[1];
					questionnaire.reponses3 = monQuestionnaire[maPartie[1].J2.question[0]].reponses[2];
					questionnaire.reponses4 = monQuestionnaire[maPartie[1].J2.question[0]].reponses[3];

					marqueurs = {};
					marqueurs.pseudo = query.pseudo;
					marqueurs.j2 = query.pseudo;
					marqueurs.j1 = Player1;
					marqueurs.score1 = maPartie[1].J1.points;
					marqueurs.score2 = maPartie[1].J2.points;

					page = fs.readFileSync('joueur_actif.html', 'UTF-8');

					page = page.supplant(marqueurs);
					page = page.supplant(questionnaire);

			}


		}
	} else {

	//if(fin = true) {

console.log("okk man");

		trouve = false;
		i = 0;
		while(i<listeConnectes.length && trouve === false) {
			if(listeConnectes[i].pseudo === query.pseudo) {
				Player = listeConnectes[i].adv;
				console.log("pute");
				trouve = true;
			}else{
			i++;
			}
		}
console.log("okk");
		trouve = false;
		i = 0;
		while(i<listeConnectes.length && trouve === false) {
			if(listeConnectes[i].pseudo === Player) {
				if(listeConnectes[i].etat === "GAGNANT") {

					page = fs.readFileSync('perd.html', 'UTF-8');
					marqueurs = {};
					marqueurs.pseudo = query.pseudo;
					page = page.supplant(marqueurs);
					trouve = true;

				} else if(listeConnectes[i].etat === "PERDANT") {
					page = fs.readFileSync('gagne.html', 'UTF-8');
					marqueurs = {};
					marqueurs.pseudo = query.pseudo;
					page = page.supplant(marqueurs);
					trouve = true;
				}
			}else{
			i++;
			}
		}
		
	}

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

	//============================================================================
}
module.exports = trait;
