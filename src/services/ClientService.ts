import { getCustomRepository } from "typeorm";
import { ClientsRepository } from "../repositories/ClientRepository";
import { Client } from "../entities/Client";

interface IClient {
    idClient?: string;
    clientname: string;
    dni: string;
    email: string;
    phone: string;
    city: string;
    state: string;
  }
class ClientService {
      async create({ clientname, dni, email, phone, city, state }: IClient) {
        if (!clientname || !dni || !email || !phone || !city || !state) {
          throw new Error("Por favor rellenar todos los campos");
        }
    
        const clientsRepository = getCustomRepository(ClientsRepository);
    
        const clientnameAlreadyExists = await clientsRepository.findOne({ clientname });
    
        if (clientnameAlreadyExists) {
          throw new Error("El nombre de usuario ya esta registrado");
        }
    
        const emailAlreadyExists = await clientsRepository.findOne({ email });
    
        if (emailAlreadyExists) {
          throw new Error("El correo electrónico ya esta registrado");
        }
    
        const client = clientsRepository.create({ clientname, dni, email, phone, city, state });
    
        await clientsRepository.save (client);
    
        return client;
      }
      async delete(id: string) {
        const clientsRepository = getCustomRepository(ClientsRepository);
    
        const client = await clientsRepository
          .createQueryBuilder()
          .delete()
          .from(Client)
          .where("id = :id", { id })
          .execute();
    
        return client;
      }
      async getData(id: string) {
        const clientsRepository = getCustomRepository(ClientsRepository);
    
        const client = await clientsRepository.findOne(id);
    
        return client;
      }
      async list() {
        const clientsRepository = getCustomRepository(ClientsRepository);
    
        const client = await clientsRepository.find();
    
        return client;
      }
      async search(search: string) {
        if (!search) {
          throw new Error("Por favor complete el campo de búsquedad");
        }
    
        const clientsRepository = getCustomRepository(ClientsRepository);
    
        const client = await clientsRepository
          .createQueryBuilder()
          .where("username like :search", { search: `%${search}%` })
          .orWhere("dni like :search", { search: `%${search}%` })
          .orWhere("email like :search", { search: `%${search}%` })
          .orWhere("phone like :search", { search: `%${search}%` })
          .orWhere("city like :search", { search: `%${search}%` })
          .orWhere("state like :search", { search: `%${search}%` })
          .getMany();
    
        return client;
    
      }
      async update({ idClient, clientname, dni,  email, phone, city, state }: IClient) {
        const clientsRepository = getCustomRepository(ClientsRepository);
    
        const client = await clientsRepository
          .createQueryBuilder()
          .update(Client)
          .set({ idClient, clientname, dni, email, phone, city, state })
          .where("idClient = :idClient", { idClient })
          .execute();
    
        return client;
    
      }

}

export {ClientService};