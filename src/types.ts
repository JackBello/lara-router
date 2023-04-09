// deno-lint-ignore-file no-explicit-any
export interface IRoute {
    name?: string
    method: string | string[]
    handler?: THandler
    response?: any | any[]
    uri?: string
    subdomain?: string
    hostname?: string
    proxy?: boolean
    redirect?: boolean
    match?: Record<string, string | RegExp>
    controller?: TController
    middleware?: TMiddleware
    port?: number
    route: string
    params?: Record<string, string>,
    regexp?: RegExp
}

interface IController {
    init(): void
}

interface IMiddleware {
    handler(): THandlerMiddleware
}

type TClassMiddleware = new (...args: any[]) => IMiddleware;
type TClassController = new (...args: any[]) => IController;

type TResponse = Response | Promise<Response> | any

type TNextMiddleware = (param?: any) => any

type THandlerMiddleware = (context: any, next: TNextMiddleware, ...params: any[]) => TResponse

type TMiddleware = string | string[] | THandlerMiddleware | THandlerMiddleware[] | TClassMiddleware | TClassMiddleware[]

type THandler = (context: any, ...params: any[]) => TResponse

type TController = string | [TClassController, string]

type TActionRoute = THandler | TController;

export interface ISettingRoute extends IRoute {
    wildcard: string | string[]
}

export type TRouteMethod = (settings: ISettingRoute, routes: Map<string, IRoute>) => void