"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  limit,
} from "firebase/firestore";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  giftWrap?: boolean;
}

interface FirestoreOrder {
  id: string;
  orderId: string;
  customerName: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  landmark?: string;
  deliveryDate: string;
  timeSlot: string;
  items: OrderItem[];
  totalAmount: number;
  messageNote?: string;
  status:
    | "pending"
    | "confirmed"
    | "out-for-delivery"
    | "delivered"
    | "cancelled";
  createdAt: { seconds: number } | null;
  userEmail?: string;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-700", icon: CheckCircle2 },
  { value: "out-for-delivery", label: "Out for Delivery", color: "bg-purple-100 text-purple-700", icon: Truck },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-700", icon: Package },
];

export default function OrdersPanel() {
  const [orders, setOrders] = useState<FirestoreOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
      limit(100)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as FirestoreOrder[];
      setOrders(ordersData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (docId: string, newStatus: string) => {
    setUpdatingId(docId);
    try {
      await updateDoc(doc(db, "orders", docId), {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Orders", value: stats.total, icon: Package, color: "bg-gray-100 text-gray-700" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "bg-yellow-100 text-yellow-700" },
          { label: "Confirmed", value: stats.confirmed, icon: CheckCircle2, color: "bg-blue-100 text-blue-700" },
          { label: "Delivered", value: stats.delivered, icon: Truck, color: "bg-green-100 text-green-700" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {["all", "pending", "confirmed", "out-for-delivery", "delivered", "cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                filter === status
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
              }`}
            >
              {status === "all" ? "All" : status.replace(/-/g, " ")}
              {status === "all" ? ` (${orders.length})` : ""}
            </button>
          )
        )}
      </div>

      {/* Orders */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const isExpanded = expandedOrder === order.id;
            const statusInfo =
              STATUS_OPTIONS.find((s) => s.value === order.status) ||
              STATUS_OPTIONS[0];
            const isUpdating = updatingId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">
                          {order.orderId}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {order.customerName} &bull; ₹{order.totalAmount} &bull;{" "}
                        {order.deliveryDate}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="grid sm:grid-cols-2 gap-6 mt-4">
                      {/* Customer Info */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2">
                          Customer Details
                        </h4>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <a href={`tel:${order.phone}`} className="text-green-600 hover:underline">
                            {order.phone}
                          </a>
                          {order.alternatePhone && (
                            <span className="text-gray-400">/ {order.alternatePhone}</span>
                          )}
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                          <p className="text-gray-700">
                            {order.address}
                            {order.landmark && (
                              <span className="text-gray-400"> (Near: {order.landmark})</span>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-700">
                            {order.deliveryDate} &mdash; {order.timeSlot}
                          </span>
                        </div>
                        {order.userEmail && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-xs text-gray-400">Email:</span>
                            <span className="text-gray-600">{order.userEmail}</span>
                          </div>
                        )}
                        {order.messageNote && (
                          <div className="flex items-start gap-2 text-sm">
                            <MessageSquare className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                            <p className="text-gray-600 italic">
                              &ldquo;{order.messageNote}&rdquo;
                            </p>
                          </div>
                        )}
                        {order.createdAt && (
                          <p className="text-xs text-gray-400 mt-2">
                            Placed:{" "}
                            {format(
                              new Date(order.createdAt.seconds * 1000),
                              "dd MMM yyyy, hh:mm a"
                            )}
                          </p>
                        )}
                      </div>

                      {/* Items + Status */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2">
                          Order Items
                        </h4>
                        <div className="space-y-1 mb-5">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-gray-700">
                                {item.name} &times; {item.quantity}
                                {item.giftWrap && " 🎁"}
                              </span>
                              <span className="text-gray-800 font-medium">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                          <div className="flex justify-between text-sm font-semibold border-t border-gray-100 pt-1 mt-2">
                            <span className="text-gray-900">Total</span>
                            <span className="text-gray-900">₹{order.totalAmount}</span>
                          </div>
                        </div>

                        {/* Status Update */}
                        <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2">
                          Update Status
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {STATUS_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              disabled={isUpdating}
                              onClick={() => updateOrderStatus(order.id, opt.value)}
                              className={`text-xs px-3 py-1.5 rounded-lg border transition-all disabled:opacity-50 ${
                                order.status === opt.value
                                  ? `${opt.color} border-transparent font-semibold ring-2 ring-offset-1 ring-current/20`
                                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                        {isUpdating && (
                          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            Updating...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
