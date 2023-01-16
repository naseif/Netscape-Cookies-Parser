/**
 * Represents a Cookie object
 */

export interface Cookies {
    /**
     * Name of the cookie
     */
    name: string;
    /**
     * Value of the cookie
     */
    value: string;
    /**
     * The Domain that this cookie belongs to
     */
    domain: string;
    /**
     * The domain path
     */
    path: string;
    /**
     * Whether this cookie has flags, returns mostly "FALSE"
     */
    flag: string;
    /**
     * Expiration date of this cookie
     */
    expires: number;
    /**
     * Whether this cookie is secure
     */
    secure: boolean;
}
