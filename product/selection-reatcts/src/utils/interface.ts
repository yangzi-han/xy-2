export interface RouterItemType{
    path: string,
    component: Function,
    redirect?: string,
    children?: RouterItemType[]
}

export interface PropType{
    routes: RouterItemType []
}

export interface ActionType{
    type: string,
    payload: any
} 