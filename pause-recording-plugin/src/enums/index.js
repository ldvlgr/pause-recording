function makeEnumObject(obj, key) {
  if(!obj instanceof Object)
    throw new Error("Passed object is not an object");
  
  obj[key] = key;
  return obj;
}

export const ParticipantStatus = ['joined', 'left'].reduce(makeEnumObject, {});

export const ParticipantType = ['customer', 'unknown', 'worker'].reduce(makeEnumObject, {});

export const ReservationEvents = ['accepted', 'rejected', 'timeout', 'canceled', 'rescinded', 'completed', 'wrapup'].reduce(makeEnumObject, {});
