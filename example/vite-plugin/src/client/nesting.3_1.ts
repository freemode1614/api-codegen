export enum BookingPaymentCurrency {
    "bam" = "bam",
    "bgn" = "bgn",
    "chf" = "chf",
    "eur" = "eur",
    "gbp" = "gbp",
    "nok" = "nok",
    "sek" = "sek",
    "try" = "try"
}
export enum AccountType {
    "company" = "company",
    "individual" = "individual"
}
export enum BookingPaymentStatus {
    "failed" = "failed",
    "pending" = "pending",
    "succeeded" = "succeeded"
}
export type Station = {
    "id": string;
    "name": string;
    "address": string;
    "country_code": string;
    "timezone": string;
};
export type LinksSelf = {
    "self": string;
};
export type LinksPagination = {
    "next": string;
    "prev": string;
};
export type Problem = {
    "type": string;
    "title": string;
    "detail": string;
    "instance": string;
    "status": number;
};
export type Trip = {
    "id": string;
    "origin": string;
    "destination": string;
    "departure_time": string;
    "arrival_time": string;
    "operator": string;
    "price": number;
    "bicycles_allowed": boolean;
    "dogs_allowed": boolean;
};
export type Booking = {
    "id": string;
    "trip_id": string;
    "passenger_name": string;
    "has_bicycle": boolean;
    "has_dog": boolean;
};
export type WrapperCollection = {
    "data": Record<string, unknown>[];
    "links": Record<string, unknown>;
};
export type BookingPayment = {
    "id": string;
    "amount": number;
    "currency": BookingPaymentCurrency;
    "source": {
        "object": string;
        "name": string;
        "number": string;
        "cvc": number;
        "exp_month": number;
        "exp_year": number;
        "address_line1": string;
        "address_line2": string;
        "address_city": string;
        "address_country": string;
        "address_post_code": string;
    } | {
        "object": string;
        "name": string;
        "number": string;
        "sort_code": string;
        "account_type": AccountType;
        "bank_name": string;
        "country": string;
    };
    "status": BookingPaymentStatus;
};
export type LinksBooking = {
    "booking": string;
};
export async function getStationsUsingGet() { return fetch(`/stations`, {
    method: "GET"
}).then(async (response) => (await response.json()) as WrapperCollection & {
    "data": Station[];
} & {
    "links": LinksSelf & LinksPagination;
}); }
export async function getTripsUsingGet({ origin, destination, date, bicycles, dogs }: {
    origin: string;
    destination: string;
    date: string;
    bicycles?: boolean;
    dogs?: boolean;
}) { return fetch(`/trips?origin=${origin}&destination=${destination}&date=${date}&bicycles=${bicycles}&dogs=${dogs}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as WrapperCollection & {
    "data": Trip[];
} & {
    "links": LinksSelf & LinksPagination;
}); }
export async function getBookingsUsingGet() { return fetch(`/bookings`, {
    method: "GET"
}).then(async (response) => (await response.json()) as WrapperCollection & {
    "data": Booking[];
} & {
    "links": LinksSelf & LinksPagination;
}); }
export async function createBookingUsingPostJson(req: {
    "id": string;
    "trip_id": string;
    "passenger_name": string;
    "has_bicycle": boolean;
    "has_dog": boolean;
}) { return fetch(`/bookings`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as Booking & {
    "links": LinksSelf;
}); }
export async function createBookingUsingPostXml(req: {
    "id": string;
    "trip_id": string;
    "passenger_name": string;
    "has_bicycle": boolean;
    "has_dog": boolean;
}) { return fetch(`/bookings`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as Booking & {
    "links": LinksSelf;
}); }
export async function getBookingUsingGet({ bookingId }: {
    bookingId: string;
}) { return fetch(`/bookings/${bookingId}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Booking & {
    "links": LinksSelf;
}); }
export async function deleteBookingUsingDelete({ bookingId }: {
    bookingId: string;
}) { return fetch(`/bookings/${bookingId}`, {
    method: "DELETE"
}); }
export async function createBookingPaymentUsingPost({ bookingId }: {
    bookingId: string;
}, req: {
    "id": string;
    "amount": number;
    "currency": BookingPaymentCurrency;
    "source": {
        "object": string;
        "name": string;
        "number": string;
        "cvc": number;
        "exp_month": number;
        "exp_year": number;
        "address_line1": string;
        "address_line2": string;
        "address_city": string;
        "address_country": string;
        "address_post_code": string;
    } | {
        "object": string;
        "name": string;
        "number": string;
        "sort_code": string;
        "account_type": AccountType;
        "bank_name": string;
        "country": string;
    };
    "status": BookingPaymentStatus;
}) { return fetch(`/bookings/${bookingId}/payment`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as BookingPayment & {
    "links": LinksBooking;
}); }
