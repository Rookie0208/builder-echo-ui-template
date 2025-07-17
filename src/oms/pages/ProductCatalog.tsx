import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Paper from "@mui/material/Paper";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  ShoppingCart as CartIcon,
  Inventory as InventoryIcon,
  AttachMoney as PriceIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { Tenant } from "../OMS";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  sku: string;
  inStock: boolean;
}

interface ProductCatalogProps {
  tenant: Tenant;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 299.99,
    stock: 45,
    category: "Electronics",
    image: "https://via.placeholder.com/300x200/1976d2/ffffff?text=Headphones",
    sku: "WBH-001",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    description: "Advanced smartwatch with health monitoring features",
    price: 399.99,
    stock: 23,
    category: "Electronics",
    image: "https://via.placeholder.com/300x200/388e3c/ffffff?text=SmartWatch",
    sku: "SW-005",
    inStock: true,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable 100% organic cotton t-shirt",
    price: 29.99,
    stock: 120,
    category: "Clothing",
    image: "https://via.placeholder.com/300x200/f57c00/ffffff?text=T-Shirt",
    sku: "OCT-001",
    inStock: true,
  },
  {
    id: "4",
    name: "Professional Camera Lens",
    description: "50mm f/1.8 professional camera lens",
    price: 599.99,
    stock: 8,
    category: "Photography",
    image: "https://via.placeholder.com/300x200/9c27b0/ffffff?text=Camera+Lens",
    sku: "PCL-050",
    inStock: true,
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    description: "Comfortable ergonomic chair for long work sessions",
    price: 249.99,
    stock: 0,
    category: "Furniture",
    image: "https://via.placeholder.com/300x200/795548/ffffff?text=Chair",
    sku: "EOC-001",
    inStock: false,
  },
  {
    id: "6",
    name: "Stainless Steel Water Bottle",
    description: "Insulated stainless steel water bottle 500ml",
    price: 24.99,
    stock: 200,
    category: "Accessories",
    image:
      "https://via.placeholder.com/300x200/607d8b/ffffff?text=Water+Bottle",
    sku: "SSWB-500",
    inStock: true,
  },
];

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Photography",
  "Furniture",
  "Accessories",
];

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Chip
              label={product.category}
              size="small"
              variant="outlined"
              icon={<CategoryIcon />}
            />
            <Chip
              label={product.inStock ? "In Stock" : "Out of Stock"}
              size="small"
              color={product.inStock ? "success" : "error"}
              variant="filled"
            />
          </Stack>

          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight="bold"
          >
            {product.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <PriceIcon fontSize="small" color="primary" />
              <Typography variant="h6" color="primary" fontWeight="bold">
                ${product.price}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <InventoryIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {product.stock} left
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            SKU: {product.sku}
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          startIcon={<CartIcon />}
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          sx={{ mt: 2 }}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ProductCatalog({ tenant }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const inStock = product.inStock;

    return matchesSearch && matchesCategory && matchesPrice && inStock;
  });

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              fullWidth
              placeholder="Search products by name, description, or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: { md: 400 } }}
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </Stack>

          {showFilters && (
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Typography>
              <Button size="small" onClick={() => setPriceRange([0, 1000])}>
                Reset
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>

      {/* Results Summary */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h6" color="text.secondary">
          {filteredProducts.length} products found
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={`${selectedCategory}`} variant="outlined" />
          {searchTerm && <Chip label={`"${searchTerm}"`} variant="outlined" />}
        </Stack>
      </Stack>

      {/* Product Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredProducts.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <InventoryIcon
            sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Paper>
      )}

      {/* Shopping Cart FAB */}
      {cartItemCount > 0 && (
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => setShowCart(true)}
        >
          <Badge badgeContent={cartItemCount} color="error">
            <CartIcon />
          </Badge>
        </Fab>
      )}

      {/* Cart Dialog */}
      <Dialog
        open={showCart}
        onClose={() => setShowCart(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Shopping Cart ({cartItemCount} items)</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {cart.map((item) => (
              <Paper key={item.product.id} sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    component="img"
                    src={item.product.image}
                    alt={item.product.name}
                    sx={{ width: 60, height: 60, borderRadius: 1 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.product.price} × {item.quantity}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Typography>
                </Stack>
              </Paper>
            ))}
            <Box sx={{ borderTop: 1, borderColor: "divider", pt: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  ${cartTotal.toFixed(2)}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCart(false)}>Continue Shopping</Button>
          <Button variant="contained" disabled={cart.length === 0}>
            Create Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
