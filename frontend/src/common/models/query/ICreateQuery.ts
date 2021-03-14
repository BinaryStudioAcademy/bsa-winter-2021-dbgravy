export interface ICreateQuery {
    name: string;
    code:string;
    appId:string;
    resourceId?:string;
    runAutomatically: boolean;
    showConfirm: boolean;
}
