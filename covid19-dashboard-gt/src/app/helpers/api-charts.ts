import { environment } from '../../environments/environment';


export class ApiCharts{
    public getDataGeo(): string{
        return environment.apiUrl + '/covid19dash/munistats';
    }
    public getReportCases(): string{
        return environment.apiUrl + '/covid19dash/pacientstats';
    }

    public getCasesByGender(): string{
        return environment.apiUrl + '/covid19dash/genderstats';
    }

    public getAccumulatedCases(): string{
        return environment.apiUrl + '/covid19dash/monthstats';
    }

    public getAgeCases(): string{
        return environment.apiUrl + '/covid19dash/genderagestats';
    }
    
}