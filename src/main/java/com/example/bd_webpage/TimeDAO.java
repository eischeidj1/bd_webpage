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
public class TimeDAO {
    private final static Logger log = Logger.getLogger(TimeDAO.class.getName());

    /**
     * Get a list of the people in the database.
     * @return Returns a list of instances of the People class.
     */
    public static List<Time> getTime() {
        log.log(Level.FINE, "Get Time");

        // Create an empty linked list to put the people we get from the
        // database into.
        List<Time> list = new LinkedList<Time>();

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
            String sql = "select TimeId, Date, Month, Day, Year from Time";


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
                Time time = new Time();

                // Get the data from the result set, and copy it to the Person
                // object.
                time.setTimeId(rs.getInt("TimeID"));
                time.setDate(rs.getString("Date"));
                time.setMonth(rs.getString("Month"));
                time.setDay(rs.getString("Day"));
                time.setYear(rs.getInt("Year"));
                /* FILL IN THE REST HERE */


                // Add this person to the list so we can return it.
                list.add(time);
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
