// page_modifier_questionnaire.js 
//=====================================================================
// Traitement de "req_page_modifier_questionnaire"
// Auteur: Achraf
// Version : 11/01/2017
//=====================================================================
"use strict";
var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;
	var i;
	var liste;
	var affichage;
	var contenu = {};
	var br0;
	var br1;
	var br2;
	var br3;

	//AFFICHAGE DU QUESTIONNAIRE CHOISI

	affichage ="";
	liste = fs.readFileSync('../Questionnaires/' + query.questionnaire, "UTF-8");
	contenu = JSON.parse(liste);
	for(i=0; i<contenu.length; i++){
		br0 = "";
		br1 = "";
		br2 = "";
		br3 = "";
		if(contenu[i].br === 0){
			br0 = "checked";
		} else if (contenu[i].br === 1){
			br1 = "checked";
		} else if (contenu[i].br === 2){
			br2 = "checked";
		} else if (contenu[i].br === 3){
			br3 = "checked";
		}

	//ON AFFICHE LES QUESTIONS AVEC LEURS REPONSES AINSI QUE LE BOUTON
	//RADIO DEJA COCHE POUR LA BONNE REPONSE

		affichage = affichage + "Question : <input type='textarea' name='questions" + i + "' value='" + contenu[i].question + "' size='60px'><br>"
		affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp "+ br0 +"><input type='textarea' name='reponse0' value= '" + contenu[i].reponses[0] + "'><br>"
		affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp "+ br1 +"><input type='textarea' name='reponse1' value= '" + contenu[i].reponses[1] + "'><br>"
		affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp "+ br2 +"><input type='textarea' name='reponse2' value= '" + contenu[i].reponses[2] + "'><br>"
		affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp " +br3 +"><input type='textarea' name='reponse3' value= '" + contenu[i].reponses[3] + "'><br><br>\n"
	}

	page = fs.readFileSync('affichage_questionnaire.html','UTF-8');
	marqueurs = {};
	marqueurs.modifie = "";
	marqueurs.affichage = affichage;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------

module.exports = trait;
