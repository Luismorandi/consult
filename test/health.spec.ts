import app from "../src/app";
import request from "supertest";

describe("GET /health", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/health").send();
    expect(response.statusCode).toBe(200);
  });
});
