import { gql } from "graphql-tag";

export const Signup = gql`
  mutation ($input: UserInput!) {
    register(input: $input) {
      token
      user {
        accountType
        isVerified
        profilePicture {
          pictureId
          pictureLink
        }
      }
    }
  }
`;

export const Login = gql`
  mutation ($password: String!, $username: String, $email: String) {
    login(password: $password, username: $username, email: $email) {
      token
      user {
        accountType
        isVerified
        profilePicture {
          pictureId
          pictureLink
        }
      }
    }
  }
`;

export const Logout = gql`
  mutation logout {
    logout {
      deleted
    }
  }
`;

export const UPLOAD_PROFILE_PICTURE = gql`
  mutation ($pictureLink: String!) {
    uploadProfilePicture(pictureLink: $pictureLink) {
      isCurrent
      createdAt
      pictureId
      pictureLink
    }
  }
`;

export const UPDATE_NAME = gql`
  mutation ($lastName: String!, $firstName: String!) {
    updateName(lastName: $lastName, firstName: $firstName)
  }
`;

export const Add_CAR_INFO = gql`
  mutation ($input: CarInfoInput!) {
    addCarInfo(input: $input) {
      carId
      available
      carColor
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
      mileage
      plateNumber
      status
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation ($input: OrderInput!) {
    createOrder(input: $input) {
      createdDate
      notes
      orderDeliveryDate
      orderId
      serviceType {
        servicePackageName
      }
      pickupLocation
    }
  }
`;

export const ACCEPT_REQUEST = gql`
  mutation ($confirmationId: String!) {
    acceptUserDealership(confirmationId: $confirmationId) {
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

export const REJECT_REQUEST = gql`
  mutation ($confirmationId: String!) {
    rejectUserDealership(confirmationId: $confirmationId) {
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
      createdAt
      updatedAt
    }
  }
`;

export const CONFIRM_ORDER = gql`
  mutation ($assignId: String!) {
    acceptOrder(assignId: $assignId) {
      acceptDate
      assignDate
      assignedById
      assignId
      assignStatus
      customerId
      dealership {
        dealershipName
        dealershipId
      }
      drivers {
        userId
        username
        firstName
        lastName
        phoneNumber
      }
      order {
        orderId
        serviceType {
          servicePackageId
          servicePackageName
        }
        customer {
          userId
          username
          firstName
          lastName
          phoneNumber
        }
        notes
        orderDeliveryDate
        orderId
        orderStatus
        pickupLocation
        valetVehicleRequest
        vehicle {
          carImage {
            imageId
            imageLink
          }
        }
      }
      valetVehicle {
        carImage {
          imageId
          imageLink
        }
      }
    }
  }
`;

export const REJECT_ORDER = gql`
  mutation ($assignId: String!) {
    rejectOrder(assignId: $assignId) {
      acceptDate
      assignDate
      assignedById
      assignId
      assignStatus
      customerId
      dealership {
        dealershipName
        dealershipId
      }
      drivers {
        userId
        username
        firstName
        lastName
        phoneNumber
      }
      order {
        orderId
        serviceType {
          servicePackageId
          servicePackageName
        }
        customer {
          userId
          username
          firstName
          lastName
          phoneNumber
        }
        notes
        orderDeliveryDate
        orderId
        orderStatus
        pickupLocation
        valetVehicleRequest
        vehicle {
          carImage {
            imageId
            imageLink
          }
        }
      }
      valetVehicle {
        carImage {
          imageId
          imageLink
        }
      }
    }
  }
`;

export const CREATE_VALET = gql`
  mutation ($inputs: ValetInput!) {
    createValet(inputs: $inputs) {
      createdAt
      comments
      customer {
        userId
        accountType
        firstName
        lastName
        profilePicture {
          pictureLink
        }
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

export const START_VALET = gql`
  mutation ($state: String!, $valetId: String!, $inputs: ValetInput) {
    updateValet(state: $state, valetId: $valetId, inputs: $inputs) {
      createdAt
      comments
      customer {
        accountType
        firstName
        lastName
        profilePicture {
          pictureLink
        }
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

export const UPDATE_PHONE = gql`
  mutation ($phoneNumber: String!) {
    updatePhoneNumber(phoneNumber: $phoneNumber)
  }
`;

export const SEND_LOCATION = gql`
  mutation ($longitude: Float!, $latitude: Float!, $valetId: String!) {
    sendDriversLocation(
      longitude: $longitude
      latitude: $latitude
      valetId: $valetId
    ) {
      id
      latitude
      longitude
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ($newPassword: String!, $oldPassword: String!) {
    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)
  }
`;

export const UPDATE_EMAIL = gql`
  mutation ($newEmail: String!) {
    changeEmail(newEmail: $newEmail)
  }
`;

export const UPDATE_USERNAME = gql`
  mutation ($newUsername: String!) {
    changeUsername(newUsername: $newUsername)
  }
`;

export const ADD_LICENSE = gql`
  mutation (
    $licenseImageBack: String!
    $licenseImageFront: String!
    $licenseExpiration: String!
    $licenseState: String!
    $licenseNumber: String!
  ) {
    createLicense(
      licenseImageBack: $licenseImageBack
      licenseImageFront: $licenseImageFront
      licenseExpiration: $licenseExpiration
      licenseState: $licenseState
      licenseNumber: $licenseNumber
    ) {
      licenseExpiration
      licenseId
      licenseImageBack
      licenseImageFront
      licenseNumber
      licenseState
      verified
    }
  }
`;

export const REQUEST_MEMBERSHIP = gql`
  mutation ($dealershipName: String!) {
    requestMembership(dealershipName: $dealershipName)
  }
`;
