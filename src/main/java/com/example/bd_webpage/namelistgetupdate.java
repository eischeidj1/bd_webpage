package com.example.bd_webpage;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;

@WebServlet(name = "NameListGetUpdate", value = "/api/namelistgetupdate")

public class namelistgetupdate extends HttpServlet {
    private static final long serialVersionUID = 1L;


public namelistgetupdate(){

}
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {

        System.out.println("Hello World");
    }
}