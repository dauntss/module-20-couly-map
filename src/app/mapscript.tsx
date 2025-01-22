import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Map: React.FC = () => {
  const [mapContainer, setMapContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      setMapContainer(mapElement);
    }
  }, []);

  useEffect(() => {
    if (mapContainer) {
      const map = L.map(mapContainer).setView([0, 0], 0);

      // Tile layer
      L.tileLayer(`/images/map/{z}/{x}/{y}.png`, {
        noWrap: true,
        minZoom: 3,
        maxZoom: 6,
      }).addTo(map);

      // Marker icons
      const kingdomIcon = L.icon({
        iconUrl: 'images/kingdom.png',
        iconRetinaUrl: 'images/kingdom.png',
        iconSize: [34, 50],
        iconAnchor: [16, 50],
        popupAnchor: [0, -50]
      });
      const capitolIcon = L.icon({
        iconUrl: 'images/capital.png',
        iconRetinaUrl: 'images/capital.png',
        iconSize: [34, 50],
        iconAnchor: [16, 50],
        popupAnchor: [0, -50]
      });
      const siteIcon = L.icon({
        iconUrl: 'images/site.png',
        iconRetinaUrl: 'images/site.png',
        iconSize: [34, 50],
        iconAnchor: [16, 50],
        popupAnchor: [0, -50]
      });

      // Kingdom Markers
      const k_baria = L.marker([-22, -35], {icon: kingdomIcon}).bindPopup('<b><a href="./wiki/baria">Kingdom of Baria</a></b>');
      const k_flok = L.marker([4, -19], {icon: kingdomIcon}).bindPopup('<b><a href="./wiki/flok">Kingdom of Flok</a></b>');
      const k_marl = L.marker([-42, -25], {icon: kingdomIcon}).bindPopup('<b><a href="./wiki/marl">Grand Duchy of Marl</a></b>');
      const k_thetbia = L.marker([-33, -59], {icon: kingdomIcon}).bindPopup('<b>Kingdom of Thetbia</b>');
      const k_bolia = L.marker([2, -52], {icon: kingdomIcon}).bindPopup('<b>Principality of Bolia</b>');
      const k_tut = L.marker([25, -94], {icon: kingdomIcon}).bindPopup('<b>Tuteshilese Empire</b>');
      const k_hinck = L.marker([-4, -137], {icon: kingdomIcon}).bindPopup('<b>Kingdom of Hinck</b>');
      const k_berden = L.marker([-22, -86], {icon: kingdomIcon}).bindPopup('<b>Kingdom of Berden</b>');
      const k_westland = L.marker([1, 26], {icon: kingdomIcon}).bindPopup('<b>Dominion of Westland</b>');
      const k_mil = L.marker([-1, 51], {icon: kingdomIcon}).bindPopup('<b>Kingdom of Mil</b>');
      const k_car = L.marker([39, 40], {icon: kingdomIcon}).bindPopup('<b>Principality of Car</b>');
      const k_god = L.marker([-24, 59], {icon: kingdomIcon}).bindPopup('<b>Kingdom of God</b>');
      const k_bet = L.marker([42, 95], {icon: kingdomIcon}).bindPopup('<b>Grand Duchy of Bet</b>');
      const k_amer = L.marker([-8, 103], {icon: kingdomIcon}).bindPopup('<b>Amerish Empire</b>');
      //Capitol Markers
      const c_baria = L.marker([-12, -46], {icon: capitolIcon}).bindPopup('Charton');
      const c_flok = L.marker([21, -16], {icon: capitolIcon}).bindPopup('Bleches');
      const c_marl = L.marker([-35, -4], {icon: capitolIcon}).bindPopup('Warlisham');
      const c_thetbia = L.marker([-38, -51], {icon: capitolIcon}).bindPopup('Manch');
      const c_bolia = L.marker([25, -48], {icon: capitolIcon}).bindPopup('Horsterke');
      const c_tut = L.marker([43, -146], {icon: capitolIcon}).bindPopup('Alton');
      const c_hinck = L.marker([2.5, -149], {icon: capitolIcon}).bindPopup('Floksey');
      const c_berden = L.marker([-34, -93], {icon: capitolIcon}).bindPopup('Chipledon');
      const c_westland = L.marker([2, 38], {icon: capitolIcon}).bindPopup('Besey');
      const c_mil = L.marker([-7, 49], {icon: capitolIcon}).bindPopup('Halboney');
      const c_car = L.marker([34, 32], {icon: capitolIcon}).bindPopup('Pilbor');
      const c_god = L.marker([-3, 65], {icon: capitolIcon}).bindPopup('Etonwich');
      const c_bet = L.marker([38, 89], {icon: capitolIcon}).bindPopup('Wiveford');
      const c_amer = L.marker([23, 11], {icon: capitolIcon}).bindPopup('Bridmanch');
      //Significant Site Markers
      const s_shiresberg = L.marker([14, -131], {icon: siteIcon}).bindPopup('Shiresberg Holy Site');
      const s_claggish = L.marker([-57, -55], {icon: siteIcon}).bindPopup('Former Claggish Empire');
      const s_pickerketon = L.marker([33, 120], {icon: siteIcon}).bindPopup('Pickerketon Island');
      const s_mergish = L.marker([5, 60], {icon: siteIcon}).bindPopup('Lake Mergish');
      const s_jatarah = L.marker([-20, 19], {icon: siteIcon}).bindPopup('Jatarah Island');
      //Marker Groups
      const kingdoms = L.layerGroup([k_baria, k_flok, k_marl, k_thetbia, k_bolia, k_tut, k_hinck, k_berden, k_westland, k_mil, k_car, k_god, k_bet, k_amer]).addTo(map);
      const capitols = L.layerGroup([c_baria, c_flok, c_marl, c_thetbia, c_bolia, c_tut, c_hinck, c_berden, c_westland, c_mil, c_car, c_god, c_bet, c_amer]);
      const sites = L.layerGroup([s_shiresberg, s_claggish, s_pickerketon, s_mergish, s_jatarah]);
      // Marker overlay
      const overlayMaps = {
        "Kingdoms": kingdoms,
        "Capitols": capitols,
        "Significant Sites": sites
      };

      // Layer control
      const layerControl = L.control.layers({}, overlayMaps).addTo(map);
    }
  }, [mapContainer]);

  return (
    <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
  );
};

export default Map;