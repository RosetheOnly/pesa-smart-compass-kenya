
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/useLanguage";
import { Package, MapPin, Camera, Clock, CheckCircle, Truck, User } from "lucide-react";
import { toast } from "sonner";

interface DeliveryOrder {
  id: string;
  customerName: string;
  productName: string;
  address: string;
  status: "preparing" | "shipped" | "in_transit" | "delivered" | "confirmed";
  trackingNumber: string;
  estimatedDelivery: string;
  proofImages: string[];
  gpsLocation?: { lat: number; lng: number };
  signature?: string;
  deliveryNotes: string;
}

export const DeliveryTracking = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<DeliveryOrder[]>([
    {
      id: "ORD-001",
      customerName: "John Doe",
      productName: "Samsung Galaxy S24",
      address: "123 Main St, Nairobi",
      status: "in_transit",
      trackingNumber: "TRK-001-2024",
      estimatedDelivery: "2024-06-15",
      proofImages: [],
      deliveryNotes: ""
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith", 
      productName: "Office Chair",
      address: "456 Oak Ave, Mombasa",
      status: "delivered",
      trackingNumber: "TRK-002-2024",
      estimatedDelivery: "2024-06-12",
      proofImages: ["delivery_proof_1.jpg"],
      signature: "J. Smith",
      deliveryNotes: "Delivered to front door, customer signed for package"
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const handleMarkDelivered = (orderId: string) => {
    if (!deliveryNotes.trim()) {
      toast.error("Please add delivery notes");
      return;
    }

    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: "delivered", 
            deliveryNotes,
            proofImages: ["delivery_proof.jpg"] // Simulate image upload
          }
        : order
    ));
    setDeliveryNotes("");
    setSelectedOrder(null);
    toast.success("Delivery marked as complete with proof");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preparing":
        return <Badge variant="secondary"><Package className="h-3 w-3 mr-1" />Preparing</Badge>;
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-800"><Truck className="h-3 w-3 mr-1" />Shipped</Badge>;
      case "in_transit":
        return <Badge className="bg-orange-100 text-orange-800"><MapPin className="h-3 w-3 mr-1" />In Transit</Badge>;
      case "delivered":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Delivered</Badge>;
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Confirmed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { key: "preparing", label: "Preparing", icon: Package },
      { key: "shipped", label: "Shipped", icon: Truck },
      { key: "in_transit", label: "In Transit", icon: MapPin },
      { key: "delivered", label: "Delivered", icon: CheckCircle },
      { key: "confirmed", label: "Confirmed", icon: User }
    ];

    const statusIndex = steps.findIndex(step => step.key === status);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= statusIndex
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            Delivery Tracking & Proof
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium">Active Orders</h3>
              <p className="text-xl font-bold">{orders.filter(o => o.status !== "confirmed").length}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium">Delivered Today</h3>
              <p className="text-xl font-bold">3</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-medium">Avg. Delivery Time</h3>
              <p className="text-xl font-bold">2.3 days</p>
            </div>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{order.productName}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.customerName} • {order.address}
                    </p>
                    <p className="text-sm font-medium">
                      Tracking: {order.trackingNumber} • ETA: {order.estimatedDelivery}
                    </p>
                  </div>
                  <div className="text-right">
                    {order.proofImages.length > 0 && (
                      <div className="flex items-center text-sm text-green-600 mb-2">
                        <Camera className="h-3 w-3 mr-1" />
                        Proof uploaded
                      </div>
                    )}
                    {order.signature && (
                      <div className="text-sm text-green-600">
                        Signed: {order.signature}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusSteps(order.status).map((step, index) => (
                      <div key={step.key} className="flex items-center">
                        <div className={`p-2 rounded-full ${
                          step.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                        }`}>
                          <step.icon className="h-3 w-3" />
                        </div>
                        {index < 4 && (
                          <div className={`w-8 h-px ${
                            step.completed ? "bg-green-300" : "bg-gray-300"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    {getStatusSteps(order.status).map((step) => (
                      <span key={step.key} className="w-16 text-center">{step.label}</span>
                    ))}
                  </div>
                </div>

                {order.deliveryNotes && (
                  <div className="bg-green-50 p-3 rounded mb-3">
                    <p className="text-sm text-green-800">
                      <strong>Delivery Notes:</strong> {order.deliveryNotes}
                    </p>
                  </div>
                )}

                {order.status === "in_transit" && (
                  <div className="border-t pt-3">
                    {selectedOrder === order.id ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Delivery Notes *</label>
                          <Input
                            placeholder="e.g., Delivered to front door, customer present..."
                            value={deliveryNotes}
                            onChange={(e) => setDeliveryNotes(e.target.value)}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleMarkDelivered(order.id)}>
                            <Camera className="h-3 w-3 mr-1" />
                            Mark Delivered with Proof
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedOrder(null);
                              setDeliveryNotes("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order.id)}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark as Delivered
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
