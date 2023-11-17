import { gql } from "graphql-tag";

export const GET_VALETS_SUBSCRIPTION = gql`
  subscription ($userId: String!) {
    orderSubscription(userId: $userId) {
      event {
        orderId
        orderStatus
        orderType
        assignedTo {
          userId
          username
          email
          accountType
          firstName
          lastName
        }
        customer {
          userId
          username
          email
          accountType
          firstName
          lastName
        }
        orderAddress {
          addressId
          address
          city
          province
          postalCode
          country
        }
        valetServiceDate
      }
    }
  }
`;

export const GET_ASSIGNED_ORDERS = gql`
  subscription {
    orderAssigned {
      order {
        orderId
        notes
        orderDeliveryDate
        orderStatus
        pickupLocation
        serviceType {
          servicePackageName
          dealershipId
        }
        valetVehicleRequest
        vehicle {
          carImage {
            imageId
            imageLink
          }
        }
      }
      assignId
      acceptDate
      assignDate
      assignedById
      assignStatus
      customerId
      dealership {
        active
        dealershipAddress
        dealershipCity
        dealershipCountry
        dealershipId
        dealershipName
        dealershipState
        dealershipZipCode
      }
      drivers {
        userId
        accountType
        address {
          addressId
          city
          country
          state
          street
          zipCode
        }
        dateJoined
        email
        firstName
        phoneNumber
        profilePicture {
          createdAt
          pictureId
          pictureLink
        }
        userId
        username
      }
      valetVehicle {
        available
        carColor
        carId
        carImage {
          imageId
          imageLink
        }
        carInsurance
        carMake
        carModel
        carName
        carRegistration
        carType
        carVin
        carYear
        dealership {
          dealershipId
          dealershipName
        }
        mileage
        plateNumber
        status
        updatedDate
      }
    }
  }
`;

export const GET_DEALERSHIP_REQUESTS = gql`
  subscription {
    notifyDriver {
      confirmationDate
      confirmationId
      confirmationStatus
      dealership {
        dealershipName
        dealershipId
      }
      updatedAt
      user {
        accountType
      }
    }
  }
`;
