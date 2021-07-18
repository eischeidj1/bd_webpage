package com.example.bd_webpage;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


@WebServlet(name = "TimeGetServlet", value = "/api/TimeGetServlet")
public class TimeGetServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(TimeGetServlet.class.getName());
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log.log(Level.INFO, "Get Time");

        // Get setup up to output JSON text
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Use our DAO to get a list of people
        List<Time> timeList = TimeDAO.getTime();

        Jsonb jsonb = JsonbBuilder.create();
        String jsonString = jsonb.toJson(timeList);

        // Write out that string
        out.println(jsonString);
    }
}
