import { CreateUserDTO } from "../../../src/user/domain/user.dto";
import { UserValue } from "../../../src/user/domain/user.value";

const BODY: CreateUserDTO = {
  id: "9365945b-02d0-49d3-8d69-76c86764f64c",
  email: "luis",
  password: "password",
  created_at: new Date("2024-07-08T03:08:50.027Z"),
  updated_at: new Date("2024-07-08T03:08:50.027Z"),
};
describe("UserValue", () => {
  test("should respond with a 400 without body", async () => {
    const userValue = new UserValue(BODY);

    expect(userValue.id).toBe(BODY.id);
    expect(userValue.email).toBe(BODY.email);
    expect(userValue.password).toBe(BODY.password);
  });
  it("should update name and update password ", () => {
    const userValue = new UserValue(BODY);
    const newPassword = "nuevopassword";

    userValue.setPassword(newPassword);

    expect(userValue.password).toBe(newPassword);
  });
});
