package org.example;

public enum BookingStatus {
    PENDING("PENDING"),
    CONFIRMED("CONFIRMED"),
    CANCELED("CANCELED");

    private final String status;

    BookingStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return status;
    }
}

