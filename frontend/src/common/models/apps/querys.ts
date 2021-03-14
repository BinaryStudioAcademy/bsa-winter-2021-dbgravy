export interface IQuery {
    id: string,
    name: string,
    code?:string,
    appId:string,
    resourceId:string,
    runAutomatically?:boolean,
    showConfirm?:boolean;
}
