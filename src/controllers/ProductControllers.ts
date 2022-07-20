import { Request, Response } from "express";
import { Category } from "../entities/Category";
import { CategoryService } from "../services/CategoryService";
import {ProductService} from "../services/ProductService";

class ProductControllers{

  
  async handleAddProduct(request: Request, response: Response) {
    const service = new CategoryService();
    const categories = await service.list();
    response.render("Product/addProduct", {categories})
  }
  async handleCreateProduct(request: Request, response: Response) {
      const { productname, price, name} = request.body;
      const service = new ProductService();
      try {
        await service.create({
          productname,
          price,
          name
        }).then(() => {
          response.render("Product/messageProduct", {
            message: "Producto registrado exitosamente"
          });
        });
      } catch (err) {
        response.render("Product/messageProduct", {
          message: `Error al registrar producto: ${err.message}`
        });
      }
  
    }
    async handleDeleteProduct(request: Request, response: Response) {
    const { id } = request.body;

    const deleteProductService = new ProductService();

    try {
      await deleteProductService.delete(id).then(() => {
        response.render("Product/messageProduct", {
          message: "Producto eliminado correctamente"
        });
      });
    } catch (err) {
      response.render("Product/messageProduct", {
        message: `Error al eliminar producto: ${err.message}`
      });
    }
  } 
  async handleGetProduct(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getProductDataService = new ProductService();

    const product = await getProductDataService.getData(id);

    const listarcategoria = new CategoryService();
  
    const categorias = await listarcategoria.list()
    return response.render("Product/editProduct", {
      product: product,
      categories: categorias
    });
  } 
  async handleListProduct(request: Request, response: Response) {
    const listProductsService = new ProductService();
    const products = await listProductsService.list();
    const listarcategoria = new CategoryService();
  
    const categorias = await listarcategoria.list()
    return response.render("Product/product", {
      products: products,
      categories: categorias
    });
  }
  async handleSearchProduct(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchProductService = new ProductService();
    const listarcategoria = new CategoryService();
  
    const categorias = await listarcategoria.search(search)
    try {
      const products = await searchProductService.search(search);
      response.render("Product/searchProduct", {
        products: products,
        categories: categorias,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: `Error al buscar producto: ${err.message}`
      });
    }
  }
  async handleUpdateProduct(request: Request, response: Response) {
    
    const {  id,productname, price, categoriaId} = request.body;

    const updateProductService = new ProductService();

    try {
      await updateProductService.update({ id, productname, price,categoriaId}).then(() => {
        response.render("Product/messageProduct", {
          message: "Producto actualizado correctamente"
        });
      });
    } catch (err) {
      response.render("Product/messageProduct", {
        message: `Error al actualizar producto: ${err.message}`
      });
    }

  }
}
export default ProductControllers;