'use strict';
var Muni = require('../model/municipiosModel');

exports.get_stats_munis = function (req, res) {
    Muni.getStatsMuni(function (err, departament) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', departament);
        res.send(departament);
    });
};
exports.get_stats_pacients = function (req, res) {
    Muni.getStatsPacients(function (err, departament) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', departament);
        res.send(departament[0]);
    });
};

exports.get_stats_gender = function (req, res) {
    Muni.getStatsGender(function (err, departament) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', departament);
        res.send(departament);
    });
};

exports.get_stats_month = function (req, res) {
    Muni.getStatsByMonth(function (err, statsmonth) {
        console.log('controller')
        if (err)
            res.send(err);
        // let jsonParse = [];
        // for (let index = 0; index < statsmonth.length; index++) {
        //     jsonParse.push([statsmonth[index].days, statsmonth[index].casesofday])
        // }
        res.send(statsmonth);
    });
};

exports.get_stats_gage = function (req, res) {
    Muni.getByGenderAge(function (err, statsmonth) {
        console.log('controller')
        if (err)
            res.send(err);
        let jsonParse = {};
        let jsonResponse = [];
        for (let index = 0; index < statsmonth.length; index++) {
            for (var key in statsmonth[index]) {
                var attrName = key;
                var attrValue = statsmonth[index][attrName];
                if (jsonParse.hasOwnProperty(key)) {
                    jsonParse[key].push(attrValue);
                } else {
                    jsonParse[key] = [key, attrValue];
                }
            }
        }
        for (var key in jsonParse) {
            var attrName = key;
            var attrValue = jsonParse[attrName];
            jsonResponse.push(attrValue);
        }
        console.log(jsonResponse);
        res.send(jsonResponse);

    });
};

exports.get_stats_acum = function (req, res) {
    Muni.getByAcumCases(function (err, statsmonth) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log(statsmonth);
        res.send(statsmonth);

    });
};

exports.get_cases_info = function (req, res) {
    Muni.getCasesInfo(function (err, statsmonth) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log(statsmonth);
        res.send(statsmonth);

    });
};
exports.get_dep_info = function (req, res) {
    Muni.getAllDepartaments(function (err, statsmonth) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log(statsmonth);
        res.send(statsmonth);

    });
};
exports.get_gender_info = function (req, res) {
    Muni.getAllGenders(function (err, statsmonth) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log(statsmonth);
        res.send(statsmonth);
    });
};

exports.get_status_info = function (req, res) {
    Muni.getAllStatus(function (err, statsmonth) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log(statsmonth);
        res.send(statsmonth);
    });
};

exports.get_people_info = function (req, res) {
    Muni.getAllPeople(function (err, statsmonth) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log(statsmonth);
        res.send(statsmonth);
    });
};

exports.create_new_case = function (req, res) {
    var cases = req.body;
    console.log('Insert');
    console.log(cases);
    console.log(!cases.names,
        !cases.lastname,
        !cases.age,
        !cases.gender,
        !cases.status,
        !cases.state,
        !cases.address,
        !cases.description,
        !cases.contagionDate,
        !cases.recoveryDate);
    // if (!cases.names ||
    //     !cases.lastname ||
    //     !cases.age ||
    //     !cases.gender ||
    //     !cases.status ||
    //     !cases.state ||
    //     !cases.address ||
    //     !cases.description ||
    //     !cases.contagionDate ||
    //     !cases.recoveryDate) {
    //     res.status(400).send({ error: true, message: 'Parametros Invalidos :3' });
    // } else {
        Muni.createCase(cases, function (err, user) {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    //}
};

exports.read_a_case = function (req, res) {
    console.log(req.params);
    Muni.getCaseById(req.params.caseId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_case = function (req, res) {
    var cases = req.body;
    console.log('Update');
    console.log(cases);
    console.log(!cases.names,
        !cases.lastname,
        !cases.age,
        !cases.gender,
        !cases.status,
        !cases.state,
        !cases.address,
        !cases.description,
        !cases.contagionDate,
        !cases.recoveryDate,
        !cases.idPerson,
        !cases.idCase);
        Muni.updateCase(cases, function (err, user) {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    
};