package com.example.bd_webpage;

public class Payment {

    private int PaymentId;
    private int CustomerId;
    private String Amount;
    private String Date;

    public int getPaymentId() {return PaymentId; }
    public void setPaymentId(int PaymentId) { this.PaymentId = PaymentId; }

    public int getCustomerId() { return CustomerId; }
    public void setCustomerId(int CustomerId) { this.CustomerId = CustomerId; }

    public String getAmount() { return Amount; }
    public void setAmount(String Amount) { this.Amount = Amount;}


    public String getDate() { return Date; }
    public void setDate(String Date) { this.Date = Date; }

    /* Add additional getters and setters for each field.
       Just follow the same pattern. */
}