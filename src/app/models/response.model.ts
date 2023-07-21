export interface BaseResponse<T> {
    message: string;
    statusCode: number;
    succeeded: boolean;
    data: T;
}
