'user strict';
var sql = require('./db.js');

var Municipios = function(Municipios) {
    this.nombre_departamento = Municipios.nombre_departamento;
    this.total = Municipios.total;
    this.total_departamento = Municipios.total_departamento;
};

var ParseInsert=function(InsertCase){
    this.names = InsertCase.names;
    this.lastname = InsertCase.lastname;
    this.age = InsertCase.age;
    this.gender = InsertCase.gender;
    this.status = InsertCase.status;
    this.state = InsertCase.state;
    this.address = InsertCase.address;
    this.description = InsertCase.description;
    this.contagionDate=new Date(InsertCase.contagionDate);
    this.recoveryDate= new Date(InsertCase.recoveryDate);
};

Municipios.getStatsMuni = function(result) {
    sql.query("SELECT IFNULL(TD.nombre_departamento,'Total') as department_name, (SELECT count(id_departamento) FROM esdavil1_covid19.tbl_casos TCD) as total,count(TC.id_caso) as total_departaments FROM esdavil1_covid19.tbl_departamentos TD INNER JOIN esdavil1_covid19.tbl_casos TC ON TC.id_departamento=TD.id_departamento GROUP BY TD.nombre_departamento", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

Municipios.getStatsPacients = function(result) {
    sql.query("SELECT(SELECT count(id_departamento) FROM esdavil1_covid19.tbl_casos TCD) as totalcases, count(case when TC.id_estado=2 then 1 else null end) as deceased, count(case when TC.id_estado=4 then 1 else null end) as recovered FROM esdavil1_covid19.tbl_casos TC", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

Municipios.getStatsGender = function(result) {
    sql.query("SELECT TG.nombre_genero as gender, COUNT(TG.id_genero)as count FROM esdavil1_covid19.tbl_casos TC INNER JOIN esdavil1_covid19.tbl_personas TP ON TP.id_persona=TC.id_persona INNER JOIN esdavil1_covid19.tbl_generos TG ON TP.id_genero=TG.id_genero GROUP BY TG.nombre_genero", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('respuesta : ', res);
            result(null, res);
        }
    });
};


Municipios.getStatsByMonth = function(result) {
    sql.query("select DATE_FORMAT(tab.fecha,'%d') as days,count(tab.id_caso) as casesofday from(select a.Date fecha,TC.id_caso from ( select date(last_day(CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE)) - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY) as Date from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c) a left JOIN esdavil1_covid19.tbl_casos TC ON date(TC.fecha_contagio)=a.Date WHERE a.Date between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE) and last_day(CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE)) order by a.Date ) tab group by fecha", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('respuesta : ', res);
            result(null, res);
        }
    });
};

Municipios.getByGenderAge = function(result) {
    sql.query("SELECT count(case when TP.edad>0 and TP.edad<11 then 1 else null end) as \'0-10\', count(case when TP.edad>10 and TP.edad<21 then 1 else null end) as \'11-20\', count(case when TP.edad>20 and TP.edad<31 then 1 else null end) as \'21-30\', count(case when TP.edad>30 and TP.edad<41 then 1 else null end) as \'31-40\', count(case when TP.edad>40 and TP.edad<51 then 1 else null end) as \'41-50\', count(case when TP.edad>50 and TP.edad<61 then 1 else null end) as \'51-60\', count(case when TP.edad>60 and TP.edad<71 then 1 else null end) as \'61-70\', count(case when TP.edad>70 and TP.edad<81 then 1 else null end) as \'71-80\', count(case when TP.edad>80 and TP.edad<91 then 1 else null end) as \'81-90\', count(case when TP.edad>90 then 1 else null end) as \'mas de 90\' FROM esdavil1_covid19.tbl_personas TP INNER JOIN esdavil1_covid19.tbl_generos TG ON TP.id_genero=TG.id_genero GROUP BY TG.nombre_genero ORDER BY TG.nombre_genero desc", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('respuesta : ', res);
            result(null, res);
        }
    });
};


Municipios.getByAcumCases = function(result) {
    sql.query("select DATE_FORMAT(tab.fecha,'%d') as dia,(select count(TCT.id_caso) from esdavil1_covid19.tbl_casos TCT where date(TCT.fecha_contagio)<=tab.fecha) as num_casos_acum from(select a.Date fecha,TC.id_caso from ( select date(last_day(CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE)) - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY) as Date from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c) a left JOIN esdavil1_covid19.tbl_casos TC ON date(TC.fecha_contagio)=a.Date WHERE a.Date between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE) and last_day(CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE)) order by a.Date ) tab group by fecha", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('respuesta : ', res);
            result(null, res);
        }
    });
};

Municipios.getCasesInfo = function(result) {
    sql.query("SELECT TC.id_caso as id_case,TEP.id_estado,TP.id_persona as id_person,TD.id_departamento as id_department,CONCAT(TP.nombres,\" \",TP.apellidos) AS name, TG.nombre_genero as gender, TP.edad as age,TEP.nombre_estado as status,TD.nombre_departamento as department_name, TC.fecha_contagio,ifnull(TC.fecha_recuperacion,'NO DISPONIBLE')as recovery_date FROM esdavil1_covid19.tbl_casos TC INNER JOIN esdavil1_covid19.tbl_personas TP ON TP.id_persona=TC.id_persona INNER JOIN esdavil1_covid19.tbl_departamentos TD ON TD.id_departamento=TC.id_departamento INNER JOIN esdavil1_covid19.tbl_generos TG ON TG.id_genero=TP.id_genero INNER JOIN esdavil1_covid19.tbl_estados_pacientes TEP ON TEP.id_estado=TC.id_estado", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('respuesta : ', res);
            result(null, res);
        }
    });
};


Municipios.getAllDepartaments = function(result) {
    sql.query("select id_departamento as id, nombre_departamento as department_name from tbl_departamentos", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('respuesta : ', res);
            result(null, res);
        }
    });
};

Municipios.getAllStatus = function(result) {
    sql.query("select id_estado as id,nombre_estado as status from tbl_estados_pacientes", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('respuesta : ', res);
            result(null, res);
        }
    });
};

Municipios.getAllGenders = function(result) {
    sql.query("select id_genero as id , nombre_genero gender from tbl_generos", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('respuesta : ', res);
            result(null, res);
        }
    });
};

Municipios.getAllPeople = function(result) {
    sql.query("SELECT nombres as name, apellidos as lastname,edad as age, id_genero as id_gender FROM esdavil1_covid19.tbl_personas", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('respuesta : ', res);
            result(null, res);
        }
    });
};


Municipios.createCase = function(newCase, result) {
    let ok= new ParseInsert(newCase);
    sql.query("insert into tbl_personas(nombres,apellidos,edad,id_genero) values(?,?,?,?)", [ok.names, ok.lastname, ok.age, ok.gender], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            sql.query("insert into tbl_casos(id_persona,id_estado,id_departamento,direccion_caso,descripcion_caso,fecha_contagio,fecha_recuperacion) values(?,?,?,?,?,?,?)", [res.insertId, ok.status, ok.state, ok.address,ok.description,ok.contagionDate,ok.recoveryDate], function(err, res) {
                if (err) {
                    console.log("error: ", err);
                    result({ status: "403", message: "No se pudo ingresar el nuevo caso" }, null);
                } else {
                    result(null, { status: "200", message: "OK" });
                }
            });
        }
    });
};
module.exports = Municipios;