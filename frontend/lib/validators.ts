/**
 * IMDb ID validator
 * Valid format: "tt" followed by exactly 7 or 8 digits
 * Examples: tt0133093, tt10872600
 */
export function isValidImdbId(id: string): boolean {
    return /^tt\d{7,8}$/.test(id);
}
