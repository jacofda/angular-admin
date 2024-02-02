import { FuseNavigationItem } from '@fuse/components/navigation'

type NavigationItemType = 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer'

export interface MowNavigationItem extends FuseNavigationItem {
    children: MowNavigationItem[]
    order: number | null
    templates: {
        default?: NavigationItemType
        compact?: NavigationItemType
        horizontal?: NavigationItemType
        futuristic?: NavigationItemType
    }
}

export interface Navigation {
    compact: MowNavigationItem[]
    default: MowNavigationItem[]
    futuristic: MowNavigationItem[]
    horizontal: MowNavigationItem[]
}
