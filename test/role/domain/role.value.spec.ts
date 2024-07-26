import { CreateRoleDTO } from "../../../src/role/domain/role.dto";
import { RoleValue } from "../../../src/role/domain/role.value";
import { UserValue } from "../../../src/user/domain/user.value";

const BODY: CreateRoleDTO = {
  id: "9365945b-02d0-49d3-8d69-76c86764f64c",
  type: "luis",
  permissions: ["ALL"],
  created_at: new Date("2024-07-08T03:08:50.027Z"),
  updated_at: new Date("2024-07-08T03:08:50.027Z"),
};
describe("RoleValue", () => {
  test("should respond with a 400 without body", async () => {
    const userValue = new RoleValue(BODY);

    expect(userValue.id).toBe(BODY.id);
    expect(userValue.type).toBe(BODY.type);
    expect(userValue.permissions).toBe(BODY.permissions);
  });
  it("should update permissions ", () => {
    const roleValue = new RoleValue(BODY);
    const newPermissions = ["RATINGS"];

    roleValue.setPermissions(newPermissions);

    expect(roleValue.permissions).toBe(newPermissions);
  });
});
