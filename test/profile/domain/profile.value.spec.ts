import request from "supertest";
import app from "../../../src/app";
import { ProfileValue } from "../../../src/profile/domain/profile.value";
import { CreateProfileDTO } from "../../../src/profile/domain/profile.dto";

const BODY: CreateProfileDTO = {
  id: "9365945b-02d0-49d3-8d69-76c86764f64c",
  first_name: "luis",
  last_name: "morandi",
  created_at: new Date("2024-07-08T03:08:50.027Z"),
  updated_at: new Date("2024-07-08T03:08:50.027Z"),
  avatar: "http://cloudfront.com/images/",
  role_id: "staff",
  description: "coach",
  user_id: "USERiD",
};
describe("ProfileValue", () => {
  test("should respond with a 400 without body", async () => {
    const profileValue = new ProfileValue(BODY);

    expect(profileValue.id).toBe(BODY.id);
    expect(profileValue.first_name).toBe(BODY.first_name);
    expect(profileValue.last_name).toBe(BODY.last_name);
    expect(profileValue.avatar).toBe(BODY.avatar);
    expect(profileValue.description).toBe(BODY.description);
    expect(profileValue.created_at).toEqual(BODY.created_at);
    expect(profileValue.updated_at).toBe(BODY.updated_at); // Check that update_at is defined
    expect(profileValue.role_id).toBe(BODY.role_id);
    expect(profileValue.user_id).toBe(BODY.user_id);
  });
  it("should update name and update update_at timestamp", () => {
    const profileValue = new ProfileValue(BODY);
    const newName = "Jane";

    profileValue.setFirstName(newName);

    expect(profileValue.first_name).toBe(newName);
    expect(profileValue.updated_at.getTime()).toBeGreaterThan(
      profileValue.created_at.getTime()
    );
  });

  it("should update picture_url and update update_at timestamp", () => {
    const profileValue = new ProfileValue(BODY);
    const newPictureUrl = "http://example.com/new_avatar.png";

    profileValue.setAvatar(newPictureUrl);

    expect(profileValue.avatar).toBe(newPictureUrl);
    expect(profileValue.updated_at.getTime()).toBeGreaterThan(
      profileValue.created_at.getTime()
    );
  });

  it("should update lastName and update update_at timestamp", () => {
    const profileValue = new ProfileValue(BODY);
    const newLastName = "Doe";

    profileValue.setLastName(newLastName);

    expect(profileValue.last_name).toBe(newLastName);
    expect(profileValue.updated_at.getTime()).toBeGreaterThan(
      profileValue.created_at.getTime()
    );
  });

  it("should update specialist and update update_at timestamp", () => {
    const profileValue = new ProfileValue(BODY);
    const newSpecialist = "TRADER";

    profileValue.setDescription(newSpecialist);

    expect(profileValue.description).toBe(newSpecialist);
    expect(profileValue.updated_at.getTime()).toBeGreaterThan(
      profileValue.created_at.getTime()
    );
  });
});
