export const success = (data: any, message = "Success") => {
    return {
        success: true,
        message,
        data,
    };
}

export const failure = (message: string) => {
    return {
        success: false,
        message,
    };
}