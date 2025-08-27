import pic from '../assets/me.jpg';

const Headshot = () => {
   return (
      <img
         src={pic}
         style={{ height: '300px', borderRadius: '50%' }}
      />
   );
}

export default Headshot;