//=========================================================================
// Serveur Backoffice CultureRace
// Auteur : Achraf SIBAI
// Version : 09/10/2
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_erreur = require("./req_erreur");
var req_start = require("./req_start");
var req_afficher_menu_compte = require("./req_afficher_menu_compte");
var req_choix_pseudo_modifier = require("./req_choix_pseudo_modifier");
var req_afficher_page_modification = require("./req_afficher_page_modification");
var req_modifier_compte = require("./req_modifier_compte");
var req_choix_pseudo_supprimer = require("./req_choix_pseudo_supprimer");
var req_confirmer_suppression = require("./req_confirmer_suppression");
var req_supprimer_compte = require("./req_supprimer_compte");
var req_lister_compte = require("./req_lister_compte");
var req_afficher_menu_questionnaire = require("./req_afficher_menu_questionnaire");
var req_afficher_page_ajout = require("./req_afficher_page_ajout");
var req_afficher_choix_questionnaire = require("./req_afficher_choix_questionnaire");
var req_page_modifier_questionnaire = require("./req_page_modifier_questionnaire");
var req_supprimer_questionnaire = require("./req_supprimer_questionnaire");
var req_afficher_page_ajout = require("./req_afficher_page_ajout");
var req_modifier_questionnaire = require("./req_modifier_questionnaire");
var req_page_nouveau_questionnaire = require("./req_page_nouveau_questionnaire");
var req_ajouter_questionnaire = require("./req_ajouter_questionnaire");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

	var ressource;
	var requete;
	var pathname;;
	var query;
	var marqueur = {};

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
		case '/':
		case '/req_start':
			req_start(req, res, query);
			break;
		case '/req_afficher_menu_compte':
			req_afficher_menu_compte(req, res, query);
			break;
		case '/req_choix_pseudo_modifier':
			req_choix_pseudo_modifier(req, res, query);
			break;
		case '/req_afficher_page_modification':
			req_afficher_page_modification(req, res, query);
			break;
		case '/req_lister_compte':
			req_lister_compte(req, res, query);
			break;
		case '/req_modifier_compte':
			req_modifier_compte(req, res, query);
			break;
		case '/req_choix_pseudo_supprimer':
			req_choix_pseudo_supprimer(req, res, query);
			break;
		case '/req_confirmer_suppression':
			req_confirmer_suppression(req, res, query);
			break;
		case '/req_supprimer_compte':
			req_supprimer_compte(req, res, query);
			break;
		case '/req_afficher_menu_questionnaire':
			req_afficher_menu_questionnaire(req, res, query);
			break;
		case '/req_afficher_page_ajout':
			req_afficher_page_ajout(req, res, query);
			break;
		case '/req_afficher_choix_questionnaire':
			req_afficher_choix_questionnaire(req, res, query);
			break;
		case '/req_page_modifier_questionnaire':
			req_page_modifier_questionnaire(req, res, query);
			break;
		case '/req_supprimer_questionnaire':
			req_supprimer_questionnaire(req, res, query);
			break;
		case '/req_afficher_page_ajout':
			req_afficher_page_ajout(req, res, query);
			break;
		case '/req_modifier_questionnaire':
			req_modifier_questionnaire(req, res, query);
			break;
		case '/req_page_nouveau_questionnaire':
			req_page_nouveau_questionnaire(req, res, query);
			break;
		case '/req_ajouter_questionnaire':
			req_ajouter_questionnaire(req, res, query);
			break;
		}	
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = 3000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
