import { Request, Response } from "express";
import {PatientService} from "../services/PatientService";

class PatientControllers{

  async handleCreatePatient(request: Request, response: Response) {
      const {idPatient, patientname, datebirth, weigth, heigth, specie } = request.body;
      const createPatientService = new PatientService();
  
      try {
        await createPatientService.create({
          idPatient,
          patientname,
          datebirth,
          weigth,
          heigth,
          specie,
        }).then(() => {
          response.render("Paciente/message", {
            message: "Paciente registrado exitosamente"
          });
        });
      } catch (err) {
        response.render("Paciente/message", {
          message: `Error al registrar paciente: ${err.message}`
        })
        console.log(request.body);
      }

  }
  async handleDeletePatient(request: Request, response: Response) {
    const { idPatient } = request.body;

    const deletePatientService = new PatientService();

    try {
        await deletePatientService.delete(idPatient).then(() => {
        response.render("Paciente/message", {
          message: "Usuario eliminado correctamente"
        });
      });
    } catch (err) {
      response.render("Paciente/message", {
        message: `Error al eliminar usuario: ${err.message}`
      });
    }
  } 
  async handleGetPatient(request: Request, response: Response) {
    let { idPatient } = request.query;
    idPatient = idPatient.toString();

    const getPatientDataService = new PatientService();            
    const patient = await getPatientDataService.getData(idPatient);

    return response.render("Paciente/edit", {
      patient: patient
    }); 
  } 
  async handleListPatient(request: Request, response: Response) {
    const listPatientService = new PatientService();
    const patient = await listPatientService.list();

    return response.render("Paciente/listPaciente", {
      patient: patient
    });
  }
  async handleSearchPatient(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();
    const searchPatientService = new PatientService();

    try {
      const patient = await searchPatientService.search(search);
      response.render("search", {
        patient: patient,
        search: search
      });
    } catch (err) {
      response.render("Paciente/message", {
        message: `Error al buscar usuario: ${err.message}`
      });
    }
  }
  async handleUpdatePatient(request: Request, response: Response) {
    const { idPatient, patientname, datebirth ,weigth, heigth, specie } = request.body;
    const updatePatientService = new PatientService();

    try {
      await updatePatientService.update({ idPatient, patientname, datebirth ,weigth, heigth, specie }).then(() => {
        response.render("Paciente/message", {
          message: "Usuario actualizado correctamente"
        });
      });
    } catch (err) {
      response.render("Paciente/message", {
        message: `Error al actualizar usuario: ${err.message}`
      });
    }

  }
}
export{PatientControllers};