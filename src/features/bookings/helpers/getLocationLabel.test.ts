import { bookingsSnap } from 'features/bookings/fixtures/bookingsSnap'
import { getLocationLabel } from 'features/bookings/helpers'

describe('getLocationLabel', () => {
  const initialBooking = bookingsSnap.ongoing_bookings[1]

  it('should return empty string if permanent offer', () => {
    const properties = {
      isPermanent: true,
    }

    const offerRules = getLocationLabel(initialBooking.stock, properties)

    expect(offerRules).toEqual('')
  })

  it('should return empty string if digital offer', () => {
    const properties = {
      isDigital: true,
    }

    const offerRules = getLocationLabel(initialBooking.stock, properties)

    expect(offerRules).toEqual('')
  })

  it('should display the address label when it is specified', () => {
    const properties = {
      isPermanent: false,
      isDigital: false,
    }

    const booking = {
      ...initialBooking,
      stock: {
        ...initialBooking.stock,
        offer: {
          ...initialBooking.stock.offer,
          address: {
            ...initialBooking.stock.offer.address,
            label: 'Maison de la Briquette',
          },
        },
      },
    }
    const offerRules = getLocationLabel(booking.stock, properties)

    expect(offerRules).toEqual('Maison de la Briquette, Drancy')
  })

  it('should display public name when address label is not present', () => {
    const properties = {
      isPermanent: false,
      isDigital: false,
    }

    const booking = {
      ...initialBooking,
      stock: {
        ...initialBooking.stock,
        offer: {
          ...initialBooking.stock.offer,
          venue: {
            ...initialBooking.stock.offer.venue,
            publicName: 'Maison de la Brique public',
          },
        },
      },
    }
    const offerRules = getLocationLabel(booking.stock, properties)

    expect(offerRules).toEqual('Maison de la Brique public, Drancy')
  })

  it('should display public name when address label is null', () => {
    const properties = {
      isPermanent: false,
      isDigital: false,
    }

    const booking = {
      ...initialBooking,
      stock: {
        ...initialBooking.stock,
        offer: {
          ...initialBooking.stock.offer,
          address: {
            ...initialBooking.stock.offer.address,
            label: null,
          },
          venue: {
            ...initialBooking.stock.offer.venue,
            publicName: 'Maison de la Brique en Mousse',
          },
        },
      },
    }
    const offerRules = getLocationLabel(booking.stock, properties)

    expect(offerRules).toEqual('Maison de la Brique en Mousse, Drancy')
  })

  it('should display public name when address label is an empty string', () => {
    const properties = {
      isPermanent: false,
      isDigital: false,
    }

    const booking = {
      ...initialBooking,
      stock: {
        ...initialBooking.stock,
        offer: {
          ...initialBooking.stock.offer,
          address: {
            ...initialBooking.stock.offer.address,
            label: '',
          },
          venue: {
            ...initialBooking.stock.offer.venue,
            publicName: 'Maison de la Brique en Mousse',
          },
        },
      },
    }
    const offerRules = getLocationLabel(booking.stock, properties)

    expect(offerRules).toEqual('Maison de la Brique en Mousse, Drancy')
  })

  it('should display the name of the venue when address label and public name are not present', () => {
    const properties = {
      isPermanent: false,
      isDigital: false,
    }

    const offerRules = getLocationLabel(initialBooking.stock, properties)

    expect(offerRules).toEqual('Maison de la Brique, Drancy')
  })

  it('should display the name of the venue when address label is null and public name is specified and is an empty string', () => {
    const properties = {
      isPermanent: false,
      isDigital: false,
    }

    const booking = {
      ...initialBooking,
      stock: {
        ...initialBooking.stock,
        offer: {
          ...initialBooking.stock.offer,
          venue: {
            ...initialBooking.stock.offer.venue,
            publicName: '',
          },
        },
      },
    }
    const offerRules = getLocationLabel(booking.stock, properties)

    expect(offerRules).toEqual('Maison de la Brique, Drancy')
  })

  it('should display the name of the venue when public name specified and is null', () => {
    const properties = {
      isPermanent: false,
      isDigital: false,
    }

    const booking = {
      ...initialBooking,
      stock: {
        ...initialBooking.stock,
        offer: {
          ...initialBooking.stock.offer,
          venue: {
            ...initialBooking.stock.offer.venue,
            publicName: null,
          },
        },
      },
    }
    const offerRules = getLocationLabel(booking.stock, properties)

    expect(offerRules).toEqual('Maison de la Brique, Drancy')
  })

  it('should display the full adress when city is not specified in address', () => {
    const properties = {
      isPermanent: false,
      isDigital: false,
    }

    const booking = {
      ...initialBooking,
      stock: {
        ...initialBooking.stock,
        offer: {
          ...initialBooking.stock.offer,
          address: {
            ...initialBooking.stock.offer.address,
            city: '',
          },
        },
      },
    }
    const offerRules = getLocationLabel(booking.stock, properties)

    expect(offerRules).toEqual('Maison de la Brique, Drancy')
  })

  it('should display only the name of the venue when city not specified in address or venue', () => {
    const properties = {
      isPermanent: false,
      isDigital: false,
    }

    const booking = {
      ...initialBooking,
      stock: {
        ...initialBooking.stock,
        offer: {
          ...initialBooking.stock.offer,
          address: {
            ...initialBooking.stock.offer.address,
            city: '',
          },
          venue: {
            ...initialBooking.stock.offer.venue,
            city: undefined,
          },
        },
      },
    }

    const offerRules = getLocationLabel(booking.stock, properties)

    expect(offerRules).toEqual('Maison de la Brique')
  })

  it('should display only the name of the venue when city specified and is an empty string in address or venue', () => {
    const properties = {
      isPermanent: false,
      isDigital: false,
    }

    const booking = {
      ...initialBooking,
      stock: {
        ...initialBooking.stock,
        offer: {
          ...initialBooking.stock.offer,
          address: {
            ...initialBooking.stock.offer.address,
            city: '',
          },
          venue: {
            ...initialBooking.stock.offer.venue,
            city: '',
          },
        },
      },
    }

    const offerRules = getLocationLabel(booking.stock, properties)

    expect(offerRules).toEqual('Maison de la Brique')
  })
})
