import { mockProfileDocument } from "../mongo.repository.spec";

export const mockProfileModel = {
  create: jest.fn().mockResolvedValue(mockProfileDocument),
  findById: jest.fn(),
};

export default mockProfileModel;
export const ProfileDocument = mockProfileModel;
