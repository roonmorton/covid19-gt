'use strict';
module.exports = function (app) {
    var stats = require('../controller/EstadisticasController')

    app.route('/covid19dash/munistats')
        .get(stats.get_stats_munis);

    app.route('/covid19dash/pacientstats')
        .get(stats.get_stats_pacients);

    app.route('/covid19dash/genderstats')
        .get(stats.get_stats_gender);

    app.route('/covid19dash/monthstats')
        .get(stats.get_stats_month);

    app.route('/covid19dash/genderagestats')
        .get(stats.get_stats_gage);

    app.route('/covid19dash/monthstatsacum')
        .get(stats.get_stats_acum);

    app.route('/covid19dash/casesinfo')
        .get(stats.get_cases_info);

    app.route('/covid19dash/dep')
        .get(stats.get_dep_info);

    app.route('/covid19dash/gender')
        .get(stats.get_gender_info);

    app.route('/covid19dash/people')
        .get(stats.get_people_info);

    app.route('/covid19dash/status')
        .get(stats.get_status_info);

    app.route('/covid19dash/case/:caseId')
        .get(stats.read_a_case);

    app.route('/covid19dash/case')
        .post(stats.create_new_case)
        .put(stats.update_a_case);
    
};
