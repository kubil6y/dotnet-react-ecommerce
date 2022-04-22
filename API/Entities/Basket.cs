using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
  public class Basket
  {
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public List<BasketItem> Items { get; set; } = new();

    // AddItem this method will only do these operations on memory
    // only when we save changes it will apply to the database.
    public void AddItem(Product product, int quantity)
    {
      if (Items.All(item => item.ProductId != product.Id))
      {
        Items.Add(new BasketItem { Product = product, Quantity = quantity });
      }
      else
      {
        var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
        if (existingItem != null) existingItem.Quantity += quantity;
      }
    }

    public void RemoveItem(int productId, int quantity)
    {
      if (quantity <= 0) return;
      BasketItem item = Items.FirstOrDefault(i => i.ProductId == productId);
      if (item == null) return;
      item.Quantity -= quantity;
      if (item.Quantity <= 0) Items.Remove(item);
    }
  }
}
