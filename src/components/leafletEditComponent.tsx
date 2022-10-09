import React, { useMemo } from 'react';
import { Label, useField } from 'payload/components/forms';

let MapContainer, TileLayer, Marker, useMapEvents, L, DefaultMarkerIcon;
if (typeof window !== 'undefined') {
  require('leaflet/dist/leaflet.css');
  L = require('leaflet/dist/leaflet.js');

  let icon = require('leaflet/dist/images/marker-icon.png');
  let shadow = require('leaflet/dist/images/marker-shadow.png');

  MapContainer = require('react-leaflet').MapContainer;
  TileLayer = require('react-leaflet').TileLayer;
  Marker = require('react-leaflet').Marker;
  useMapEvents = require('react-leaflet').useMapEvents;

  DefaultMarkerIcon = L.icon({
    iconUrl: icon,
    shadowUrl: shadow,
  });
}

type Props = { path: string; label: string; defaultValue: number[]; required: boolean };

const HandleMapEvents = ({ setLocation }) => {
  useMapEvents({
    click: (ev) => {
      setLocation([ev.latlng.lng, ev.latlng.lat]);
    },
  });
  return null;
};

const LeafletPointField: React.FC<Props> = (props) => {
  let { path, label, defaultValue, required } = props;
  const { value, setValue } = useField<Props>({ path });

  // easter egg
  defaultValue = defaultValue ?? [31.133944988250736, 29.979788039468005];

  const markerDragHandlers = useMemo(() => {
    return {
      dragend: (ev) => {
        const marker = ev.target;
        if (marker != null) {
          const position = marker.getLatLng();
          setValue([position.lng, position.lat]);
        }
      },
    };
  }, []);

  return (
    <>
      <Label label={label} required={required} htmlFor={path}></Label>
      <MapContainer
        style={{ height: '500px' }}
        center={{ lat: value ? value[1] : defaultValue[1], lng: value ? value[0] : defaultValue[0] }}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={true}
          eventHandlers={markerDragHandlers}
          position={{ lat: value ? value[1] : defaultValue[1], lng: value ? value[0] : defaultValue[0] }}
          icon={DefaultMarkerIcon}
        ></Marker>
        <HandleMapEvents setLocation={setValue} />
      </MapContainer>
    </>
  );
};

export default LeafletPointField;
