package com.example.bd_webpage;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;


@WebServlet(name = "ProductGetServlet", value = "/ProductGetServlet")
public class ProductLogger extends HttpServlet {

    private final static Logger log = Logger.getLogger(ProductDAO.class.getName());

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log.log(Level.FINE, "Get Product servlet");

        // Get setup up to output JSON text
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Write out that string
        out.println("Hello");
    }
}
