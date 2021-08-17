export interface ApiResponse {
    statusCode: number;
    data:       Client[];
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
