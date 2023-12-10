import { gql } from "graphql-tag";

export const GET_USER_INFO = gql`
  query {
    getUserInfo {
      accountType
      isVerified
      address {
        addressId
        city
        country
        state
        street
        zipCode
      }
      car {
        carId
        carName
        carMake
        carModel
        carYear
        carType
        mileage
        carVin
        carRegistration
        carInsurance
        plateNumber
        status
        carImage {
          imageId
          imageLink
        }
        carColor
        available
      }
      profilePicture {
        createdAt
        isCurrent
        pictureId
        pictureLink
      }
      firstName
      lastName
      username
      email
      phoneNumber
      isActive
      isStaff
      isSuperuser
      lastLogin
      dateJoined
    }
  }
`;

export const GET_USER_INFO_BY_ID = gql`
  query ($userId: String!) {
    getUserInfoById(userId: $userId) {
      accountType
      isVerified
      address {
        addressId
        city
        country
        state
        street
        zipCode
      }
      car {
        carId
        carName
        carMake
        carModel
        carYear
        carType
        mileage
        carVin
        carRegistration
        carInsurance
        plateNumber
        status
        carImage {
          imageId
          imageLink
        }
        carColor
        available
      }
      profilePicture {
        createdAt
        isCurrent
        pictureId
        pictureLink
      }
      firstName
      lastName
      username
      email
      phoneNumber
      isActive
      isStaff
      isSuperuser
      lastLogin
      dateJoined
    }
  }
`;

export const IS_AUTHENTICATED = gql`
  query {
    isLoggedIn
  }
`;

export const FIND_DEALERSHIP = gql`
  query ($searchTerm: String!) {
    findDealerships(searchTerm: $searchTerm) {
      active
      dealershipName
      dealershipEmail
      dealershipState
      dealershipAddress
      dealershipZipCode
      dealershipCity
      dealershipCountry
      dealershipDescription
      dealershipId
      dealershipLogo
      dealershipZipCode
      dealershipWebsite
      dealershipPhoneNumber
    }
  }
`;

export const FIND_SERVICES = gql`
  query ($dealershipId: String!) {
    getServicePackages(dealershipId: $dealershipId) {
      dealershipId
      servicePackageDescription
      servicePackageDuration
      servicePackageId
      servicePackageName
      servicePackagePrice
      servicePackageType
    }
  }
`;

export const GET_REQUESTS = gql`
  query {
    getConfirmation {
      dealership {
        dealershipName
        dealershipId
        dealershipCity
        dealershipCountry
        dealershipAddress
        dealershipZipCode
        dealershipState
      }
      confirmationDate
      confirmationId
      confirmationStatus
      updatedAt
    }
  }
`;

export const GET_ORDERS = gql`
  query {
    getUnconfirmedOrders {
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

export const PING = gql`
  {
    ping
  }
`;

export const GET_CONFIRMED_ORDERS = gql`
query {
  getConfirmedOrders {
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

export const VALET_EXISTS = gql`
  query ($orderId: String!) {
    valetExists(orderId: $orderId)
  }
`;

export const GET_STARTED_VALET = gql`
  query {
    getAllStartedDriverValets {
      createdAt
      comments
      customer {
        userId
        accountType
        profilePicture {
          pictureLink
        }
        firstName
        lastName
      }
      customerDropOffTime
      customerPickUpTime
      customerVehiclChecks {
        backImage
        checkInTime
        checkOutTime
        frontImage
        gasLevel
        leftImage
      }
      dealership {
        dealershipId
      }
      updatedAt
      valetDropOffTime
      valetId
      valetPickUpTime
      valetStatus
      valetVehicleChecks {
        backImage
        checkInTime
        checkOutTime
        frontImage
        gasLevel
        leftImage
        mileage
        rightImage
        vehicleCheckId
      }
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
    }
  }
`;

export const GET_PENDING_CONFIRMATION = gql`
  query {
    getPendingConfirmations {
      dealership {
        dealershipName
        dealershipId
        dealershipCity
        dealershipCountry
        dealershipAddress
        dealershipZipCode
        dealershipState
      }
      confirmationDate
      confirmationId
      confirmationStatus
      updatedAt
    }
  }
`;

export const GET_VALET_INFO = gql`
  query ($orderId: String!) {
    getValet(orderId: $orderId) {
      createdAt
      comments
      customer {
        userId
        accountType
        profilePicture {
          pictureLink
        }
        firstName
        lastName
      }
      customerDropOffTime
      customerPickUpTime
      customerVehiclChecks {
        backImage
        checkInTime
        checkOutTime
        frontImage
        gasLevel
        leftImage
      }
      dealership {
        dealershipId
      }
      updatedAt
      valetDropOffTime
      valetId
      valetPickUpTime
      valetStatus
      valetVehicleChecks {
        backImage
        checkInTime
        checkOutTime
        frontImage
        gasLevel
        leftImage
        mileage
        rightImage
        vehicleCheckId
      }
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
    }
  }
`;

export const GET_ORDER = gql`
  query ($getOrderId: String!) {
    getOrder(id: $getOrderId) {
      orderId
      orderStatus
    }
  }
`;
