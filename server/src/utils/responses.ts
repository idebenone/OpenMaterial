const RESPONSE = {
    OK: (message?: string | string[] | any, data?: any | any[]) => {
        return {
            ERROR: false,
            STATUS: 200,
            MESSAGE: message ? message : "OK",
            DATA: data ? data : [],
        };
    },
    CREATED: (message?: string | string[], data?: any | any[]) => {
        return {
            ERROR: false,
            STATUS: 201,
            MESSAGE: message ? message : "CREATED",
            DATA: data ? data : [],
        };
    },
    NO_CONTENT: (message?: string | string[]) => {
        return {
            ERROR: false,
            STATUS: 204,
            MESSAGE: message ? message : "NO CONTENT",
        };
    },
    UN_AUTHORIZED: (message?: string | string[]) => {
        return {
            ERROR: true,
            STATUS: 401,
            MESSAGE: message ? message : "UN AUTHORIZED",
        };
    },
    NOT_FOUND: (message?: string | string[]) => {
        return {
            ERROR: true,
            STATUS: 404,
            MESSAGE: message ? message : "NOT FOUND",
        };
    },
    CONFLICT: (message?: string | string[]) => {
        return {
            ERROR: true,
            STATUS: 409,
            MESSAGE: message ? message : "ALREADY IN USE",
        };
    },
    UNPROCESSABLE_ENTITY: (message?: string | string[]) => {
        return {
            ERROR: true,
            STATUS: 422,
            MESSAGE: message ? message : "UNPROCESSABLE ENTITY",
        };
    },
    INTERNAL_SERVER_ERROR: (message?: string | string[]) => {
        return {
            ERROR: true,
            STATUS: 500,
            MESSAGE: message ? message : "INTERNAL SERVER ERROR",
        };
    },
    NOT_SUPPORTED: (message?: string | string[]) => {
        return {
            ERROR: true,
            STATUS: 501,
            MESSAGE: message ? message : "NOT IMPLEMENTED",
        };
    },
};

export default RESPONSE;