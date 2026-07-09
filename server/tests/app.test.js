import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../src/app.js";

describe("Application", () => {

    it("should return API information", async () => {

        const response = await request(app).get("/");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            name: "TalentForge API",
            version: "v1",
            status: "running",
        });

    });

});