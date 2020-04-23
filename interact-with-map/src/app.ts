import axios from 'axios';

const GOOGLE_KEY = 'YOUR_KEY';

type Geocoding = {
    results: { geometry: { location: { lat: number, lng: number } } }[],
    status: "OK" | "ZERO_RESULTS" | "INVALID_REQUEST" | "UNKNOWN_ERROR"
}

const form = document.querySelector('form')!;
const mapDiv = document.getElementById('map')!;
const addressInput = document.querySelector("#address")! as HTMLInputElement;

const getAddressUrl = (address: string) => `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_KEY}`;

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const addressUrl = getAddressUrl(encodeURI(addressInput.value));
    axios.get<Geocoding>(addressUrl).then(response => {
        if (response.data.status !== "OK") {
            throw new Error('Could not fetch location');
        }
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(mapDiv, {
            center: coordinates,
            zoom: 8
        });
        new google.maps.Marker({ position: coordinates, map: map });
    }).catch(err => {
        alert(err.message);
    })
})