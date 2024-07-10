import React from 'react';
import { Box } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import { CustomText } from '../../utils/Texts';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { locations } from '../../utils/Constant';

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
