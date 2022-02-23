import { getProviders, signIn } from 'next-auth/react';

function login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black h-screen justify-center ">
      <img className="w-52 mb-5" src="/spotify.svg" alt="spotify_logo" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            type="button"
            className="bg-[#18D860] text-white p-5 rounded-full hover:scale-110 transition ease-in"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with
            {' '}
            {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
