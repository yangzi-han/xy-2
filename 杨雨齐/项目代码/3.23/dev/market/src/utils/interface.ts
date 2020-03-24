export interface RouterItemTypes {
    path: string,
    component: Function,
    redirect?: string,
    children?: RouterItemTypes[]
}

export interface PropType{
    routes: RouterItemTypes []
}