import request from "supertest";
import app from "../../../src/app";
import { ProfileValue } from "../../../src/profile/domain/profile.value";
import { CreateProfileDTO } from "../../../src/profile/domain/profile.dto";

const BODY: CreateProfileDTO = {
  id: "9365945b-02d0-49d3-8d69-76c86764f64c",
  name: "luis",
  last_name: "morandi",
  born_experience: new Date("2024-07-08T03:08:50.027Z"),
  picture_url: "http://cloudfront.com/images/",
  type: "staff",
  specialist: "coach",
};
describe("ProfileValue", () => {
  test("should respond with a 400 without body", async () => {
    const profileValue = new ProfileValue(BODY);

    expect(profileValue.id).toBe(BODY.id);
    expect(profileValue.name).toBe(BODY.name);
    expect(profileValue.last_name).toBe(BODY.last_name);
    expect(profileValue.picture_url).toBe(BODY.picture_url);
    expect(profileValue.specialist).toBe(BODY.specialist);
    expect(profileValue.born_experience).toEqual(BODY.born_experience);
    expect(profileValue.update_at).toBeDefined(); // Check that update_at is defined
    expect(profileValue.type).toBe(BODY.type);
  });
  it("should update name and update update_at timestamp", () => {
    const profileValue = new ProfileValue(BODY);
    const newName = "Jane";

    profileValue.setName(newName);

    expect(profileValue.name).toBe(newName);
    expect(profileValue.update_at.getTime()).toBeGreaterThan(
      profileValue.born_experience.getTime()
    );
  });

  it("should update picture_url and update update_at timestamp", () => {
    const profileValue = new ProfileValue(BODY);
    const newPictureUrl = "http://example.com/new_avatar.png";

    profileValue.setPictureUrl(newPictureUrl);

    expect(profileValue.picture_url).toBe(newPictureUrl);
    expect(profileValue.update_at.getTime()).toBeGreaterThan(
      profileValue.born_experience.getTime()
    );
  });

  it("should update lastName and update update_at timestamp", () => {
    const profileValue = new ProfileValue(BODY);
    const newLastName = "Doe";

    profileValue.setLastName(newLastName);

    expect(profileValue.last_name).toBe(newLastName);
    expect(profileValue.update_at.getTime()).toBeGreaterThan(
      profileValue.born_experience.getTime()
    );
  });

  it("should update specialist and update update_at timestamp", () => {
    const profileValue = new ProfileValue(BODY);
    const newSpecialist = "TRADER";

    profileValue.setSpecialist(newSpecialist);

    expect(profileValue.specialist).toBe(newSpecialist);
    expect(profileValue.update_at.getTime()).toBeGreaterThan(
      profileValue.born_experience.getTime()
    );
  });

  it("should update born_experience and update update_at timestamp", () => {
    const profileValue = new ProfileValue(BODY);
    const newBornExperience = new Date("2024-02-08T03:08:50.027Z");

    profileValue.setBornExprience(newBornExperience);

    expect(profileValue.born_experience).toBe(newBornExperience);
    expect(profileValue.update_at.getTime()).toBeGreaterThan(
      profileValue.born_experience.getTime()
    );
  });
});
