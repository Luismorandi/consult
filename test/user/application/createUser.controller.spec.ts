import request from "supertest";
import app from "../../../src/app";

interface ExampleObject {
  email?: string;
  password?: string;
}
const BODY: ExampleObject = {
  email: "joseluis@gmail.com",
  password: "password",
};
describe("POST '/' ", () => {
  test("should respond with a 400 without body", async () => {
    const response = await request(app).post("/user").send();
    expect(response.statusCode).toBe(400);
  });
  test("should respond with a 200 with complete body", async () => {
    const body = BODY;
    const response = await request(app).post("/user").send(body);
    expect(response.statusCode).toBe(200);
  });

  test("should respond with a 400 without email", async () => {
    const body = { ...BODY };
    delete body.email;
    const response = await request(app).post("/user").send(body);
    expect(response.statusCode).toBe(400);
  });
});
