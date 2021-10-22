import { generateControllers } from "../../modules/query.js";
import { Product, validateProduct } from "./productModel.js";

export default generateControllers(Product, validateProduct);
