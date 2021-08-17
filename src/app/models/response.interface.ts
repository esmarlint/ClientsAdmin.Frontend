export interface ApiPaginatedResponse<T> {
    statusCode: number;
    data:       T[];
    page:       number;
    pageSize:   number;
    total:      number;
}

export interface Client {
    id:            number;
    socialReason:  string;
    comercialName: string;
    rnc:           string;
    phone:         string;
    adresses:      number;
}
