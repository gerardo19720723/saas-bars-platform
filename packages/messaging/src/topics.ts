// Contratos explícitos: evita drift
export const TOPICS = {
  AUTH_USER_CREATED: 'auth.user.created',
  INVENTORY_STOCK_UPDATED: 'inventory.stock.updated',
  CATALOG_ORDER_CREATED: 'catalog.order.created',
  LOYALTY_POINTS_CHANGED: 'loyalty.points.changed',
} as const;

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

// ... otros eventos