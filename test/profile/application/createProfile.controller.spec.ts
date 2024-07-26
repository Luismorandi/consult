import request from "supertest";
import app from "../../../src/app";
import { arrayMaxSize } from "class-validator";

interface ExampleObject {
  first_name?: string;
  last_name?: string;
  created_at?: string;
  updated_at?: string;
  avatar?: string;
  role_id?: string;
  description: string;
  user_id?: string;
}
const BODY: ExampleObject = {
  first_name: "luis",
  last_name: "morandi",
  created_at: "2024-07-08T03:08:50.027Z",
  updated_at: "2024-07-08T03:08:50.027Z",
  avatar: "http://cloudfront.com/images/",
  role_id: "staff",
  description: "coach",
  user_id: "useriD",
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
    delete body.first_name;
    const response = await request(app).post("/profile").send(body);
    expect(response.statusCode).toBe(400);
  });
});
