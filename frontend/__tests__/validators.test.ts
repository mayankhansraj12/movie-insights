import { describe, it, expect } from "vitest";
import { isValidImdbId } from "../lib/validators";

describe("isValidImdbId", () => {
    it("accepts a valid 7-digit IMDb ID", () => {
        expect(isValidImdbId("tt0133093")).toBe(true);
    });

    it("accepts a valid 8-digit IMDb ID", () => {
        expect(isValidImdbId("tt10872600")).toBe(true);
    });

    it("rejects an ID without the tt prefix", () => {
        expect(isValidImdbId("0133093")).toBe(false);
    });

    it("rejects an ID that is too short (fewer than 7 digits)", () => {
        expect(isValidImdbId("tt012")).toBe(false);
    });

    it("rejects an ID that is too long (more than 8 digits)", () => {
        expect(isValidImdbId("tt012345678")).toBe(false);
    });

    it("rejects a plain string", () => {
        expect(isValidImdbId("hello")).toBe(false);
    });

    it("rejects an empty string", () => {
        expect(isValidImdbId("")).toBe(false);
    });
});
