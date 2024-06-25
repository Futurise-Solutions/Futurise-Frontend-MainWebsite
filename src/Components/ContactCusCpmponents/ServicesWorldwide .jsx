import React from 'react';
import { Box, Text } from '@chakra-ui/react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CustomText } from '../../utils/Texts';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';


const locations = [
  { name: 'USA', coordinates: [37.0902, -95.7129] },
  { name: 'Australia', coordinates: [-25.2744, 133.7751] },
  { name: 'Denmark', coordinates: [56.2639, 10.4515] },
  { name: 'South Africa', coordinates: [-30.5595, 22.9375] },
  { name: 'UAE', coordinates: [25.2048, 55.1713] },
  { name: 'India', coordinates: [20.5937, 78.9629] },
  { name: 'UK', coordinates: [55.378051, -3.435973] },
];

const ServicesWorldwide = () => {
  return (
    <Box py={10} px={5} w="90%" m="auto" textAlign="center" color="white">
      <CustomText variant="heading" mb={5}>
        Our Services Are Available Worldwide
      </CustomText>
      <Box position="relative" height="500px">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={false}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={location.coordinates}
            //   icon={customMarkerIcon}
              
            >
                
              <Popup>
                {location.name}
                </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default ServicesWorldwide;
