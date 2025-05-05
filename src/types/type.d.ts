interface User {
  address: string | null;
  avatar: string | null;
  contact: string | null;
  email: string;
  id: string;
  isActive: boolean;
  isVisible: boolean;
  name: string;
  regionId: string | null;
}

interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  quantity: number;
  isActive: boolean;
  isPromoted: boolean;
  promotionLevel: "basic" | "advance" | "plus";
  images: string[];
  seller: User;
  sellerId: string;
  ratings: number;
  location: string;
  regionId: string;
  unit: string;
  unitWeight: string;
  unitPrice: number;
  expiryDate?: string;
  discountPercentage?: number;
  createdAt: string;
  updatedAt: string;
  purchases?: number;
  views: number;
  clicks: number;
  reviews?: Review[];
}

interface Notification {
  id: string;
  type:
    | "follow"
    | "productReview"
    | "productSave"
    | "productOrder"
    | "productDelivery"
    | "productShipped"
    | "productClicks";
  unread: boolean;
  subject: string;
  content: string;
  attachment: string;
  createdAt: string;
}

interface SavedItem {
  id: string;
  productId: string;
  userId: string;
  createdAt: string;
}

interface Review {
  id: string;
  sellerId: string;
  productId: string;
  userId: string;
  rating: number;
  subject: string;
  description: string;
  createdAt: Date;
}

interface Region {
  id: string;
  state: string;
  lcda: string;
  name: string;
  lat: number;
  long: number;
}

interface ServiceRegion {
  regionId: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Cart {
  id: string;
  userId: string;
  cartItems: CartItem[];
  createdAt: Date;
}

interface CartItem {
  name?: string;
  id?: string;
  cartId?: string;
  slug?: string;
  quantity?: number;
  createdAt?: Date;
  image?: string;
  price?: number;
  unit?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  items: OrderItem[];
  productsAmount: number;
  logisticsAmount: number;
  totalAmount: number;
  vat: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: Date;
  updatedAt: Date;
  orderGroups: OrderGroup[];
  deliveryAddress: string;
  deliveryRegion: Region;
  deliveryRegionId: string;
  status: "pending" | "in_transit" | "delivered" | "rejected" | "canceled";
  referenceCode: string;
  accessCode: string;
  products: Product[];
}

interface OrderGroup {
  id: string;
  orderItems: OrderItem[];
  sellerId: string;
  status: "pending" | "in_transit" | "delivered" | "rejected" | "canceled";
  logisticsProviderId?: string;
  order: Order[];
  sellerNote?: string;
  logisticsNote?: string;
}

interface OrderItem {
  id: string;
  orderId: string;
  orderGroupId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SellerSummary {
  products: number;
  followers: number;
  deliveredProducts: number;
  orderedProducts: number;
  rejectedProducts: number;
  inTransitProducts: number;
  cartProducts: number;
  totalEarnings: number;
}
