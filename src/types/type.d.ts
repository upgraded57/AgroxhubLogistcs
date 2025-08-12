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
  region?: Region;
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

interface NotificationList {
  id: string;
  type:
    | "follow"
    | "productReview"
    | "productSave"
    | "orderPlacement"
    | "orderPickup"
    | "orderInTransit"
    | "orderDelivery"
    | "milestone"
    | "orderAssignment"
    | "outOfStock";
  unread: boolean;
  subject: string;
  summary: string;
  attachment?: string;
  createdAt: string;
  product?: {
    id: string;
    name: string;
    image: string;
    unit: string;
    slug: string;
  };
  products?: Array<{
    id: string;
    name: string;
    image: string;
    unit: string;
    quantity: number;
    slug: string;
  }>;
  buyer?: {
    id: string;
    name: string;
    avatar: string;
  };
  follower?: {
    id: string;
    name: string;
    avatar: string;
  };
  logisticsProvider?: {
    id: string;
    name: string;
    avatar: string;
  };
  order?: {
    id: string;
    amount: number;
    createdAt: string;
    deliveryAddress: string;
    deliveryRegion: {
      state: string;
      lcda: string;
      name: string;
    };
  };
  productQuantity?: number;
  pickupDate?: string;
  deliveryDate?: string;
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

interface Deliverable {
  categoryName: string;
  unitCost: string;
  categoryId: string;
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
  deliveryAddress: string;
  deliveryCost: number;
  createdAt: Date;
  id: string;
  pickupAddress: string;
  productsCount: number;
  deliveryAddress?: string;
  deliveryDate?: Date;
  pickupDate?: string;
  products?: Array<Product>;
  status: "pending" | "in_transit" | "delivered" | "rejected" | "canceled";
  user?: {
    name: string;
    avatar: string;
  };
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

interface QueryTypes {
  status:
    | "all"
    | "pending"
    | "in_transit"
    | "delivered"
    | "returned"
    | undefined;
}
