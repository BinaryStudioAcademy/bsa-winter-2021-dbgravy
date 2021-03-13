export interface IRegisterUser {
    email: string;
    password: string;
    firstName: string;
    lastName:string;
    organisationName:string;
    currentOrganizationId?: string
}
