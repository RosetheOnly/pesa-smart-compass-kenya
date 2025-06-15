
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { Plus, Edit, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  maxInstallmentPeriod: number;
  images: string[];
}

export const ProductManagement = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([
    { 
      id: "1", 
      name: "Samsung Galaxy S24", 
      price: 85000, 
      category: "electronics", 
      maxInstallmentPeriod: 24,
      images: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400"]
    },
    { 
      id: "2", 
      name: "Office Chair", 
      price: 15000, 
      category: "furniture", 
      maxInstallmentPeriod: 12,
      images: []
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "electronics",
    maxInstallmentPeriod: "12",
    images: [] as string[]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate image upload - in real app, you'd upload to a server
      const imageUrls = Array.from(files).map((file) => {
        return URL.createObjectURL(file);
      });
      setNewProduct({ ...newProduct, images: [...newProduct.images, ...imageUrls] });
      toast.success(`${files.length} image(s) uploaded successfully!`);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = newProduct.images.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, images: updatedImages });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error("Please fill all required fields");
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseInt(newProduct.price),
      category: newProduct.category,
      maxInstallmentPeriod: parseInt(newProduct.maxInstallmentPeriod),
      images: newProduct.images
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", price: "", category: "electronics", maxInstallmentPeriod: "12", images: [] });
    setIsAdding(false);
    toast.success("Product added successfully!");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.products}</CardTitle>
        <Button onClick={() => setIsAdding(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {t.addProduct}
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="space-y-4 mb-6 p-4 border rounded-lg">
            <div>
              <Label htmlFor="productName">{t.productName}</Label>
              <Input
                id="productName"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="price">{t.price}</Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="category">{t.category}</Label>
              <select
                id="category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="electronics">{t.electronics}</option>
                <option value="furniture">{t.furniture}</option>
                <option value="clothing">{t.clothing}</option>
                <option value="land">{t.land}</option>
                <option value="other">{t.other}</option>
              </select>
            </div>
            <div>
              <Label htmlFor="maxPeriod">{t.maxInstallmentPeriod}</Label>
              <Input
                id="maxPeriod"
                type="number"
                value={newProduct.maxInstallmentPeriod}
                onChange={(e) => setNewProduct({ ...newProduct, maxInstallmentPeriod: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="productImages">Product Images</Label>
              <div className="mt-2">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload images</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              {newProduct.images.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {newProduct.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleAddProduct}>{t.save}</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>{t.cancel}</Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex space-x-4">
                {product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                )}
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    KSH {product.price.toLocaleString()} • {product.maxInstallmentPeriod} {t.months} max
                  </p>
                  {product.images.length > 1 && (
                    <p className="text-xs text-muted-foreground">
                      +{product.images.length - 1} more image(s)
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
