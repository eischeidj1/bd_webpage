package com.example.bd_webpage;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class Product {

    private int ProductId;
    private String Type;
    private String Color;
    private String Size;
    private String Cost;


    public int getProductId() {return ProductId; }
    public void setProductId(int ProductId) { this.ProductId = ProductId; }

    public String getType() { return Type; }
    public void setType(String Type) { this.Type = Type; }

    public String getColor() { return Color; }
    public void setColor(String Color) { this.Color = Color;}

    public String getSize() { return Size; }
    public void setSize(String Size) { this.Size = Size;}

    public String getCost() { return Cost; }
    public void setCost(String Cost) { this.Cost = Cost; }




    /* Add additional getters and setters for each field.
       Just follow the same pattern. */
}