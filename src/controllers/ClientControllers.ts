import { Request, Response } from "express";
import {ClientService} from "../services/ClientService";

class ClientControllers{

  async handleCreateClient(request: Request, response: Response) {
      const { clientname,dni, email, phone, city, state } = request.body;
      const createClientService = new ClientService();
  
      try {
        await createClientService.create({
          clientname,
          dni,
          email,
          phone,
          city,
          state
        }).then(() => {
          response.render("Product/message", {
            message: "Usuario registrado exitosamente"
          });
        });
      } catch (err) {
        response.render("Product/message", {
          message: `Error al registrar usuario: ${err.message}`
        });
      }
  }
  async handleDeleteClient(request: Request, response: Response) {
    const { idClient } = request.body;

    const deleteClientService = new ClientService();

    try {
        await deleteClientService.delete(idClient).then(() => {
        response.render("Empleados/message", {
          message: "Usuario eliminado correctamente"
        });
      });
    } catch (err) {
      response.render("Empleados/message", {
        message: `Error al eliminar usuario: ${err.message}`
      });
    }
  } 
  async handleGetClient(request: Request, response: Response) {
    let { idClient } = request.query;
    idClient = idClient.toString();

    const getClientDataService = new ClientService();            
    const client = await getClientDataService.getData(idClient);

    return response.render("Cliente/edit", {
      client: client
    }); 
  } 
  async handleListClient(request: Request, response: Response) {
    const listClientsService = new ClientService();
    const client = await listClientsService.list();

    return response.render("Cliente/cliente", {
      client: client
    });
  }
  async handleSearchClient(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();
    const searchClientService = new ClientService();

    try {
      const client = await searchClientService.search(search);
      response.render("search", {
        client: client,
        search: search
      });
    } catch (err) {
      response.render("Empleados/message", {
        message: `Error al buscar usuario: ${err.message}`
      });
    }
  }
  async handleUpdateClient(request: Request, response: Response) {
    const {  idClient, clientname, dni,  email, phone, city, state} = request.body;
    const updateClientService = new ClientService();

    try {
      await updateClientService.update({ idClient, clientname, dni,  email, phone, city, state}).then(() => {
        response.render("Empleados/message", {
          message: "Usuario actualizado correctamente"
        });
      });
    } catch (err) {
      response.render("Empleados/message", {
        message: `Error al actualizar usuario: ${err.message}`
      });
    }

  }
}
export {ClientControllers};