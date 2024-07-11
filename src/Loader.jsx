import loader from './assets/Loader.gif'

function Loader() {
  return (
    <div className='flex justify-center w-full'>
      <img src={loader} alt="" />
    </div>
  );
}

export default Loader;
