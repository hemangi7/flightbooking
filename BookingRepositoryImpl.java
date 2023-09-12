package org.example;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BookingRepositoryImpl implements BookingRepository {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flightbooking";
    private static final String JDBC_USER = "root";
    private static final String JDBC_PASSWORD = "";
    @Override
    public Booking createBooking(Booking booking) {
        String query = "INSERT INTO bookings (flight_number, airline_name, departure_airport, " +
                "departure_time, arrival_airport, arrival_time, " +
                "passenger_first_name, passenger_last_name, passenger_email, " +
                "passenger_phone_number, booking_status, num_passengers, " +
                "class_info, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setString(1, booking.getFlightNumber());
            preparedStatement.setString(2, booking.getAirlineName());
            preparedStatement.setString(3, booking.getDepartureAirport());
            preparedStatement.setString(4, booking.getDepartureTime());
            preparedStatement.setString(5, booking.getArrivalAirport());
            preparedStatement.setString(6, booking.getArrivalTime());
            preparedStatement.setString(7, booking.getPassengerFirstName());
            preparedStatement.setString(8, booking.getPassengerLastName());
            preparedStatement.setString(9, booking.getPassengerEmail());
            preparedStatement.setString(10, booking.getPassengerPhoneNumber());
            preparedStatement.setString(11, booking.getBookingStatus().toString());
            preparedStatement.setInt(12, booking.getNumPassengers());
            preparedStatement.setString(13, booking.getClassInfo());
            preparedStatement.setBigDecimal(14, booking.getTotalPrice());

            int rowsInserted = preparedStatement.executeUpdate();
            if (rowsInserted == 0) {
                return null; // Insertion failed
            }

            try (ResultSet generatedKeys = preparedStatement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    booking.setBookingId(generatedKeys.getInt(1)); // Set the generated booking ID
                } else {
                    return null; // Insertion failed, no generated key
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null; // Error occurred during database access
        }

        return booking;
    }

    //getBookingById
    @Override
    public Booking getBookingById(int bookingId) {
        String query = "SELECT * FROM bookings WHERE booking_id = ?";

        try (Connection connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            preparedStatement.setInt(1, bookingId);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    return mapResultSetToBooking(resultSet);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null; // No booking found for the given ID
    }

    // Helper method to map a ResultSet row to a Booking object
    private Booking mapResultSetToBooking(ResultSet resultSet) throws SQLException {
        Booking booking = new Booking();
        booking.setBookingId(resultSet.getInt("booking_id"));
        booking.setFlightNumber(resultSet.getString("flight_number"));
        booking.setAirlineName(resultSet.getString("airline_name"));
        booking.setDepartureAirport(resultSet.getString("departure_airport"));
        booking.setDepartureTime(resultSet.getString("departure_time"));
        booking.setArrivalAirport(resultSet.getString("arrival_airport"));
        booking.setArrivalTime(resultSet.getString("arrival_time"));
        booking.setPassengerFirstName(resultSet.getString("passenger_first_name"));
        booking.setPassengerLastName(resultSet.getString("passenger_last_name"));
        booking.setPassengerEmail(resultSet.getString("passenger_email"));
        booking.setPassengerPhoneNumber(resultSet.getString("passenger_phone_number"));
        booking.setBookingStatus(BookingStatus.valueOf(resultSet.getString("booking_status")));
        booking.setNumPassengers(resultSet.getInt("num_passengers"));
        booking.setClassInfo(resultSet.getString("class_info"));
        booking.setTotalPrice(resultSet.getBigDecimal("total_price"));

        return booking;
    }


    //getAllBookings

    @Override
    public List<Booking> getAllBookings() {
        List<Booking> bookings = new ArrayList<>();
        String query = "SELECT * FROM bookings";

        try (Connection connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement preparedStatement = connection.prepareStatement(query);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                Booking booking = mapResultSetToBooking(resultSet);
                bookings.add(booking);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return bookings;
    }


    //cancelBooking
    @Override
    public boolean cancelBooking(int bookingId) {
        String query = "DELETE FROM bookings WHERE booking_id = ?";

        try (Connection connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            preparedStatement.setInt(1, bookingId);

            int rowsAffected = preparedStatement.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }


}

