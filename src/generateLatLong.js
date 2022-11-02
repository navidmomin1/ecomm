const generateLatLong = async (lat, long) => {
  //   const x0 = 55.286345126129824;
  //   const y0 = 25.264075525983607;
  const x0 = long;
  const y0 = lat;

  // const Random random = new Random();

  // Convert radius from meters to degrees.
  const radiusInDegrees = 1000 / 111320; //10km
  console.log("r = ", radiusInDegrees);

  // Get a random distance and a random angle.
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  // Get the x and y delta values.
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  // Compensate the x value.
  const new_x = x / Math.cos(degrees_to_radians(y0));

  let foundLatitude;
  let foundLongitude;

  foundLatitude = y0 + y;
  foundLongitude = x0 + new_x;

  //   console.log(foundLatitude + " " + foundLongitude);
  return { foundLatitude, foundLongitude };
};

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

export { generateLatLong };
