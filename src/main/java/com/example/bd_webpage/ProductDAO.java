package com.example.bd_webpage;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Data Access Object for the Person table/class
 */
public class ProductDAO {
    private final static Logger log = Logger.getLogger(ProductDAO.class.getName());

    /**
     * Get a list of the people in the database.
     * @return Returns a list of instances of the People class.
     */
    public static List<Product> getProduct() {
        log.log(Level.FINE, "Get Product");

        // Create an empty linked list to put the people we get from the
        // database into.
        List<Product> list = new LinkedList<Product>();

        // Declare our variables
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        // Databases are unreliable. Use some exception handling
        try {
            // Get our database connection
            conn = DBHelper.getConnection();

            // This is a string that is our SQL query.
            // Update for all our fields
            String sql = "select ProductId, Type, Color, Cost from Product";


            // If you had parameters, it would look something like
            // String sql = "select id, first, last, phone from person where id = ?";

            // Create an object with all the info about our SQL statement to run.
            stmt = conn.prepareStatement(sql);

            // If you had parameters, they would be set wit something like:
            // stmt.setString(1, "1");

            // Execute the SQL and get the results
            rs = stmt.executeQuery();

            // Loop through each record
            while(rs.next()) {
                // Create a new instance of the Person object.
                // You'll need to define that somewhere. Just a simple class
                // with getters and setters on the fields.
                Product product = new Product();

                // Get the data from the result set, and copy it to the Person
                // object.
                product.setProductId(rs.getInt("Product ID"));
                product.setType(rs.getString("Type"));
                product.setColor(rs.getString("Color"));
                product.setCost(rs.getBigDecimal("Cost"));

                /* FILL IN THE REST HERE */


                // Add this person to the list so we can return it.
                list.add(product);
            }
        } catch (SQLException se) {
            log.log(Level.SEVERE, "SQL Error", se );
        } catch (Exception e) {
            log.log(Level.SEVERE, "Error", e );
        } finally {
            // Ok, close our result set, statement, and connection
            try { if (rs != null) rs.close(); }
            catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }

            try { if(stmt != null) stmt.close(); }
            catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }

            try { if(conn != null) conn.close(); }
            catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
        }
        // Done! Return the results
        return list;
    }

}
