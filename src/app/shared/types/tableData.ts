import { MainAction } from './actions/main'
import { MassAction } from './actions/mass_actions'
import { RowAction } from './actions/row'
import { Column } from './column'
import { Filter } from './filter'

export interface TableData {
    filters: Filter[]
    columns: Column[]
    mainAction: MainAction[]
    rowAction: RowAction[]
    rowDropDownActions?: RowAction[]
    massActions?: MassAction[]
}
