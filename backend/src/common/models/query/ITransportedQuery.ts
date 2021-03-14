export interface ITransportedQuery {
    id: string;
    name: string;
    code:string;
    appId:string;
    resourceId?:string;
    runAutomatically?:boolean;
    showConfirm?:boolean;
}
