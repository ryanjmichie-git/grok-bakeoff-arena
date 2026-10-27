import inventoryJson from "../data/inventory.json";
import ordersJson from "../data/orders.json";
import type { InventoryItem, Order } from "./types";

export const inventory = inventoryJson as InventoryItem[];
export const orders = ordersJson as Order[];
