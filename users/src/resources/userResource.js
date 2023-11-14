/**
 * Transform the user resource into an object.
 *
 * @param {Object} user - The user object to transform.
 * @return {Object} - An object containing selected properties from the user.
 */
const userResource = (user) => {
  return {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user?.phone,
    email: user.email,
    address: user?.address,
  };
};
export default userResource;
