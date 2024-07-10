import "reflect-metadata";
import { Types } from "mongoose";
import { CreateProfileDTO } from "../../../../../src/profile/domain/profile.dto";
import { ProfileValue } from "../../../../../src/profile/domain/profile.value";
import ProfileModel, {
  ProfileDocument,
} from "../../../../../src/profile/infrastructure/repository/mongo/model/profile.schema";
import { MongoRepository } from "../../../../../src/profile/infrastructure/repository/mongo/mongo.repository";
import mockProfileModel from "./__mocks__/profile.schema";

export const mockProfileDocument: Partial<ProfileDocument> = {
  _id: new Types.ObjectId(),
  name: "John",
  last_name: "Doe",
  picture_url: "http://example.com/avatar.png",
  specialist: "Developer",
  born_experience: new Date("1990-01-01"),
  type: "staff",
};

describe("MongoRepository", () => {
  // Instancia de MongoRepository para usar en las pruebas
  let mongoRepository: MongoRepository;

  // Mock de datos para pruebas
  const ProfileDto: CreateProfileDTO = {
    id: "1",
    name: "John",
    last_name: "Doe",
    picture_url: "http://example.com/avatar.png",
    specialist: "Developer",
    born_experience: new Date("1990-01-01"),
    type: "staff",
  };

  const mockProfileValue: ProfileValue = new ProfileValue(ProfileDto);

  // Antes de cada prueba, crea una nueva instancia de MongoRepository
  beforeEach(() => {
    mongoRepository = new MongoRepository();
  });

  // Prueba para el método create
  describe("create", () => {
    it("should create a profile successfully", async () => {
      // Configura el mock para que devuelva lo esperado

      mockProfileModel.create.mockResolvedValue(mockProfileDocument);

      // Llama al método create y verifica el resultado
      const result = await mongoRepository.create(mockProfileValue);

      expect(ProfileModel.create).toHaveBeenCalledWith(mockProfileValue);
      expect(result).toEqual(expect.objectContaining(mockProfileDocument));
    });

    it("should throw an error when create fails", async () => {
      // Configura el mock para que devuelva un error
      mockProfileModel.create.mockRejectedValue(new Error("MongoDB error"));

      // Llama al método create y verifica que lance un error
      await expect(
        mongoRepository.create(mockProfileValue)
      ).rejects.toThrowError("Not possible create profile");
    });
  });

  // Prueba para el método getById
  describe("getById", () => {
    it("should find a profile by ID", async () => {
      // Configura el mock para que devuelva lo esperado

      mockProfileModel.findById.mockResolvedValue(mockProfileDocument);

      // Llama al método getById y verifica el resultado
      const result = await mongoRepository.getById("1");

      expect(ProfileModel.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(expect.objectContaining(mockProfileDocument));
    });

    it("should return null when profile is not found", async () => {
      // Configura el mock para que devuelva null (perfil no encontrado)
      mockProfileModel.findById.mockResolvedValue(null);

      // Llama al método getById y verifica que devuelva null
      const result = await mongoRepository.getById("2");
      expect(result).toBeNull();
    });

    it("should throw an error when getById fails", async () => {
      // Configura el mock para que devuelva un error
      mockProfileModel.findById.mockRejectedValue(new Error("MongoDB error"));

      // Llama al método getById y verifica que lance un error
      await expect(mongoRepository.getById("1")).rejects.toThrowError(
        "Not found profile"
      );
    });
  });
});
