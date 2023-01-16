
/**
 * Parses the content of a Netscape HTTP Cookie Files
 * @param content Cookie File content
 * @returns An array of Cookies[]
 */

export function parseNetscapeCookie<Cookies>(content: string) {

    let cookies: Cookies[] = [];
    let lines = content.split("\n");

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
            expires: expires,
            secure: secure === "TRUE",
        } as Cookies);
    }

    return cookies;
}