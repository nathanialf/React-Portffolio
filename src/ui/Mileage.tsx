import styles from '../styles/Mileage.module.css'; 
import { headers } from "next/headers";

const pointSF = {
  lat: 37.7749,
  lng: 122.4194
};

function toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

const getDistance = (lat1, lon1, lat2, lon2, unit) => {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }

  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;

  if (unit === "K") { dist = dist * 1.609344 };
  if (unit === "N") { dist = dist * 0.8684 };
  
  return toFixed(dist, 0);
};

export default function Mileage(props) {
  const headersList = headers();
  console.log(headersList);

  return (
    headersList.get('request-geo') &&
    <span className={styles.mileage}>
      {headersList.get('request-geo')}
      {getDistance(pointSF.lat, pointSF.lng, props.lat, props.lng, 'M')} mi. away
    </span>
  )

  return (
    headersList.get('request-ip') &&
    <span className={styles.mileage}>
      {headersList.get('request-ip')}
    </span>
  )
}
