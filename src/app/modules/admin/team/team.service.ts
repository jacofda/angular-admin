import { Injectable } from '@angular/core'
import { Team, TeamFormData } from './team.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class TeamService extends BaseService<Team, TeamFormData> {
    protected endpoint: string = 'teams'
}
