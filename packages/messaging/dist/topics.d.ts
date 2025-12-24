export declare const TOPICS: {
    readonly AUTH_USER_CREATED: "auth.user.created";
    readonly INVENTORY_STOCK_UPDATED: "inventory.stock.updated";
    readonly CATALOG_ORDER_CREATED: "catalog.order.created";
    readonly LOYALTY_POINTS_CHANGED: "loyalty.points.changed";
};
export type AuthUserCreatedEvent = {
    userId: string;
    email: string;
    tenantId: string;
};
export type InventoryStockUpdatedEvent = {
    productId: string;
    newQuantity: number;
    tenantId: string;
};
