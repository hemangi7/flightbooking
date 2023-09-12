package org.example;

import java.util.List;

public interface BookingRepository {
    Booking createBooking(Booking booking);
    Booking getBookingById(int bookingId);
    List<Booking> getAllBookings();
    boolean cancelBooking(int bookingId);
    // Other methods as needed
}

