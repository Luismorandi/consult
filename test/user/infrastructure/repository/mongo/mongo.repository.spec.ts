import "reflect-metadata";
import mongoose, { Types } from "mongoose";
import { CreateProfileDTO } from "../../../../../src/profile/domain/profile.dto";
import { ProfileValue } from "../../../../../src/profile/domain/profile.value";

// Definir mockProfileDocument antes de usarlo
const mockUserDocument: Partial<UserDocument> = {
  id: new Types.ObjectId("6690a84c88065550cbb460f4"),
  email: "John",
  password: "Doe",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Definir mockProfileModel antes de usar jest.mock
const mockUserModel = {
  create: jest.fn().mockResolvedValue(mockUserDocument),
  findById: jest.fn(),
};

// Mockear el módulo ProfileModel
jest.mock(
  "../../../../../src/user/infrastructure/repository/mongo/model/user.schema",
  () => mockUserModel
);

// Importar ProfileModel después de mockearlo
import ProfileModel, {
  ProfileDocument,
} from "../../../../../src/profile/infrastructure/repository/mongo/model/profile.schema";
import UserModel, {
  UserDocument,
} from "../../../../../src/user/infrastructure/repository/mongo/model/user.schema";
import { UserEntity } from "../../../../../src/user/domain/user.entity";
import { UserValue } from "../../../../../src/user/domain/user.value";
import { UserMongoRepository } from "../../../../../src/user/infrastructure/repository/mongo/mongo.repository";
import { CreateUserDTO } from "../../../../../src/user/domain/user.dto";

const toDomain = (profileMongo: UserDocument): UserEntity => {
  return new UserValue({
    // Cambia a ProfileEntity aquí si es necesario
    id: profileMongo.id.toString(),
    email: profileMongo.email,
    password: profileMongo.password,
    created_at: profileMongo.createdAt,
    updated_at: profileMongo.updatedAt,
  });
};

describe("MongoRepository", () => {
  let mongoRepository: UserMongoRepository;

  const UserDTO: CreateUserDTO = {
    id: "1",
    email: "John",
    password: "Doe",
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockUserValue: UserValue = new UserValue(UserDTO);

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
    mongoRepository = new UserMongoRepository();
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a profile successfully", async () => {
      mockUserModel.create.mockResolvedValue(mockUserDocument);

      const result = await mongoRepository.create(mockUserValue);

      expect(UserModel.create).toHaveBeenCalledWith(mockUserValue);
      const toDomainProfile = toDomain(mockUserDocument as UserDocument);
      expect(result).toEqual(expect.objectContaining(toDomainProfile));
    });

    it("should throw an error when create fails", async () => {
      mockUserModel.create.mockRejectedValue(
        new Error("Not possible create user")
      );

      await expect(mongoRepository.create(mockUserValue)).rejects.toThrowError(
        "Not possible create user"
      );
    });
  });

  describe("getById", () => {
    it("should find a profile by ID", async () => {
      mockUserModel.findById.mockResolvedValue(mockUserDocument);

      const result = await mongoRepository.getById("6690a84c88065550cbb460f4");

      expect(UserModel.findById).toHaveBeenCalledWith(
        "6690a84c88065550cbb460f4"
      );
      const toDomainProfile = toDomain(mockUserDocument as UserDocument);
      expect(result).toEqual(expect.objectContaining(toDomainProfile));
    });

    it("should return null when profile is not found", async () => {
      mockUserModel.findById.mockResolvedValue(null);

      const result = await mongoRepository.getById("2");
      expect(result).toBeNull();
    });

    it("should throw an error when getById fails", async () => {
      mockUserModel.findById.mockRejectedValue(new Error("MongoDB error"));

      await expect(mongoRepository.getById("1")).rejects.toThrowError(
        "Not found profile"
      );
    });
  });
});
