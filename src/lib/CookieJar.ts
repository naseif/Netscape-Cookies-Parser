import { existsSync, readFileSync } from "node:fs";
import { Cookies } from "../types/Cookies";


export class CookieJar {
    private _cookies: string

    /**
     * @param String cookies Netscape HTTP Cookie File
     */

    constructor(cookies?: string) {
        this._cookies = cookies;
    }

    /**
     * Loads a cookie file from the provided path
     * @param String path 
     * @returns File Content in UTF8 format
     */

    load(path: string): string {
        if (existsSync(path)) {
            this._cookies = readFileSync(path, "utf8");
            return this._cookies;
        }

        throw new Error("Cookie File path does not exist!");
    }

    /**
     * Parses the content of a Netscape HTTP Cookie Files
     * @returns An array of Cookies[]
     */

    parse(): Cookies[] {

        let cookies: Cookies[] = [];
        let lines = this._cookies.split("\n");

        for (const element of lines) {
            let line = element.trim();

            if (line.startsWith("#") || line === "") {
                continue;
            }

            let parts = line.split("\t");
            let domain = parts[0],
                flag = parts[1],
                path = parts[2],
                secure = parts[3],
                expires = parts[4],
                name = parts[5],
                value = parts[6];

            cookies.push({
                name: name,
                value: value,
                domain: domain,
                path: path,
                flag: flag,
                expires: Number(expires),
                secure: secure === "TRUE",
            });
        }
        return cookies;
    }

    /**
     * Parses the cookie content and returns a string to pass as cookie header
     * @returns string
     */

    toString(): string {
        const cookies = this.parse();
        const cookieStrings = cookies.map(cookie => `${cookie.name}=${cookie.value}`);
        return cookieStrings.join('; ');
    }
}