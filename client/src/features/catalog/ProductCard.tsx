import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { agent } from "../../app/api/Agent";
import { IProduct } from "../../app/models";
import { formatCurrency } from "../../app/utils";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(false);

  // TODO should also change the app state
  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.AddItemToBasket(productId)
      .then((basket) => setBasket(basket))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {
            fontWeight: "bold",
            color: "primary.main",
          },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          backgroundColor: "primary.light",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          {formatCurrency(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          loading={loading}
          onClick={() => handleAddItem(product.id)}
        >
          Add to Cart
        </LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};
