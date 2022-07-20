import { Router } from "express";
import {UserControllers} from "./controllers/UserControllers";
import ProductControllers from "./controllers/ProductControllers";
import CategoryControllers from "./controllers/CategoryControllers";
import { LoginControllers } from "./controllers/LoginControllers";
import { PatientControllers } from "./controllers/PatientControllers";
import { ClientControllers } from "./controllers/ClientControllers";


//----------------------------Empleados--------------------------------------------
const router = Router();
const controllers = new UserControllers();
router.get("/profile", (request, response) => {
  response.render("profile");
});


router.get("/Usuarios",controllers.handleListUser);
router.get("/add", (request, response) => {
  response.render("Empleados/add");
});
router.get("/index", (request, response) => {
  response.render("index");
});
router.get("/navBar", (request, response) => {
  response.render("template/navBar");
});
router.post("/add-user", controllers.handleCreateUser);
router.get("/search", controllers.handleSearchUser);
router.get("/edit", controllers.handleGetUser);
router.post("/edit-user", controllers.handleUpdateUser);
router.post("/delete-user", controllers.handleDeleteUser);
//-------------------------------Productos------------------------------------------
const product = new ProductControllers();
router.get("/product", product.handleListProduct);
router.get("/addProduct", product.handleAddProduct);
router.post("/addProduct", product.handleCreateProduct);
router.get("/searchProduct", product.handleSearchProduct);
router.get("/editProduct", product.handleGetProduct);
router.post("/editproduct", product.handleUpdateProduct);
router.post("/delete-product", product.handleDeleteProduct);
//---------------------------------Categorias----------------------------------------
const category = new CategoryControllers();
router.get("/Category", category.handleListCategory);
router.get("/addCategory", (request, response) => {
  response.render("Category/addCategory");});
router.post("/addCategory", category.handleCreateCategory);
router.get("/searchCategory", category.handleSearchCategory);
router.get("/editCategory", category.handleGetCategory);
router.post("/edit-category", category.handleUpdateCategory);
router.post("/delete-category", category.handleDeleteCategory);
//---------------------------------Paciente-------------------------------------
const patient = new PatientControllers();

router.get("/listPaciente",patient.handleListPatient);
router.get("/addPaciente", (request, response) => {
  response.render("Paciente/addPaciente");});
router.post("/addPaciente", patient.handleCreatePatient);
//---------------------------------Cliente-------------------------------------
const cliente = new ClientControllers();

router.get("/cliente",cliente.handleListClient);
router.get("/addCliente", (request, response) => {
  response.render("Cliente/addCliente");});
router.post("/addCliente", cliente.handleCreateClient);
//---------------------------------Sesion----------------------------------------

const login = new LoginControllers();

router.get("/signUp", (request, response) => {
  response.render("Registro/signUp");
});
router.get("/", (request, response) => {
  response.render("Inicio/signIn");
});
router.post("/signUp",login.handleCreateSingUp);
router.post("/signIn", login.signInAutentication);
router.get("/ListLogin",login.handleListUser);
router.get("/searchRegistro", login.handleSearchUser);
router.get("/editLogin", login.handleGetUser);
router.post("/edit-Login", login.handleUpdateUser);
router.post("/deleteLogin", login.handleDeleteUser);

export { router };

