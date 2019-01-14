
const express = require('express');
const mysql = require('mysql');
const execSQL = require('exec-sql'); //nécessaire pour la création de la BD et l'import du fichier SQL
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5002;

//parsing responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    socketPath: '/var/run/mysqld/mysqld.sock',
    database: 'nodemysql_test'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected.')
})

// Tout les créneaux
app.get('/api/getAllCreneaux', (req, res) => {
    db.query('SELECT c.id_creneau as id, c.tDeb as start, c.tFin as end, m.id_ue as resourceId, m.nom as title, m.couleur as bgColor from creneau c join matiere m on c.id_mat=m.id_mat;', (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Tout les profs
app.get('/api/getAllProfs', (req, res) => {
    db.query('SELECT id_prof as value, nom as label from prof', (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Toutes les salles
app.get('/api/getAllSalles', (req, res) => {
    db.query('SELECT id_salle as value, label as label from salle', (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Noms Formations (pour Select)
app.get('/api/getFormations', (req, res) => {
    db.query('SELECT nom as value, label, id_form as id FROM formation', (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Tout les groupes (pour l'id du groupe crée)
app.get('/api/getAllGroupes', (req, res) => {
    db.query('SELECT id_grpe FROM groupe', (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Noms Groupes (pour Select)
app.post('/api/getGroupe', (req, res) => {
    var groupe = mysql.format('SELECT num_grpe as label, id_grpe as value FROM groupe WHERE id_promo = ?', [req.body.id_form]);
    db.query(groupe, (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) ) )
    })
})

// Modules pour une même formation
app.post('/api/getModule', (req, res) => {
    var requete = mysql.format('SELECT id_uemod as id, nom as name FROM uemodule where classif="ue" and id_form = ?', [req.body.id_form]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Toutes les matieres
app.get('/api/getAllMatieres', (req, res) => {
    db.query("SELECT id_mat as value, nom as label from matiere", (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Tout les groupes (pour l'id du groupe crée)
app.get('/api/getAllModules', (req, res) => {
    db.query('SELECT * FROM uemodule', (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Tout les créneaux d'un groupe
app.post('/api/getCreneaux', (req, res) => {
    var requete = mysql.format('SELECT c.id_creneau as id, c.tDeb as start, c.tFin as end, m.id_ue as resourceId, m.nom as title, m.couleur as bgColor, m.id_mat, c.id_prof from creneau c join matiere m on c.id_mat=m.id_mat where c.id_grpe = ?', [req.body.id_grpe]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Chercher le nom d'un prof
app.post('/api/getProf', (req, res) => {
    var requete = mysql.format('SELECT genre, nom, prenom from prof where id_prof = ?', [req.body.id_prof]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Chercher des infos sur une matière
app.post('/api/getMatiereInfos', (req, res) => {
    var requete = mysql.format('SELECT themes, typeEns from matiere where id_mat = ?', [req.body.id_mat]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Pour le Select sur les UE
app.get('/api/fillFormUE', (req, res) => {
    db.query('SELECT nom as label, id_uemod as value FROM uemodule where classif="ue"', (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Création de formation
app.post('/api/createFormation', (req, res) => {
    var requete = mysql.format('INSERT into formation VALUES(?, ?, ?)', [req.body.id, req.body.nom, req.body.label]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Création de formation
app.post('/api/createMatiere', (req, res) => {
    var requete = mysql.format('INSERT into matiere VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.id_mat, req.body.id_ue, 1, 1, req.body.nom, req.body.label, 0, req.body.couleur, req.body.themes, req.body.typeEns]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Création de groupe
app.post('/api/createGroupe', (req, res) => {
    var requete = mysql.format('INSERT into groupe VALUES(?, ?, ?, ?)', [req.body.id_grpe, req.body.id_promo, "", req.body.num_grpe]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Création d'un créneau
app.post('/api/createCreneau', (req, res) => {
    var create = mysql.format('INSERT INTO creneau VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [req.body.id_creneau, req.body.tDeb, req.body.tFin, 6, req.body.id_mat, req.body.id_prof, req.body.id_grpe, req.body.id_salle]);
    db.query(create, (err, result, fields) => {
        if (err) throw err;
        res.send( "Successfully created creneau with id " + req.body.id )
    });
})

// Création d'un UE
app.post('/api/createUE', (req, res) => {
    var create = mysql.format('INSERT INTO uemodule VALUES(?, ?, ?, ?, ?)', [req.body.id_uemod, req.body.id_form, "ue", req.body.nom, req.body.label]);
    db.query(create, (err, result, fields) => {
        if (err) throw err;
        res.send( "Successfully created UE with id " + req.body.id_uemod)
    });
})

// Sauvegarde d'un créneau
app.post('/api/saveEvent', (req, res) => {
    var save = mysql.format('UPDATE creneau SET tDeb=?, tFin=? WHERE id_creneau=?', [req.body.tDeb, req.body.tFin, req.body.id]);
    db.query(save, (err, result, fields) => {
        if (err) throw err;
        res.send( "Successfully saved creneau with id " + JSON.stringify(req.body.id) )
    });
})

// Suppression d'un créneau
app.post('/api/deleteEvent', (req, res) => {
    var suppression = mysql.format('DELETE from creneau WHERE id_creneau = ?', [req.body.id]);
    db.query(suppression, (err, result, fields) => {
        if (err) throw err;
        res.send( "Successfully deleted creneau with id " + JSON.stringify(req.body.id) )
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));