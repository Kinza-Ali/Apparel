import { generateControllers } from "../../modules/query.js";
import { Order, validateOrder } from "./orderModel.js";

export default generateControllers(Order, validateOrder);
