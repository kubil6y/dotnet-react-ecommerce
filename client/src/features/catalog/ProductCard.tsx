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
import { FC } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../app/models";
import { formatCurrency } from "../../app/utils";

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
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
        <Button size="small">Add to Cart</Button>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};
