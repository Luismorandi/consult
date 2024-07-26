import "reflect-metadata";
import mongoose, { Types } from "mongoose";
import { CreateProfileDTO } from "../../../../../src/profile/domain/profile.dto";
import { ProfileValue } from "../../../../../src/profile/domain/profile.value";

// Definir mockProfileDocument antes de usarlo
const mockRoleDocument: Partial<RoleDocument> = {
  id: new Types.ObjectId("6690a84c88065550cbb460f4"),
  type: "CANDIDATE",
  permissions: ["ALL"],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Definir mockProfileModel antes de usar jest.mock
const mockRoleModel = {
  create: jest.fn().mockResolvedValue(mockRoleDocument),
  findById: jest.fn(),
};

// Mockear el módulo ProfileModel
jest.mock(
  "../../../../../src/role/infrastructure/repository/mongo/model/role.schema",
  () => mockRoleModel
);

// Importar RoleModel después de mockearlo
import RoleModel, {
  RoleDocument,
} from "../../../../../src/role/infrastructure/repository/mongo/model/role.schema";
import { RoleEntity } from "../../../../../src/role/domain/role.entity";
import { RoleValue } from "../../../../../src/role/domain/role.value";
import { RoleMongoRepository } from "../../../../../src/role/infrastructure/repository/mongo/mongo.repository";
import { CreateRoleDTO } from "../../../../../src/role/domain/role.dto";

const toDomain = (roleMongo: RoleDocument): RoleEntity => {
  return new RoleValue({
    id: roleMongo.id.toString(),
    type: roleMongo.type,
    permissions: roleMongo.permissions,
    created_at: roleMongo.createdAt,
    updated_at: roleMongo.updatedAt,
  });
};

describe("MongoRepository", () => {
  let mongoRepository: RoleMongoRepository;

  const RoleDTO: CreateRoleDTO = {
    id: "1",
    type: "CANDIDATE",
    permissions: ["RATINGS"],
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockRoleValue: RoleValue = new RoleValue(RoleDTO);

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
    mongoRepository = new RoleMongoRepository();
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a role successfully", async () => {
      mockRoleModel.create.mockResolvedValue(mockRoleDocument);

      const result = await mongoRepository.create(mockRoleValue);

      expect(RoleModel.create).toHaveBeenCalledWith(mockRoleValue);
      const toDomainRole = toDomain(mockRoleDocument as RoleDocument);
      expect(result).toEqual(expect.objectContaining(toDomainRole));
    });

    it("should throw an error when create fails", async () => {
      mockRoleModel.create.mockRejectedValue(
        new Error("Not possible create role")
      );

      await expect(mongoRepository.create(mockRoleValue)).rejects.toThrowError(
        "Not possible create role"
      );
    });
  });

  describe("getById", () => {
    it("should find a role by ID", async () => {
      mockRoleModel.findById.mockResolvedValue(mockRoleDocument);

      const result = await mongoRepository.getById("6690a84c88065550cbb460f4");

      expect(RoleModel.findById).toHaveBeenCalledWith(
        "6690a84c88065550cbb460f4"
      );
      const toDomainRole = toDomain(mockRoleDocument as RoleDocument);
      expect(result).toEqual(expect.objectContaining(toDomainRole));
    });

    it("should return null when role is not found", async () => {
      mockRoleModel.findById.mockResolvedValue(null);

      const result = await mongoRepository.getById("2");
      expect(result).toBeNull();
    });

    it("should throw an error when getById fails", async () => {
      mockRoleModel.findById.mockRejectedValue(new Error("MongoDB error"));

      await expect(mongoRepository.getById("1")).rejects.toThrowError(
        "Not found role"
      );
    });
  });
});
