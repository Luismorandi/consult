import request from "supertest";
import app from "../../../src/app";

interface ExampleObject {
  type?: string;
  permissions?: string[];
  created_at?: Date;
  updated_at?: Date;
}
const BODY: ExampleObject = {
  type: "CANDIDATE",
  permissions: ["ALL"],
  created_at: new Date("2024-07-08T03:08:50.027Z"),
  updated_at: new Date("2024-07-08T03:08:50.027Z"),
};
describe("POST '/' ", () => {
  test("should respond with a 400 without body", async () => {
    const response = await request(app).post("/role").send();
    expect(response.statusCode).toBe(400);
  });
  test("should respond with a 200 with complete body", async () => {
    const body = BODY;
    const response = await request(app).post("/role").send(body);
    expect(response.statusCode).toBe(200);
  });

  test("should respond with a 400 without type", async () => {
    const body = { ...BODY };
    delete body.type;
    const response = await request(app).post("/role").send(body);
    expect(response.statusCode).toBe(400);
  });
});
