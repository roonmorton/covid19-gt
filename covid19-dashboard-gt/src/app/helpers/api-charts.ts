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

    public getAccumulatedCasesPerDay(): string{
        return environment.apiUrl + '/covid19dash/monthstats';
    }

    public getAgeCases(): string{
        return environment.apiUrl + '/covid19dash/genderagestats';
    }

    
    public getAccumulatedCases(): string{
        return environment.apiUrl + '/covid19dash/monthstatsacum';
    }
    
    public getCases(): string{
        return environment.apiUrl + '/covid19dash/casesinfo';
    }
    public getDepartament(): string{
        return environment.apiUrl + '/covid19dash/dep';
    }
    public getGender(): string{
        return environment.apiUrl + '/covid19dash/gender';
    }
    public getStatus(): string{
        return environment.apiUrl + '/covid19dash/status';
    }

    public saveCase(): string{
        return environment.apiUrl + '/covid19dash/case';
    }
    
    public getCase(paramId: string): string{
        return environment.apiUrl + `/covid19dash/case/${paramId}`;
    }
}
