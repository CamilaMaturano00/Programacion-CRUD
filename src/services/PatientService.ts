import { getCustomRepository } from "typeorm";
import { PatientsRepository } from "../repositories/PatientRepository";
import { Patient } from "../entities/Patient";

interface IPantient {
    idPatient?: string;
    patientname: string;
    datebirth: string;
    weigth: string;
    heigth: string;
    specie: string;
  }
class PatientService {
      async create({ patientname, datebirth,weigth, heigth, specie }: IPantient) {
        if (!patientname || !datebirth || !weigth || !heigth || !specie) {
          throw new Error("Por favor rellenar todos los campos");
        }
    
        const patientRepository = getCustomRepository(PatientsRepository);
    
        const patientrnameAlreadyExists = await patientRepository.findOne({ patientname });
    
        if (patientrnameAlreadyExists) {
          throw new Error("El nombre de usuario ya esta registrado");
        }
        const patient = patientRepository.create({ patientname, datebirth, weigth, heigth, specie });
        const nuevopaciente = await patientRepository.save(patient);
        console.log(nuevopaciente);
        return patient;
      }
      async delete(idPatient: string) {
        const patientRepository = getCustomRepository(PatientsRepository);
    
        const patient = await patientRepository
          .createQueryBuilder()
          .delete()
          .from(Patient)
          .where("id = :id", { idPatient })
          .execute();
    
        return patient;

      }
      async getData(idPatient: string) {
        const patientRepository = getCustomRepository(PatientsRepository);
    
        const patient = await patientRepository.findOne(idPatient);
    
        return patient;
      }
      async list() {
        const patientRepository = getCustomRepository(PatientsRepository);
    
        const patient = await patientRepository.find();
    
        return patient;
      }
      async search(search: string) {
        if (!search) {
          throw new Error("Por favor complete el campo de búsquedad");
        }
    
        const patientRepository = getCustomRepository(PatientsRepository);
    
        const patient = await patientRepository
          .createQueryBuilder()
          .where("pantientname like :search", { search: `%${search}%` })
          .orWhere("datebirth like :search", { search: `%${search}%` })
          .orWhere("weight like :search", { search: `%${search}%` })
          .orWhere("height like :search", { search: `%${search}%` })
          .orWhere("species like :search", { search: `%${search}%` })
          .getMany();
    
        return patient;
    
      }
      async update({ idPatient, patientname, datebirth ,weigth, heigth, specie }: IPantient) {
        const pantientRepository = getCustomRepository(PatientsRepository);
    
        const patient = await pantientRepository
          .createQueryBuilder()
          .update(Patient)
          .set({ patientname, datebirth ,weigth, heigth, specie })
          .where("id = :id", { idPatient })
          .execute();
    
        return patient;
    
      }

}

export {PatientService};