import request from "supertest";
import app from "../../../src/app";

interface ExampleObject {
  name?: string;
  last_name?: string;
  born_experience?: string;
  picture_url?: string;
  type?: string;
  specialist: string;
}
const BODY: ExampleObject = {
  name: "luis",
  last_name: "morandi",
  born_experience: "2024-07-08T03:08:50.027Z",
  picture_url: "http://cloudfront.com/images/",
  type: "staff",
  specialist: "coach",
};
describe("POST '/' ", () => {
  test("should respond with a 400 without body", async () => {
    const response = await request(app).post("/profile").send();
    expect(response.statusCode).toBe(400);
  });
  test("should respond with a 200 with complete body", async () => {
    const body = BODY;
    const response = await request(app).post("/profile").send(body);
    expect(response.statusCode).toBe(200);
  });

  test("should respond with a 400 without name", async () => {
    const body = { ...BODY };
    delete body.name;
    const response = await request(app).post("/profile").send(body);
    expect(response.statusCode).toBe(400);
  });
});
