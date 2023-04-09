// deno-lint-ignore-file no-explicit-any
import { IRoute } from "./types.ts";

export class MapRoutes {
    private routes: Map<string, IRoute> = new Map();

    public set(route: string, setting: IRoute): Map<string, IRoute> {
        return this.routes.set(route, setting);
    }

    public get(route: string): IRoute | undefined {
        return this.routes.get(route);
    }

    public getRegExp(route: string): IRoute | undefined {
        const regexpBase = "(.*?)";

        let result: IRoute | undefined;

        for (const keyRoute of this.keys()) {
            let [information, uri] = keyRoute.split("@");

            information = information
                                .replace(/\:[a-zA-Z]+/g, `${regexpBase}+`)
                                .replace(/\:[a-zA-Z]+\?/g, `(${regexpBase}+|)`)
                                .replace(/\[/g, `\\[`)
                                .replace(/\]/g, `\\]`)
                                .replace(/\{/g, `\\{`)
                                .replace(/\}/g, `\\}`)
                                .replace(/\//g, `\\/`)
                                .replace(/\./g, `\\.`)
                                .replace(/\:/g, `\\:`);

            uri = uri.replace(/\*/g, "(.*?)+");

            if (uri.match(/\/\:[a-zA-Z]+\?/g)) {
                uri = uri.replace(/\/\:[a-zA-Z]+\?/g, `(\/${regexpBase}+|)`)
            }

            if (uri.match(/\/\:[a-zA-Z]+/g)) {
                uri = uri.replace(/\/\:[a-zA-Z]+/g, `\/${regexpBase}+`)
            }

            if (uri.match(/\:[a-zA-Z]+\?/g)) {
                uri = uri.replace(/\:[a-zA-Z]+\?/g, `(${regexpBase}+|)`)
            }

            if (uri.match(/\:[a-zA-Z]+/g)) {
                uri = uri.replace(/\:[a-zA-Z]+/g, `${regexpBase}+`)
            }

            uri = uri.replace(/\//g, `\\/`);

            const regexp = new RegExp(`${information}@${uri}(\/|)`, "g");

            if (regexp.test(route)) {
                result = this.get(keyRoute);

                if (result) {
                    result.regexp = regexp;
                }
            }
        }

        if (result) {
            const hostname = result.route.split("@")[0].split("-")[2] ?? 'localhost';
            const pathname = result.route.split("@")[1].replace(/\{[0-9\,]+\}/g,"");

            const pattern = new URLPattern({
                hostname,
                pathname
            })

            const params = pattern.exec({
                hostname,
                pathname: route.split("@")[1]
            })?.pathname.groups;


            result.params = params;
        }
        
        return result;
    }

    public has(route: string): boolean {
        return this.routes.has(route);
    }

    public hasRegExp(route: string): boolean {
        return !!this.getRegExp(route);
    }

    public delete(route: string): boolean {
        return this.routes.delete(route);
    }

    public deleteRegExp(route: string): boolean {
        const objectRoute = this.getRegExp(route)
        
        if (objectRoute) this.delete(objectRoute.route);

        return !!objectRoute;
    }

    public clear(): void {
        return this.routes.clear();
    }

    public keys(): IterableIterator<string> {
        return this.routes.keys();
    }

    public values(): IterableIterator<IRoute> {
        return this.routes.values();
    }

    public entries(): IterableIterator<[string, IRoute]> {
        return this.routes.entries();
    }

    public fromArrayKeys(): string[] {
        return Array.from(this.routes.keys());
    }

    public fromArrayValues(): IRoute[] {
        return Array.from(this.routes.values());
    }

    public fromObject() {
        return Object.fromEntries(this.routes);
    }

    public forEach(callback: any) {
        this.routes.forEach(callback)
    }

    public filterKeys(callback: any): string[] {
        return this.fromArrayKeys().filter(callback);
    }

    public filterValues(callback: any): IRoute[] {
        return this.fromArrayValues().filter(callback);
    }

    public mapKeys(callback: any): unknown[] {
        return this.fromArrayKeys().map(callback);
    }

    public mapValues(callback: any): unknown[] {
        return this.fromArrayValues().map(callback);
    }

    public get size(): number {
        return this.routes.size;
    }
}