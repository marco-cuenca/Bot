export interface BaseSalesforceApiRecord {
    url_base: string;
    grant_type: number;
    client_id: string,
    client_secret: string,
    username: string,
    password: string,
    user: {
        document_type: string,
        document_number: string,
        password: string,
    },
    user_token: string,
}