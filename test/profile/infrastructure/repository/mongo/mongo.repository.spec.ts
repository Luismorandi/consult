import "reflect-metadata";
import mongoose, { Types } from "mongoose";
import { CreateProfileDTO } from "../../../../../src/profile/domain/profile.dto";
import { ProfileValue } from "../../../../../src/profile/domain/profile.value";

// Definir mockProfileDocument antes de usarlo
const mockProfileDocument: Partial<ProfileDocument> = {
  id: new Types.ObjectId("6690a84c88065550cbb460f4"),
  first_name: "John",
  last_name: "Doe",
  avatar: "http://example.com/avatar.png",
  description: "Developer",
  created_at: new Date("1990-01-01"),
  role_id: "staff",
  updated_at: new Date("1990-01-01"),
  user_id: "userId",
};

// Definir mockProfileModel antes de usar jest.mock
const mockProfileModel = {
  create: jest.fn().mockResolvedValue(mockProfileDocument),
  findById: jest.fn(),
};

// Mockear el módulo ProfileModel
jest.mock(
  "../../../../../src/profile/infrastructure/repository/mongo/model/profile.schema",
  () => mockProfileModel
);

// Importar ProfileModel después de mockearlo
import ProfileModel, {
  ProfileDocument,
} from "../../../../../src/profile/infrastructure/repository/mongo/model/profile.schema";
import { ProfileMongoRepository } from "../../../../../src/profile/infrastructure/repository/mongo/mongo.repository";
import { ProfileEntity } from "../../../../../src/profile/domain/profile.entity";

const toDomain = (profileMongo: ProfileDocument): ProfileEntity => {
  return new ProfileValue({
    // Cambia a ProfileEntity aquí si es necesario
    id: profileMongo.id.toString(),
    first_name: profileMongo.first_name,
    created_at: profileMongo.created_at,
    updated_at: profileMongo.updated_at,
    last_name: profileMongo.last_name,
    description: profileMongo.description,
    avatar: profileMongo.avatar,
    role_id: profileMongo.role_id,
    user_id: profileMongo.user_id,
  });
};

describe("MongoRepository", () => {
  let mongoRepository: ProfileMongoRepository;

  const ProfileDto: CreateProfileDTO = {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    avatar: "http://example.com/avatar.png",
    description: "Developer",
    created_at: new Date("1990-01-01"),
    updated_at: new Date("1990-01-01"),
    role_id: "staff",
    user_id: "userIOds",
  };

  const mockProfileValue: ProfileValue = new ProfileValue(ProfileDto);

  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://invitation:WByWn2ILAfTHgdL4@test-coderhouse.ovwadqn.mongodb.net/test",
      {}
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    mongoRepository = new ProfileMongoRepository();
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a profile successfully", async () => {
      mockProfileModel.create.mockResolvedValue(mockProfileDocument);

      const result = await mongoRepository.create(mockProfileValue);

      expect(ProfileModel.create).toHaveBeenCalledWith(mockProfileValue);
      const toDomainProfile = toDomain(mockProfileDocument as ProfileDocument);
      toDomainProfile.updated_at = result.updated_at;
      expect(result).toEqual(expect.objectContaining(toDomainProfile));
    });

    it("should throw an error when create fails", async () => {
      mockProfileModel.create.mockRejectedValue(
        new Error("Not possible create profile")
      );

      await expect(
        mongoRepository.create(mockProfileValue)
      ).rejects.toThrowError("Not possible create profile");
    });
  });

  describe("getById", () => {
    it("should find a profile by ID", async () => {
      mockProfileModel.findById.mockResolvedValue(mockProfileDocument);

      const result = await mongoRepository.getById("6690a84c88065550cbb460f4");

      expect(ProfileModel.findById).toHaveBeenCalledWith(
        "6690a84c88065550cbb460f4"
      );
      const toDomainProfile = toDomain(mockProfileDocument as ProfileDocument);
      if (result) toDomainProfile.updated_at = result?.updated_at;
      expect(result).toEqual(expect.objectContaining(toDomainProfile));
    });

    it("should return null when profile is not found", async () => {
      mockProfileModel.findById.mockResolvedValue(null);

      const result = await mongoRepository.getById("2");
      expect(result).toBeNull();
    });

    it("should throw an error when getById fails", async () => {
      mockProfileModel.findById.mockRejectedValue(new Error("MongoDB error"));

      await expect(mongoRepository.getById("1")).rejects.toThrowError(
        "Not found profile"
      );
    });
  });
});
